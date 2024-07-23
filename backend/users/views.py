from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import FriendRequest, CustomUser
from .serializers import FriendRequestSerializer, FriendRequestUpdateSerializer, SelfUserSerializer

class FriendRequestList(generics.ListCreateAPIView):

    schema_tags = ['Friends']

    serializer_class = FriendRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return FriendRequest.objects.filter(to_user=user)

    def perform_create(self, serializer):
        serializer.save()

class SentFriendRequestList(generics.ListAPIView):

    schema_tags = ['Friends']
    
    serializer_class = FriendRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return FriendRequest.objects.filter(from_user=user)

    def perform_create(self, serializer):
        serializer.save()


class UpdateFriendRequest(generics.UpdateAPIView):
    schema_tags = ['Friends']

    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return FriendRequest.objects.filter(to_user=user)


class DeleteFriendRequest(generics.DestroyAPIView):
    schema_tags = ['Friends']

    serializer_class = FriendRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return FriendRequest.objects.filter(to_user=user)
    
class SelfUserView(generics.ListAPIView):
    schema_tags = ['Self Details']

    serializer_class = SelfUserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return CustomUser.objects.filter(id=user.id)

