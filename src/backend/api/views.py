from django.http import JsonResponse
from .functions import signup, encrypt

def login_view(request):
    return JsonResponse({'result': False})

def signup_view(request):
    if request.method == 'POST':
        res = signup.signup(
            first_name = request.POST.get('first_name', False),
            last_name = request.POST.get('last_name', False),
            email = request.POST.get('email', False),
            password = request.POST.get('password', False)
        )
        return JsonResponse({'result': res})
    return JsonResponse({'result': False})
