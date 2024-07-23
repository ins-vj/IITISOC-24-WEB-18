from rest_framework import serializers
from .models import FriendRequest, CustomUser, Friend

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'full_name']

class FriendRequestSerializer(serializers.ModelSerializer):
    from_user = CustomUserSerializer(read_only=True)

    class Meta:
        model = FriendRequest
        fields = ['id', 'from_user', 'to_user', 'timestamp', 'currentStatus']
        read_only_fields = ['id', 'from_user', 'timestamp', 'currentStatus']

    def create(self, validated_data):
        request = self.context.get('request', None)
        from_user = request.user if request else None
        to_user = validated_data.pop('to_user')

        friend_request = FriendRequest(
            from_user=from_user,
            to_user=to_user,
            currentStatus='pending'
        )
        friend_request.save()
        return friend_request
    
class FriendRequestUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = ['currentStatus']

    def update(self, instance, validated_data):
        instance.currentStatus = validated_data.get('currentStatus', instance.currentStatus)
        instance.save()

        if instance.currentStatus == 'accepted':
            # Add to friend lists
            Friend.objects.create(user=instance.from_user, friend=instance.to_user)
            Friend.objects.create(user=instance.to_user, friend=instance.from_user)

        return instance
    

class FriendSerializer(serializers.ModelSerializer):
    friend = CustomUserSerializer(read_only=True)

    class Meta:
        model = Friend
        fields = ['friend', 'created_at']
        

class SelfUserSerializer(serializers.ModelSerializer):
    friends = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'full_name', 'friends', 'email', 'date_joined']

    def get_friends(self, obj):
        friends = Friend.objects.filter(user=obj)
        return FriendSerializer(friends, many=True).data
