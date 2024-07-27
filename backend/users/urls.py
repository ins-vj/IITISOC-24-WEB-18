from django.urls import path
from .views import FriendRequestList, SentFriendRequestList, UpdateFriendRequest, DeleteFriendRequest, SelfUserView,RetrieveUserByUsername, DeleteFriendView

urlpatterns = [
    path("friend-requests/", FriendRequestList.as_view()),
    path("sent-friend-requests/", SentFriendRequestList.as_view()),
    path('friend-requests/<uuid:pk>/', DeleteFriendRequest.as_view(), name='delete-friend-request'),
    path('friend-requests/<uuid:pk>/update/', UpdateFriendRequest.as_view(), name='update-friend-request'),
    path('user-details/', SelfUserView.as_view()),
    path('user/<str:username>/', RetrieveUserByUsername.as_view(), name='retrieve-user-by-username'),
    path('user/friend/<int:pk>/', DeleteFriendView.as_view(), name='delete-friend-request'),
]