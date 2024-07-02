import json

from channels.db import database_sync_to_async
from djangochannelsrestframework.generics import GenericAsyncAPIConsumer
from djangochannelsrestframework.observer import model_observer
from djangochannelsrestframework.observer.generics import ObserverModelInstanceMixin, action

from .models import Message, Room, Meet, MeetUser
from users.models import CustomUser as User
from .serializers import MessageSerializer, RoomSerializer, UserSerializer, MeetSerializer, MeetUserSerializer


class RoomConsumer(ObserverModelInstanceMixin, GenericAsyncAPIConsumer):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    lookup_field = "pk"

    async def disconnect(self, code):
        if hasattr(self, "room_subscribe"):
            await self.remove_user_from_room(self.room_subscribe)
            await self.notify_users()
        await super().disconnect(code)

    @action()
    async def join_room(self, pk, **kwargs):
        self.room_subscribe = pk
        await self.add_user_to_room(pk)
        await self.notify_users()

    @action()
    async def leave_room(self, pk, **kwargs):
        await self.remove_user_from_room(pk)

    @action()
    async def create_message(self, message, **kwargs):
        room: Room = await self.get_room(pk=self.room_subscribe)
        await database_sync_to_async(Message.objects.create)(
            room=room,
            user=self.scope["user"],
            text=message
        )

    @action()
    async def subscribe_to_messages_in_room(self, pk, request_id, **kwargs):
        await self.message_activity.subscribe(room=pk, request_id=request_id)

    @model_observer(Message)
    async def message_activity(
        self,
        message,
        observer=None,
        subscribing_request_ids = [],
        **kwargs
    ):
        """
        This is evaluated once for each subscribed consumer.
        The result of `@message_activity.serializer` is provided here as the message.
        """
        # since we provide the request_id when subscribing we can just loop over them here.
        for request_id in subscribing_request_ids:
            message_body = dict(request_id=request_id)
            message_body.update(message)
            await self.send_json(message_body)

    @message_activity.groups_for_signal
    def message_activity(self, instance: Message, **kwargs):
        yield 'room__{instance.room_id}'
        yield f'pk__{instance.pk}'

    @message_activity.groups_for_consumer
    def message_activity(self, room=None, **kwargs):
        if room is not None:
            yield f'room__{room}'

    @message_activity.serializer
    def message_activity(self, instance:Message, action, **kwargs):
        """
        This is evaluated before the update is sent
        out to all the subscribing consumers.
        """
        return dict(data=MessageSerializer(instance).data, action=action.value, pk=instance.pk)

    async def notify_users(self):
        room: Room = await self.get_room(self.room_subscribe)
        for group in self.groups:
            await self.channel_layer.group_send(
                group,
                {
                    'type':'update_users',
                    'usuarios':await self.current_users(room)
                }
            )

    async def update_users(self, event: dict):
        await self.send(text_data=json.dumps({'usuarios': event["usuarios"]}))

    @database_sync_to_async
    def get_room(self, pk: int) -> Room:
        return Room.objects.get(pk=pk)

    @database_sync_to_async
    def current_users(self, room: Room):
        return [UserSerializer(user).data for user in room.current_users.all()]

    @database_sync_to_async
    def remove_user_from_room(self, room):
        user: User = self.scope["user"]
        user.current_rooms.remove(room)

    @database_sync_to_async
    def add_user_to_room(self, pk):
        user: MeetUser = MeetUser.objects.get(user=self.scope["user"])
        if not user.current_rooms.filter(pk=self.room_subscribe).exists():
            user.current_rooms.add(Room.objects.get(pk=pk))


class MeetConsumer(ObserverModelInstanceMixin, GenericAsyncAPIConsumer):
    queryset = Meet.objects.all()
    serializer_class = RoomSerializer
    lookup_field = "id"

    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        # meet_id = self.meet_subscribe
        # await self.remove_user_from_meet(id=meet_id)
        # await self.notify_users_in_meet(meet_id=meet_id)
        pass

    @action()
    async def join_meet(self, id, **kwargs):
        self.meet_subscribe = id
        meetDetails: Meet = await self.add_user_to_meet(id)
        await self.allow_user(str(meetDetails.secret_key))
        await self.channel_layer.group_add(f'meet_{id}', self.channel_name)
        await self.notify_users_in_meet(id)

    @action()
    async def update_clientid(self, client_id, **kwargs):
        print(client_id)
        await self.update_meetuser_clientid(client_id)
        await self.notify_users_in_meet(self.meet_subscribe)

    @action()
    async def update_emotion(self, emotion, **kwargs):
        print(emotion)
        await self.update_meetuser_emotion(emotion)
        await self.notify_users_emotion_change(self.meet_subscribe, emotion)

    @database_sync_to_async
    def update_meetuser_emotion(self, emotion):
        user = self.scope["user"]
        meet_user = MeetUser.objects.get(user=user)
        meet_user.emotion = emotion
        meet_user.save()

    @database_sync_to_async
    def update_meetuser_clientid(self, client_id):
        user = self.scope["user"]
        meet_user = MeetUser.objects.get(user=user)
        meet_user.client_id = client_id
        meet_user.save()

    @database_sync_to_async
    def add_user_to_meet(self, id):
        user = self.scope["user"]
        meet_user, created = MeetUser.objects.get_or_create(user=user)
        meet = Meet.objects.get(id=id)
        if not meet.all_users.filter(pk=meet_user.pk).exists():
            meet.all_users.add(meet_user)
        return meet
    
    @database_sync_to_async
    def remove_user_from_meet(self, id):
        user = self.scope["user"]
        meet_user = MeetUser.objects.get(user=user)
        meet = Meet.objects.get(id=id)
        if meet.all_users.filter(pk=meet_user.pk).exists():
            meet.all_users.remove(meet_user)

    async def notify_user_message(self, message):
        await self.send_json({
            'type': "message",
            "message": message
        })

    async def allow_user(self, key):
        await self.send_json({
            'type': "secret_key",
            "secret_key": key
        })

    async def notify_users_emotion_change(self, meet_id, emotion):
        meet_user = await self.get_meetuser()

        await self.channel_layer.group_send(
            f'meet_{meet_id}',
            {
                'type': 'update_emotion_users',
                'emotion': {
                    'client_id': meet_user.client_id,
                    'emotion': emotion
                }
            }
        )

    async def notify_users_in_meet(self, meet_id):
        meet = await self.get_meet(meet_id)
        users_in_meet = await self.current_users(meet)

        await self.channel_layer.group_send(
            f'meet_{meet_id}',
            {
                'type': 'update_users',
                'usuarios': users_in_meet
            }
        )

    @database_sync_to_async
    def get_meet(self, meet_id):
        return Meet.objects.get(id=meet_id)

    @database_sync_to_async
    def current_users(self, meet):
        return list(meet.all_users.values('id', 'user__id', 'user__username', 'client_id', 'emotion'))
    
    @database_sync_to_async
    def current_emotions(self, meet):
        return list(meet.all_users.values('client_id', 'emotion'))
    
    @database_sync_to_async
    def get_meetuser(self):
        meet = self.meet_subscribe
        user = self.scope["user"]
        meet_user: MeetUser = MeetUser.objects.get(user=user)
        return meet_user


    async def update_users(self, event):
        await self.send_json({
            'type': 'update_users',
            'usuarios': event['usuarios']
        })

    async def update_emotion_users(self, event):
        await self.send_json({
            'type': 'update_emotion_users',
            'emotion': event['emotion']
        })
