from . import option

ADMIN_ACCESS_CODE = "123456"

def set_payment_link(link):
    if option.set_option("admin_payment_link", link):
        return True
    return False

def get_payment_link():
    return option.get_option("admin_payment_link", "")
