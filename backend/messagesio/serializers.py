from .models import Room, Message, Meet, MeetUser
from users.models import CustomUser as User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]


class MessageSerializer(serializers.ModelSerializer):
    created_at_formatted = serializers.SerializerMethodField()
    user = UserSerializer()

    class Meta:
        model = Message
        exclude = []
        depth = 1

    def get_created_at_formatted(self, obj:Message):
        return obj.created_at.strftime("%d-%m-%Y %H:%M:%S")

class RoomSerializer(serializers.ModelSerializer):
    last_message = serializers.SerializerMethodField()
    messages = MessageSerializer(many=True, read_only=True)
    host = UserSerializer(read_only=True)
    current_users = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Room
        fields = ["pk", "name", "host", "messages", "current_users", "last_message"]
        depth = 1
        read_only_fields = ["messages", "last_message"]

    def get_last_message(self, obj:Room):
        return MessageSerializer(obj.messages.order_by('created_at').last()).data
    
    def create(self, validated_data):
        # Automatically set the host based on the authenticated user
        validated_data['host'] = self.context['request'].user
        return super().create(validated_data)
    
class MeetUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = MeetUser
        exclude = []
        depth = 1

    
class MeetSerializer(serializers.ModelSerializer):
    users = MeetUserSerializer(many=True, read_only=True)
    host = UserSerializer(read_only=True)

    class Meta:
        model = Meet
        exclude = []
    
    def create(self, validated_data):
        # Automatically set the host based on the authenticated user
        validated_data['host'] = self.context['request'].user
        return super().create(validated_data)
    