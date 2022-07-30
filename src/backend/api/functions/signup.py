from ..models import User
from .encrypt import password_hash

def signup(email, first_name, last_name, password, user_type):
    if (email == '' or
        first_name == '' or
        last_name == '' or
        password == ''):
        return -1
    if User.objects.filter(email=email).count() > 0:
        return -3
    user = User(
        first_name = first_name,
        last_name = last_name,
        email = email,
        password = password_hash(password),
        user_type = user_type,
        photoid_verified = 'never',
        certificate_verified = 'never',
    )
    try:
        user.save()
    except:
        return -2
    return user.id
