from ..models import User
from .encrypt import password_hash

def login(email, password):
    if (email == '' or
        password == ''):
        return -2
    users = User.objects.filter(email=email)
    if users.count() != 1:
        return -2
    user = users[0]
    password = password_hash(password)
    if user.password != password:
        return -2
    return user.id