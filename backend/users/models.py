from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
import uuid
from allauth.account.signals import user_signed_up
from django.dispatch import receiver
from .managers import CustomUserManager
from django.core.mail import send_mail


class CustomUser(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(_("email address"), unique=True)
    username = models.TextField(_("username"), unique=True)
    full_name = models.TextField(blank=True, default="")
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    objects = CustomUserManager()

    def __str__(self):
        return f"{self.username} : {self.id}"
    
class FriendRequest(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    from_user = models.ForeignKey(CustomUser, related_name='sent_friend_requests', on_delete=models.CASCADE)
    to_user = models.ForeignKey(CustomUser, related_name='received_friend_requests', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    currentStatus = models.CharField(max_length=10, choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('rejected', 'Rejected')], default='pending')

    class Meta:
        unique_together = ('from_user', 'to_user')

    def __str__(self):
        return f"FriendRequest from {self.from_user} to {self.to_user} - {self.currentStatus}"
    

class Friend(models.Model):
    user = models.ForeignKey(CustomUser, related_name='friends', on_delete=models.CASCADE)
    friend = models.ForeignKey(CustomUser, related_name='friend_of', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'friend')

    def __str__(self) -> str:
        return f"{self.user.username} & {self.friend.username}"
    

@receiver(user_signed_up, dispatch_uid="CustomUser.uuid")
def user_signed_up_(request, user, **kwargs):
    send_mail(
            "Prince here",
            f"Welcome to Expresso",
            from_email=None,
            recipient_list=[user.email],
            fail_silently=False,
        )
