from django.contrib import admin
from .models import Room, Message, Meet, MeetUser

admin.site.register(Room)
admin.site.register(Message)
admin.site.register(MeetUser)
admin.site.register(Meet)
