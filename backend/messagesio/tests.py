import json
from django.test import TestCase
from channels.testing import WebsocketCommunicator
from django.contrib.auth import get_user_model
from config.asgi import application
from .models import Room
from .serializers import UserSerializer
from channels.db import database_sync_to_async

User = get_user_model()

class RoomConsumerTest(TestCase):
    async def setUp(self):
        self.user = await self.create_test_user()
        self.room = await self.create_test_room()

    @database_sync_to_async
    def create_test_user(self):
        print(":gghef")
        return User.objects.create_user(password='password', email='testuser@example.com')

    @database_sync_to_async
    def create_test_room(self):
        return Room.objects.create(name='testroom', host=self.user)


    async def test_join_room(self):
        communicator = await self._connect()
        
        # Test joining a room
        await communicator.send_json_to({
            "action": "join_room",
            "pk": self.room.pk
        })
        response = await communicator.receive_json_from()
        self.assertEqual(response['type'], 'notify_users')
        
        await communicator.disconnect()

    async def test_leave_room(self):
        communicator = await self._connect()
        
        # Test leaving a room
        await communicator.send_json_to({
            "action": "leave_room",
            "pk": self.room.pk
        })
        response = await communicator.receive_json_from()
        self.assertEqual(response['type'], 'notify_users')
        
        await communicator.disconnect()

    async def test_create_message(self):
        communicator = await self._connect()

        # Test creating a message
        await communicator.send_json_to({
            "action": "create_message",
            "message": "Hello, World!"
        })
        response = await communicator.receive_json_from()
        self.assertEqual(response['type'], 'message_activity')
        self.assertEqual(response['data']['text'], 'Hello, World!')
        
        await communicator.disconnect()

    async def test_subscribe_to_messages_in_room(self):
        communicator = await self._connect()

        # Test subscribing to messages in a room
        await communicator.send_json_to({
            "action": "subscribe_to_messages_in_room",
            "pk": self.room.pk,
            "request_id": 1
        })
        response = await communicator.receive_json_from()
        self.assertEqual(response['type'], 'subscribe_to_messages_in_room')
        
        await communicator.disconnect()

    async def _connect(self):
        communicator = WebsocketCommunicator(application, f"/ws/messagesio/room/")
        connected, subprotocol = await communicator.connect()
        self.assertTrue(connected)
        
        # Serialize user and send it
        user_data = UserSerializer(self.user).data
        await communicator.send_json_to({
            "type": "websocket.connect",
            "user": user_data
        })
        return communicator

