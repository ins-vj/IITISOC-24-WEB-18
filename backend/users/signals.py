from django.core.mail import send_mail
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model

User = get_user_model()

@receiver(post_save, sender=User)
def send_welcome_email(sender, instance, created, **kwargs):
    if created:
        send_mail(
            "Welcome to Expresso",
            "Prince here, Welcome to Expresso",
            from_email=None,
            recipient_list=[instance.email],
            fail_silently=False,
        )
