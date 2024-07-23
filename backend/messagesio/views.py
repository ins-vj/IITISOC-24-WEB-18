from rest_framework import generics
from .models import User, Meet
from .serializers import UserSerializer, MeetSerializer

class UsersDetail(generics.ListAPIView):
    schema_tags = ['Meeting']
    queryset = User.objects.all()
    serializer_class = UserSerializer

class MeetList(generics.ListAPIView):
    schema_tags = ['Meeting']
    queryset = Meet.objects.all()
    serializer_class = MeetSerializer

class MeetDetail(generics.RetrieveAPIView):
    schema_tags = ['Meeting']
    queryset = Meet.objects.all()
    serializer_class = MeetSerializer

class MeetCreate(generics.CreateAPIView):
    schema_tags = ['Meeting']
    queryset = Meet.objects.all()
    serializer_class = MeetSerializer
