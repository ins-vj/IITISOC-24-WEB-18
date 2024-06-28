from rest_framework import generics
from .models import User, Room, Message, Meet
from .serializers import RoomSerializer, MessageSerializer, UserSerializer, MeetSerializer, MeetUserSerializer

class RoomsList(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class UsersDetail(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class MeetDetail(generics.RetrieveAPIView):
    queryset = Meet.objects.all()
    serializer_class = MeetSerializer

class MeetCreate(generics.CreateAPIView):
    queryset = Meet.objects.all()
    serializer_class = MeetSerializer
