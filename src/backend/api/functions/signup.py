from ..models import User
from .encrypt import password_hash

def signup(email, first_name, last_name, password):
    if (email == False or
        first_name == False or
        last_name == False or
        password == False):
        return False
    user = User(
        first_name = first_name,
        last_name = last_name,
        email = email,
        password = password_hash(password)
    )
    try:
        user.save()
    except:
        return False
    return True
