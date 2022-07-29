from . import option
from ..models import User

ADMIN_ACCESS_CODE = "123456"

def set_payment_link(link):
    if option.set_option("admin_payment_link", link):
        return True
    return False

def get_payment_link():
    return option.get_option("admin_payment_link", "")

def verify_access_code(code):
    return ADMIN_ACCESS_CODE == code

def logout(request):
    request.session.flush()

def verify_photoid(uid):
    try:
        user = User.objects.get(id=uid)
        user.photoid_verified = True
        user.save()
        return 1
    except:
        return -1

def verify_certificate(uid):
    try:
        user = User.objects.get(id=uid)
        if user.provider != "provider":
            return -2
        user.certificate_verified = True
        user.save()
        return 1
    except:
        return -1

def get_unverified_photoid_list():
    tmp = User.objects.filter(photoid_verified=False)
    res = []
    for user in tmp:
        res.append({
            'uid': user.id,
            'user_type': user.user_type,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'phone': user.phone,
            'about': user.about,
            'categories': user.categories
        })
    return res

def get_unverified_certificate_list():
    tmp = User.objects.filter(user_type="provider").filter(certificate_verified=False)
    res = []
    for user in tmp:
        res.append({
            'uid': user.id,
            'user_type': user.user_type,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'phone': user.phone,
            'about': user.about,
            'categories': user.categories
        })
    return res
