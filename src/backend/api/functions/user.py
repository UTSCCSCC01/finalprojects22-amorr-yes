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
