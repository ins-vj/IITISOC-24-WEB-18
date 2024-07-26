from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from api.mailService import welcome_mail

User = get_user_model()

@receiver(post_save, sender=User)
def send_welcome_email(sender, instance, created, **kwargs):
    if created:
        welcome_mail(instance.email)        
