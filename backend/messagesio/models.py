from django.db import models
from users.models import CustomUser as User
import uuid
from django.utils import timezone
    

class MeetUser(models.Model):
    user  = models.ForeignKey(User, on_delete=models.CASCADE, related_name="emotions")
    client_id = models.TextField(max_length=500, editable=True)
    emotion =  models.TextField(max_length=500, editable=True, blank=True)

    def __str__(self):
        return f"MeetUser({self.user} : {self.client_id})"
    

class Meet(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    secret_key = models.UUIDField(default=uuid.uuid4, editable=False)
    host = models.ForeignKey(User, on_delete=models.CASCADE, related_name="meets")
    all_users = models.ManyToManyField(MeetUser, related_name="current_meets", blank=True)
    private = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    scheduled_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Meet({self.host} : {self.id})"
    
    # def save(self, *args, **kwargs):
    #     if self.current_users is None and self.scheduled_at < timezone.now:
    #         self.delete()
    #     else:
    #         super().save(*args, **kwargs)
    

