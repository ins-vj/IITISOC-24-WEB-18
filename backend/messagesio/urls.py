from django.urls import path
from .views import RoomsList, UsersDetail, MeetDetail, MeetCreate

urlpatterns = [
    path("rooms/", RoomsList.as_view()),
    path("users/", UsersDetail.as_view()),
    path("meet-detail", MeetDetail.as_view()),
    path("meet-create", MeetCreate.as_view()),
]