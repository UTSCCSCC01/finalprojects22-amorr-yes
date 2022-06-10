from ..models import User

def get(uid):
    if uid == '':
        return {'result': False}
    res = {}
    try:
        user = User.objects.get(id=int(uid))
        res = {
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email
        }
    except:
        res = -1
    return res

def set(uid, data):
    user = User.objects.get(id=uid)
    first_name = data.get('first_name', '')
    last_name = data.get('last_name', '')
    email = data.get('email', '')
    password = data.get('password', '')
    phone = data.get('phone', '')
    about = data.get('about', '')
    if first_name == '' or
        last_name == '' or
        email == '':
        return -1
    if password != '':
        user.password = password
    user.first_name = first_name
    user.last_name = last_name
    user.email = email
    user.phone = phone
    user.about = about
    user.save()
    return 1