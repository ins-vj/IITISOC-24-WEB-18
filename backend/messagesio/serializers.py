from .models import Meet, MeetUser, Message
from users.models import CustomUser as User
from rest_framework import serializers
from django.core.mail import send_mail
from config.settings import ORIGIN_URL


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


class MeetUserSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = MeetUser
        exclude = []
        depth = 1

    
class MeetSerializer(serializers.ModelSerializer):
    host = UserSerializer(read_only=True)

    class Meta:
        model = Meet
        exclude = []
    
    def create(self, validated_data):
        request = self.context.get('request', None)
        user = request.user if request else None
        validated_data['host'] = user
        
        invited_users = validated_data["invited_users"]
        instance = super().create(validated_data)
        
        emails = [user.email for user in invited_users]

        meet_id = instance.id
        join_meet_url = f"{ORIGIN_URL}/call/{meet_id}"

        send_mail(
            "You're Invited to a meeting",
            f"Click here to join the meet: <a>{join_meet_url}</a>",
            from_email=None,
            recipient_list=emails,
            fail_silently=False,
        )
        
        return instance
    