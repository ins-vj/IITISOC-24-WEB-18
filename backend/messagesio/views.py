from rest_framework import generics
from .models import User, Room, Message
from .serializers import RoomSerializer, MessageSerializer, UserSerializer

class RoomsList(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class UsersDetail(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer