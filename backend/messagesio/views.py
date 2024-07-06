from rest_framework import generics
from .models import User, Meet
from .serializers import UserSerializer, MeetSerializer

class UsersDetail(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class MeetList(generics.ListAPIView):
    queryset = Meet.objects.all()
    serializer_class = MeetSerializer

class MeetDetail(generics.RetrieveAPIView):
    queryset = Meet.objects.all()
    serializer_class = MeetSerializer

class MeetCreate(generics.CreateAPIView):
    queryset = Meet.objects.all()
    serializer_class = MeetSerializer
