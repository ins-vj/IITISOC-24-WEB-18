from django.db import models
from users.models import CustomUser as User
import uuid
from django.utils import timezone


class Message(models.Model):
    meet = models.ForeignKey("messagesio.Meet", on_delete=models.CASCADE, related_name="messages")
    text = models.TextField(max_length=500)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="messages")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message({self.user} {self.meet})"
    

class Meet(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    secret_key = models.UUIDField(default=uuid.uuid4, editable=False)
    host = models.ForeignKey(User, on_delete=models.CASCADE, related_name="meets")
    private = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    scheduled_at = models.DateTimeField(default=timezone.now)
    invited_users = models.ManyToManyField(User, related_name="invited_meetings")

    def __str__(self):
        return f"Meet({self.id})"
    
    # def save(self, *args, **kwargs):
    #     if self.all_users is None and self.scheduled_at < timezone.now:
    #         self.delete()
    #     else:
    #         super().save(*args, **kwargs)
    

class MeetUser(models.Model):
    user  = models.ForeignKey(User, on_delete=models.CASCADE, related_name="meet_users")
    meet = models.ForeignKey(Meet, on_delete=models.CASCADE, related_name="all_users")
    client_id = models.TextField(max_length=500, editable=True)
    emotion =  models.TextField(max_length=500, editable=True, blank=True)

    def __str__(self):
        return f"MeetUser({self.user.username} : {self.client_id})"
