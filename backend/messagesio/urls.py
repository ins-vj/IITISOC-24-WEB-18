from django.urls import path
from .views import RoomsList, UsersDetail

urlpatterns = [
    path("rooms/", RoomsList.as_view()),
    path("users/", UsersDetail.as_view())
]