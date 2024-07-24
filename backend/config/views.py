from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import login
from django.http import JsonResponse

def google_login_callback(request):
    user = request.user
    if user.is_authenticated:
        login(request, user)
        refresh = RefreshToken.for_user(user)
        return JsonResponse({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    return JsonResponse({'error': 'Authentication failed'}, status=400)
