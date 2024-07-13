import json

from channels.db import database_sync_to_async
from djangochannelsrestframework.generics import GenericAsyncAPIConsumer
from djangochannelsrestframework.observer import model_observer
from djangochannelsrestframework.observer.generics import ObserverModelInstanceMixin, action

from .models import Meet, MeetUser, Message
from users.models import CustomUser as User
from .serializers import UserSerializer, MeetSerializer, MeetUserSerializer, MessageSerializer

class MeetConsumer(ObserverModelInstanceMixin, GenericAsyncAPIConsumer):
    queryset = Meet.objects.all()
    serializer_class = MeetSerializer
    lookup_field = "pk"

    async def disconnect(self, code):
        if hasattr(self, "meet_subscribe"):
            try:
                await self.remove_user_from_meet(self.meet_subscribe)
                await self.notify_users()
            finally:
                pass
        await super().disconnect(code)
        pass

    @action()
    async def join_meet(self, pk, **kwargs):
        self.meet_subscribe = pk
        secret_key = await self.add_user_to_meet(pk)
        await self.allow_user(str(secret_key))
        await self.channel_layer.group_add(f'meet_{pk}', self.channel_name)
        await self.notify_users()
        print("User added to meet")

    @action()
    async def leave_meet(self, pk, **kwargs):
        await self.remove_user_from_meet(pk)
        await self.channel_layer.group_discard(f'meet_{pk}', self.channel_name)
        await self.notify_users()

    @action()
    async def subscribe_to_messages_in_meet(self, pk, request_id, **kwargs):
        await self.message_activity.subscribe(meet=pk, request_id=request_id)

    @action()
    async def update_clientid(self, client_id, **kwargs):
        print(client_id)
        await self.update_meetuser_clientid(client_id)
        await self.notify_users()

    @action()
    async def update_emotion(self, emotion, **kwargs):
        print(emotion)
        await self.update_meetuser_emotion(emotion)
        await self.notify_users_emotion_change(self.meet_subscribe, emotion)

    @model_observer(MeetUser)
    async def message_activity(
        self,
        message,
        observer=None,
        subscribing_request_ids=[],
        **kwargs
    ):
        """
        This is evaluated once for each subscribed consumer.
        The result of `@message_activity.serializer` is provided here as the message.
        """
        for request_id in subscribing_request_ids:
            message_body = dict(request_id=request_id)
            message_body.update(message)
            await self.send_json(message_body)

    async def notify_users(self):
        meet = await self.get_meet(self.meet_subscribe)
        print(f'meet_{meet.id}')
        users_in_meet = await self.current_users(meet.id)
        print(users_in_meet)

        try:
            await self.channel_layer.group_send(
                f'meet_{meet.id}',
                {
                    'type': 'update_users',
                    'usuarios': users_in_meet
                }
            )
            print("Sent update_users message to group")
        except Exception as e:
            print(f"Error sending update_users message: {e}")

    async def update_users(self, event: dict):
        print("Updating users:", event)
        await self.send(text_data=json.dumps({'users': event["usuarios"]}))

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
        print(f"Notifying emotion change for user {meet_user.client_id}")

        try:
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
            print("Sent update_emotion_users message to group")
        except Exception as e:
            print(f"Error sending update_emotion_users message: {e}")

    async def update_emotion_users(self, event):
        print("Updating user emotion:", event)
        await self.send_json({
            'type': 'update_emotion_users',
            'emotion': event['emotion']
        })

    @database_sync_to_async
    def get_meetuser(self):
        meet = self.meet_subscribe
        user = self.scope["user"]
        return MeetUser.objects.get(user=user, meet=meet)

    @database_sync_to_async
    def remove_user_from_meet(self, id):
        user = self.scope["user"]
        meet_user = MeetUser.objects.get(user=user, meet_id=id)
        meet_user.delete()

    @database_sync_to_async
    def update_meetuser_emotion(self, emotion):
        user = self.scope["user"]
        meet_user = MeetUser.objects.get(user=user, meet=self.meet_subscribe)
        meet_user.emotion = emotion
        meet_user.save()

    @database_sync_to_async
    def update_meetuser_clientid(self, client_id):
        user = self.scope["user"]
        meet_user = MeetUser.objects.get(user=user, meet=self.meet_subscribe)
        meet_user.client_id = client_id
        meet_user.save()

    @database_sync_to_async
    def current_users(self, meet_id):
        return list(MeetUser.objects.filter(meet_id=meet_id).values('id', 'user__id', 'user__username', 'client_id', 'emotion'))

    @database_sync_to_async
    def get_meet(self, pk: int) -> Meet:
        return Meet.objects.get(pk=pk)

    @database_sync_to_async
    def add_user_to_meet(self, pk):
        user = self.scope["user"]
        meet = Meet.objects.get(pk=pk)
        meet_user, created = MeetUser.objects.get_or_create(user=user, meet=meet)
        print(meet_user)
        return meet.secret_key
