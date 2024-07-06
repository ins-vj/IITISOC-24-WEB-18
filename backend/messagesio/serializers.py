from .models import Room, Message, Meet, MeetUser
from users.models import CustomUser as User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]

        
class MeetUserSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = MeetUser
        exclude = []
        depth = 1

    
class MeetSerializer(serializers.ModelSerializer):
    all_users = MeetUserSerializer(many=True, read_only=True)
    host = UserSerializer(read_only=True)

    class Meta:
        model = Meet
        exclude = []
    
    def create(self, validated_data):
        # Automatically set the host based on the authenticated user
        validated_data['host'] = self.context['request'].user
        return super().create(validated_data)
    