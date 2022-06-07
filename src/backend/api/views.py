from django.http import JsonResponse
from .functions import signup, encrypt, user
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
                'error_id': -1,
                'error': 'invalid parameters'
            })
        elif res == -2:
            return JsonResponse({
                'status': 'failed',
                'error_id': -2,
                'error': 'unable to write into database'
            })
        elif res == -3:
            return JsonResponse({
                'status': 'failed',
                'error_id': -3,
                'error': 'email address already in use'
            })
        else:
            return JsonResponse({
                'status': 'succeeded',
                'uid': res
            })
    return JsonResponse({
        'status': 'failed',
        'error_id': 0,
        'error': 'wrong request method (expecting POST request)'
    })

def user_info_view(request):
    if request.method == 'GET':
        res = user.get(request.GET.get('uid', ''))
        if res == -1:
            return JsonResponse({
                'status': 'failed',
                'error_id': -1,
                'error': 'invalid uid'
            })
        res['status'] = 'succeeded'
        return JsonResponse(res)
    return JsonResponse({
        'status': 'failed',
        'error_id': 0,
        'error': 'wrong request method (expecting GET request)'
    })