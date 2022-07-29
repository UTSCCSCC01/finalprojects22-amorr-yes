from django.http import JsonResponse
from .functions import signup, user, upload_photoid, \
    upload_certificate, login, logout, post, order, \
    admin
import json

def signup_view(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        res = signup.signup(
            first_name = data.get('first_name', ''),
            last_name = data.get('last_name', ''),
            email = data.get('email', ''),
            password = data.get('password', ''),
            user_type = data.get('user_type', '')
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

def user_info_by_uid_view(request):
    if request.method == 'GET':
        uid = request.GET.get('uid', 0)
        res = user.get(uid)
        if res == -1:
            return JsonResponse({
                'status': 'failed',
                'error_id': -1,
                'error': 'cannot get the user by given uid'
            })
        res['status'] = 'succeeded'
        return JsonResponse(res)
    return JsonResponse({
        'status': 'failed',
        'error_id': 0,
        'error': 'wrong request method (expecting GET request)'
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

def user_info_set_view(request):
    if request.method == 'POST':
        uid = request.session.get('uid', 0)
        if uid <= 0:
            return JsonResponse({
                'status': 'failed',
                'error_id': -1,
                'error': 'unauthenticated user'
            })
        res = user.set(uid, json.loads(request.body.decode('utf-8')))
        if res == -1:
            return JsonResponse({
                'status': 'failed',
                'error_id': -2,
                'error': 'invalid parameters'
            })
        return JsonResponse({'status': 'succeeded'})
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

def upload_certificate_view(request):
    if request.method == 'POST':
        uid = request.session.get('uid', 0)
        if uid <= 0:
            return JsonResponse({
                'status': 'failed',
                'error_id': -1,
                'error': 'unauthenticated user'
            })
        data = json.loads(request.body.decode('utf-8'))
        res = upload_certificate.upload(uid, data.get('data', ''))
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
    return JsonResponse({
        'status': 'failed',
        'error_id': 0,
        'error': 'wrong request method (expecting POST request)'
    })

def get_post_list_view(request):
    if request.method == 'GET':
        params = {}
        if 'range' in request.GET:
            if not 'addr' in request.GET:
                return JsonResponse({
                    'status': 'failed',
                    'error_id': -1,
                    'error': 'missing addr parameter for range filter'
                })
            params['range'] = request.GET['range']
            params['addr'] = request.GET['addr']
        if 'author' in request.GET:
            params['author'] = request.GET['author']
        if 'sortby' in request.GET:
            params['sortby'] = request.GET['sortby']
            if params['sortby'] == 'range':
                if 'addr' in request.GET:
                    params['addr'] = request.GET['addr']
                else:
                    return JsonResponse({
                        'status': 'failed',
                        'error_id': -2,
                        'error': 'missing addr parameter for sort by range'
                    })
        if 'keywords' in request.GET:
            params['keywords'] = request.GET['keywords']
        return JsonResponse({
            'status': 'succeeded',
            'result': post.get_post_list(params)
        })
    return JsonResponse({
        'status': 'failed',
        'error_id': 0,
        'error': 'wrong request method (expecting GET request)'
    })

def get_post_view(request):
    if request.method == 'GET':
        if not 'pid' in request.GET:
            return JsonResponse({
                'status': 'failed',
                'error_id': -1,
                'error': 'missing pid'
            })
        res = post.get_post(request.GET['pid'])
        if res == -1:
            return JsonResponse({
                'status': 'failed',
                'error_id': -2,
                'error': 'invalid pid'
            })
        return JsonResponse({
            'status': 'succeeded',
            'result': res
        })
    return JsonResponse({
        'status': 'failed',
        'error_id': 0,
        'error': 'wrong request method (expecting GET request)'
    })

def save_post_view(request):
    if request.method == 'POST':
        uid = request.session.get('uid', 0)
        if uid <= 0:
            return JsonResponse({
                'status': 'failed',
                'error_id': -1,
                'error': 'unauthenticated user'
            })
        data = json.loads(request.body.decode('utf-8'))
        res = post.save_post(
            pid = data.get('pid', -1),
            title = data.get('title', -1),
            text = data.get('text', -1),
            start_time = data.get('start_time', -1),
            end_time = data.get('end_time', -1),
            location = data.get('location', -1),
            postal_code = data.get('postal_code', -1),
            price = data.get('price', -1),
            author_id = uid,
            daySelector = data.get('daySelector', -1)
        )
        if res == -3:
            return JsonResponse({
                'status': 'failed',
                'error_id': -4,
                'error': 'invalid pid'
            })
        if res == -1:
            return JsonResponse({
                'status': 'failed',
                'error_id': -2,
                'error': 'pid does not exist'
            })
        if res == -2:
            return JsonResponse({
                'status': 'failed',
                'error_id': -3,
                'error': 'unable to write into database'
            })
        if res == -4:
            return JsonResponse({
                'status': 'failed',
                'error_id': -5,
                'error': 'cannot modify posts that are not yours'
            })
        if res == -5:
            return JsonResponse({
                'status': 'failed',
                'error_id': -6,
                'error': 'invalid parameters for creating a new post'
            })
        return JsonResponse({
            'status': 'succeeded',
            'pid': res
        })
    return JsonResponse({
        'status': 'failed',
        'error_id': 0,
        'error': 'wrong request method (expecting POST request)'
    })

def get_user_post_list_view(request):
    if request.method == 'GET':
        uid = request.session.get('uid', 0)
        if uid <= 0:
            return JsonResponse({
                'status': 'failed',
                'error_id': -1,
                'error': 'unauthenticated user'
            })
        return JsonResponse({
            'status': 'succeeded',
            'result': post.get_post_list({'author': uid})
        })
    return JsonResponse({
        'status': 'failed',
        'error_id': 0,
        'error': 'wrong request method (expecting GET request)'
    })

def create_order_view(request):
    if request.method == 'POST':
        uid = request.session.get('uid', 0)
        if uid <= 0:
            return JsonResponse({
                'status': 'failed',
                'error_id': -1,
                'error': 'unauthenticated user'
            })
        data = json.loads(request.body.decode('utf-8'))
        res = order.create_order(
            uid = uid,
            pid = data.get('pid', -1),
            start_time = data.get('start_time', -1),
            duration = int(data.get('duration', -1)),
            date = data.get('date', -1),
            client_location = data.get('client_location', -1),
            client_postal_code = data.get('client_postal_code', -1)
        )
        if res == -1:
            return JsonResponse({
                'status': 'failed',
                'error_id': -2,
                'error': 'invalid parameters'
            })
        if res == -2:
            return JsonResponse({
                'status': 'failed',
                'error_id': -3,
                'error': 'unable to write into database'
            })
        return JsonResponse({
            'status': 'succeeded',
            'oid': res
        })
    return JsonResponse({
        'status': 'failed',
        'error_id': 0,
        'error': 'wrong request method (expecting POST request)'
    })

def get_order_view(request):
    if request.method == 'GET':
        res = order.get_order_list(
            client_id = int(request.GET.get('client_id', -1)),
            provider_id = int(request.GET.get('provider_id', -1))
        )
        return JsonResponse({
            'status': 'succeeded',
            'result': res
        })
    return JsonResponse({
        'status': 'failed',
        'error_id': 0,
        'error': 'wrong request method (expecting GET request)'
    })

def get_client_order_view(request):
    if request.method == 'GET':
        uid = request.session.get('uid', 0)
        if uid <= 0:
            return JsonResponse({
                'status': 'failed',
                'error_id': -1,
                'error': 'unauthenticated user'
            })
        res = order.get_order_list(client_id = uid)
        return JsonResponse({
            'status': 'succeeded',
            'result': res
        })
    return JsonResponse({
        'status': 'failed',
        'error_id': 0,
        'error': 'wrong request method (expecting GET request)'
    })

def get_provider_order_view(request):
    if request.method == 'GET':
        uid = request.session.get('uid', 0)
        if uid <= 0:
            return JsonResponse({
                'status': 'failed',
                'error_id': -1,
                'error': 'unauthenticated user'
            })
        res = order.get_order_list(provider_id = uid)
        return JsonResponse({
            'status': 'succeeded',
            'result': res
        })
    return JsonResponse({
        'status': 'failed',
        'error_id': 0,
        'error': 'wrong request method (expecting GET request)'
    })

def accept_order_view(request):
    if request.method == 'POST':
        uid = request.session.get('uid', 0)
        if uid <= 0:
            return JsonResponse({
                'status': 'failed',
                'error_id': -1,
                'error': 'unauthenticated user'
            })
        data = json.loads(request.body.decode('utf-8'))
        new_status = data.get('accept', -1)
        if new_status == True:
            new_status = order.STATUS_ACCEPTED
        elif new_status == False:
            new_status = order.STATUS_REJECTED
        res = order.set_order_status(
            oid = int(data.get('oid', -1)),
            status = new_status
        )
        if res == -1:
            return JsonResponse({
                'status': 'failed',
                'error_id': -1,
                'error': 'invalid parameters'
            })
        if res == -2:
            return JsonResponse({
                'status': 'failed',
                'error_id': -2,
                'error': 'cannot find the order by given oid'
            })
        return JsonResponse({ 'status': 'succeeded' })
    return JsonResponse({
        'status': 'failed',
        'error_id': 0,
        'error': 'wrong request method (expecting POST request)'
    })

def delete_post_view(request):
    if request.method == 'POST':
        uid = request.session.get('uid', 0)
        if uid <= 0:
            return JsonResponse({
                'status': 'failed',
                'error_id': -1,
                'error': 'unauthenticated user'
            })
        data = json.loads(request.body.decode('utf-8'))
        res = post.delete_post(
            pid = int(data.get('pid', -1)),
            author_id = uid
        )
        if res == -1:
            return JsonResponse({
                'status': 'failed',
                'error_id': -2,
                'error': 'invalid parameters'
            })
        if res == -2:
            return JsonResponse({
                'status': 'failed',
                'error_id': -3,
                'error': 'cannot find the post by given pid'
            })
        if res == -3:
            return JsonResponse({
                'status': 'failed',
                'error_id': -4,
                'error': 'cannot delete posts that are not yours'
            })
        return JsonResponse({ 'status': 'succeeded' })
    return JsonResponse({
        'status': 'failed',
        'error_id': 0,
        'error': 'wrong request method (expecting POST request)'
    })

def set_payment_link_view(request):
    if request.method == 'POST':
        is_admin = request.session.get('is_admin', False)
        if not is_admin:
            return JsonResponse({
                'status': 'failed',
                'error_id': -1,
                'error': 'unauthenticated user'
            })
        data = json.loads(request.body.decode('utf-8'))
        if not 'link' in data:
            return JsonResponse({
                'status': 'failed',
                'error_id': -2,
                'error': 'invalid parameters'
            })
        res = admin.set_payment_link(str(data.get('link')))
        if not res:
            return JsonResponse({
                'status': 'failed',
                'error_id': -3,
                'error': 'unable to write into database'
            })
        return JsonResponse({ 'status': 'succeeded' })
    return JsonResponse({
        'status': 'failed',
        'error_id': 0,
        'error': 'wrong request method (expecting POST request)'
    })

def get_payment_link_view(request):
    if request.method == 'GET':
        is_admin = request.session.get('is_admin', False)
        if not is_admin:
            return JsonResponse({
                'status': 'failed',
                'error_id': -1,
                'error': 'unauthenticated user'
            })
        return JsonResponse({
            'link': admin.get_payment_link(),
            'status': 'succeeded'
        })
    return JsonResponse({
        'status': 'failed',
        'error_id': 0,
        'error': 'wrong request method (expecting GET request)'
    })

def admin_login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        if not 'code' in data:
            return JsonResponse({
                'status': 'failed',
                'error_id': -1,
                'error': 'invalid parameters'
            })
        code = str(data.get('code'))
        if admin.verify_access_code(code):
            request.session['is_admin'] = True
            return JsonResponse({
                'status': 'succeeded'
            })
        return JsonResponse({
            'status': 'failed',
            'error_id': -2,
            'error': 'login failed'
        })
    return JsonResponse({
        'status': 'failed',
        'error_id': 0,
        'error': 'wrong request method (expecting POST request)'
    })

def admin_logout_view(request):
    if request.method == 'GET':
        is_admin = request.session.get('is_admin', False)
        if not is_admin:
            return JsonResponse({
                'status': 'failed',
                'error_id': -1,
                'error': 'unauthenticated user'
            })
        admin.logout(request)
        return JsonResponse({
            'status': 'succeeded'
        })
    return JsonResponse({
        'status': 'failed',
        'error_id': 0,
        'error': 'wrong request method (expecting GET request)'
    })

def get_order_details_view(request):
    if request.method == 'GET':
        if not 'oid' in request.GET:
            return JsonResponse({
                'status': 'failed',
                'error_id': -1,
                'error': 'invalid parameters'
            })
        res = order.get_order_details(int(request.GET['oid']))
        if res == -1:
            return JsonResponse({
                'status': 'failed',
                'error_id': -2,
                'error': 'invalid oid'
            })
        res['status'] = 'succeeded'
        return JsonResponse(res)
    return JsonResponse({
        'status': 'failed',
        'error_id': 0,
        'error': 'wrong request method (expecting GET request)'
    })

def verify_photoid_view(request):
    if request.method == 'POST':
        is_admin = request.session.get('is_admin', False)
        if not is_admin:
            return JsonResponse({
                'status': 'failed',
                'error_id': -1,
                'error': 'unauthenticated user'
            })
        data = json.loads(request.body.decode('utf-8'))
        if not 'uid' in data:
            return JsonResponse({
                'status': 'failed',
                'error_id': -2,
                'error': 'invalid parameters'
            })
        uid = int(data.get('uid'))
        if admin.verify_photoid(uid) == 1:
            return JsonResponse({
                'status': 'succeeded'
            })
        return JsonResponse({
            'status': 'failed',
            'error_id': -3,
            'error': 'invalid uid'
        })
    return JsonResponse({
        'status': 'failed',
        'error_id': 0,
        'error': 'wrong request method (expecting POST request)'
    })

def verify_certificate_view(request):
    if request.method == 'POST':
        is_admin = request.session.get('is_admin', False)
        if not is_admin:
            return JsonResponse({
                'status': 'failed',
                'error_id': -1,
                'error': 'unauthenticated user'
            })
        data = json.loads(request.body.decode('utf-8'))
        if not 'uid' in data:
            return JsonResponse({
                'status': 'failed',
                'error_id': -2,
                'error': 'invalid parameters'
            })
        uid = int(data.get('uid'))
        res = admin.verify_certificate(uid)
        if res == 1:
            return JsonResponse({
                'status': 'succeeded'
            })
        if res == -2:
            return JsonResponse({
            'status': 'failed',
            'error_id': -3,
            'error': 'given user is not a provider'
        })
        return JsonResponse({
            'status': 'failed',
            'error_id': -4,
            'error': 'invalid uid'
        })
    return JsonResponse({
        'status': 'failed',
        'error_id': 0,
        'error': 'wrong request method (expecting POST request)'
    })

def get_unverified_photoid_list_view(request):
    if request.method == 'GET':
        is_admin = request.session.get('is_admin', False)
        if not is_admin:
            return JsonResponse({
                'status': 'failed',
                'error_id': -1,
                'error': 'unauthenticated user'
            })
        return JsonResponse({
            'status': 'succeeded',
            'result': admin.get_unverified_photoid_list()
        })
    return JsonResponse({
        'status': 'failed',
        'error_id': 0,
        'error': 'wrong request method (expecting GET request)'
    })

def get_unverified_certificate_list_view(request):
    if request.method == 'GET':
        is_admin = request.session.get('is_admin', False)
        if not is_admin:
            return JsonResponse({
                'status': 'failed',
                'error_id': -1,
                'error': 'unauthenticated user'
            })
        return JsonResponse({
            'status': 'succeeded',
            'result': admin.get_unverified_certificate_list()
        })
    return JsonResponse({
        'status': 'failed',
        'error_id': 0,
        'error': 'wrong request method (expecting GET request)'
    })

def get_unpaid_order_list_view(request):
    if request.method == 'GET':
        is_admin = request.session.get('is_admin', False)
        if not is_admin:
            return JsonResponse({
                'status': 'failed',
                'error_id': -1,
                'error': 'unauthenticated user'
            })
        return JsonResponse({
            'status': 'succeeded',
            'result': admin.get_unpaid_order_list()
        })
    return JsonResponse({
        'status': 'failed',
        'error_id': 0,
        'error': 'wrong request method (expecting GET request)'
    })

def get_admin_status_view(request):
    if request.method == 'GET':
        return JsonResponse({
            'status': 'succeeded',
            'result': request.session.get('is_admin', False)
        })
    return JsonResponse({
        'status': 'failed',
        'error_id': 0,
        'error': 'wrong request method (expecting GET request)'
    })
