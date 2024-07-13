from django.urls import path
from .views import UsersDetail, MeetDetail, MeetCreate, MeetList

urlpatterns = [
    path("chat/users/", UsersDetail.as_view()),
    path("meet/all/", MeetList.as_view()),
    path("meet-detail/<uuid:pk>/", MeetDetail.as_view()),
    path("meet-create/", MeetCreate.as_view()),
]