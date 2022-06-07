from django.http import JsonResponse
from .functions import signup, user, logout
import json

def signup_view(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        res = signup.signup(
            first_name = data.get('first_name', ''),
            last_name = data.get('last_name', ''),
            email = data.get('email', ''),
            password = data.get('password', '')
        )
        if res == -1:
            return JsonResponse({
                'status': 'failed',
                'error': 'invalid parameters'
            })
        if res == -2:
            return JsonResponse({
                'status': 'failed',
                'error': 'unable to write into database'
            })
        else:
            return JsonResponse({
                'status': 'succeeded',
                'uid': res
            })
    return JsonResponse({
        'status': 'failed',
        'error': 'wrong request method (expecting POST request)'
    })

def user_info_view(request):
    if request.method == 'GET':
        res = user.get(request.GET.get('uid', ''))
        if res == -1:
            return JsonResponse({
                'status': 'failed',
                'error': 'invalid uid'
            })
        res['status'] = 'succeeded'
        return JsonResponse(res)
    return JsonResponse({
        'status': 'failed',
        'error': 'wrong request method (expecting GET request)'
    })

def logout_view(request):
    if request.method == 'GET':
        res = logout.logout(request)
        if res == 1:
            return JsonResponse({
                'status': 'succeeded'
            })
        else:
            return JsonResponse({
                'status': 'failed',
                'error': 'failed to logout'
            })
    return JsonResponse({
        'status': 'failed',
        'error': 'wrong request method (expecting GET request)'
    })