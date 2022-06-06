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
