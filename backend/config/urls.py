from django.contrib import admin
from django.urls import path, include
# from allauth.account.views import confirm_email

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('api.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('api/v1/auth/',	include('dj_rest_auth.urls')),
    path('api/v1/auth/registration/',
        include('dj_rest_auth.registration.urls')),
    path('account/', include('allauth.urls')),
    # path(r'^accounts-rest/registration/account-confirm-email/(?P<key>.+)/$', confirm_email, name='account_confirm_email'),
]
