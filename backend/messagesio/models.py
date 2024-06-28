from django.db import models
from users.models import CustomUser as User
import uuid
from django.utils import timezone


class Room(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False, unique=True)
    host = models.ForeignKey(User, on_delete=models.CASCADE, related_name="rooms")
    current_users = models.ManyToManyField(User, related_name="current_rooms", blank=True)

    def __str__(self):
        return f"Room({self.name} {self.host})"


class Message(models.Model):
    room = models.ForeignKey("messagesio.Room", on_delete=models.CASCADE, related_name="messages")
    text = models.TextField(max_length=500)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="messages")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message({self.user} {self.room})"
    
class Meet(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    secret_key = models.UUIDField(default=uuid.uuid4, editable=False)
    host = models.ForeignKey(User, on_delete=models.CASCADE, related_name="meets")
    private = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    scheduled_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Room({self.host} : {self.id})"
    
class MeetUser(models.Model):
    user  = models.ForeignKey(User, on_delete=models.CASCADE, related_name="emotions")
    client_id = models.TextField(max_length=500, editable=True)
    emotion = text = models.TextField(max_length=500, editable=True)

    def __str__(self):
        return f"Room({self.user} : {self.client_id})"
