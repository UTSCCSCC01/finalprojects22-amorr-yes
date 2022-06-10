from ..models import User
import hashlib

def get(uid):
    user = User.objects.get(id=uid)
    res = {
        'uid': user.id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'photoid_src': '/media/photoid/' + user.photoid,
        'gravatar_md5': hashlib.md5(user.email.encode('utf-8')).hexdigest()
    }
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