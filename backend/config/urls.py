from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from videocall.views import Home
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
# from allauth.account.views import confirm_email

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('api.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('api/v1/auth/',	include('dj_rest_auth.urls')),
    path('api/v1/auth/registration/',
        include('dj_rest_auth.registration.urls')),
    path('account/', include('allauth.urls')),
    path('api/v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), 
    path("api/v1/channels-auth/", include('django_channels_jwt.urls')),
    # path(r'^accounts-rest/registration/account-confirm-email/(?P<key>.+)/$', confirm_email, name='account_confirm_email'),
]
