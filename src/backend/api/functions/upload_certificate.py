import base64, os, hashlib, time
from django.conf import settings
from ..models import User

SUPPORT_TYPE = 'image/jpeg'

def upload(uid, data):
    data = data.split(':')[1].split(';')
    data[1] = data[1].split(',')
    data[0] = data[0].strip()
    data[1][0] = data[1][0].strip()
    data[1][1] = data[1][1].strip()
    if data[0] != SUPPORT_TYPE:
        return -1
    md5 = hashlib.md5(str(uid).encode('utf-8'))
    md5.update(str(time.time()).encode('utf-8'))
    path = md5.hexdigest() + '.jpg'
    certificate_dir = settings.BASE_DIR.joinpath('media', 'certificate')
    file = open(certificate_dir.joinpath(path), 'wb')
    file.write(base64.b64decode(data[1][1]))
    file.close()
    user = User.objects.get(id=uid)
    if user.certificate != '':
        os.remove(certificate_dir.joinpath(user.certificate))
    user.certificate = path
    user.certificate_verified = False
    user.save()
    return 1
