from ..models import User
from .encrypt import password_hash

def signup(email, first_name, last_name, password):
    if (email == '' or
        first_name == '' or
        last_name == '' or
        password == ''):
        return -1
    user = User(
        first_name = first_name,
        last_name = last_name,
        email = email,
        password = password_hash(password)
    )
    try:
        user.save()
    except:
        return -2
    return user.id
