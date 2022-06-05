import hashlib
from backend import settings

def password_hash(password):
    md5 = hashlib.md5(settings.AUTH_SALT.encode('utf-8'))
    md5.update(password.encode('utf-8'))
    return md5.hexdigest()