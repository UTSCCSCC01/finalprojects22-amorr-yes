import traceback
from ..models import Option

def set_option(name, value):
    name = str(name)
    value = str(value)
    opt = Option.objects.filter(name=name)
    if opt.count() == 0:
        opt = Option(
            name = name,
            value = value
        )
    else:
        opt = opt[0]
        opt.value = value
    try:
        opt.save()
        return True
    except:
        traceback.print_exc()
        return False

def get_option(name, default=None):
    name = str(name)
    opt = Option.objects.filter(name=name)
    if opt.count() == 0:
        return default
    opt = opt[0]
    return str(opt.value)
