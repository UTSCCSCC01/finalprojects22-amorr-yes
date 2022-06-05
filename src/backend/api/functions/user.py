from ..models import User

def get(uid):
    if uid == False:
        return {'result': False}
    res = {}
    try:
        user = User.objects.get(id=uid)
        res = {
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email
        }
    except:
        res = {'result': False}
    return res
