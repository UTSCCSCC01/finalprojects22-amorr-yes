from django.http import JsonResponse
from .functions import signup, encrypt, user, upload_photoid, login, logout
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
        uid = request.session.get('uid', 0)
        if uid <= 0:
            return JsonResponse({
                'status': 'failed',
                'error_id': -1,
                'error': 'unauthenticated user'
            })
        res = user.get(uid)
        res['status'] = 'succeeded'
        return JsonResponse(res)
    return JsonResponse({
        'status': 'failed',
        'error_id': 0,
        'error': 'wrong request method (expecting GET request)'
    })

def upload_photoid_view(request):
    if request.method == 'POST':
        uid = request.session.get('uid', 0)
        if uid <= 0:
            return JsonResponse({
                'status': 'failed',
                'error_id': -1,
                'error': 'unauthenticated user'
            })
        data = json.loads(request.body.decode('utf-8'))
        res = upload_photoid.upload(uid, data.get('data', ''))
        if res == -1:
            return JsonResponse({
                'status': 'failed',
                'error_id': -2,
                'error': 'unsupported MIME type (image/jpeg expected)'
            })
        else:
            return JsonResponse({'status': 'succeeded'})
    return JsonResponse({
        'status': 'failed',
        'error_id': 0,
        'error': 'wrong request method (expecting POST request)'
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
                'error_id': -1,
                'error': 'failed to logout'
            })
    return JsonResponse({
        'status': 'failed',
        'error_id': 0,
        'error': 'wrong request method (expecting GET request)'
    })

def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        tmp = login.login(
            email = data.get('email', ''),
            password = data.get('password', ''))
        if tmp == -2:
            return JsonResponse({
                'status': 'failed',
                'error_id': -2,
                'error': 'incorrect email address or password'
            })
        res = {
            'status': 'succeeded',
            'uid': tmp
        }
        request.session['uid'] = tmp
        return JsonResponse(res)

