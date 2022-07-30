from ..models import User
from .encrypt import password_hash
import hashlib

def get(uid):
    try:
        user = User.objects.get(id=uid)
        photoid = user.photoid
        certificate = user.certificate
        if photoid == '':
            photoid = 'default.jpg'
        if certificate == '':
            certificate = 'default.jpg'
        res = {
            'uid': user.id,
            'user_type': user.user_type,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'phone': user.phone,
            'about': user.about,
            'categories': user.categories,
            'photoid_src': '/media/photoid/' + photoid,
            'certificate_src': '/media/certificate/' + certificate,
            'gravatar_md5': hashlib.md5(user.email.encode('utf-8')).hexdigest(),
            'photoid_verified': user.photoid != '' and user.photoid_verified,
        }
        if user.user_type == "provider":
            res['certificate_verified'] = user.certificate != '' and user.certificate_verified
        return res
    except:
        return -1

def set(uid, data):
    user = User.objects.get(id=uid)
    first_name = data.get('first_name', '')
    last_name = data.get('last_name', '')
    email = data.get('email', '')
    password = data.get('password', '')
    phone = data.get('phone', '')
    about = data.get('about', '')
    categories = data.get('categories', '')
    if (first_name == '' or
        last_name == '' or
        email == ''):
        return -1
    if password != '':
        user.password = password_hash(password)
    user.first_name = first_name
    user.last_name = last_name
    user.email = email
    user.phone = phone
    user.about = about
    user.categories = categories
    user.save()
    return 1
