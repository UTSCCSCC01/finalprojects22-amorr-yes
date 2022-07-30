from . import option, order
from ..models import Order, User, Post

ADMIN_ACCESS_CODE = "123456"
ADMIN_PAYMENT_LINK = "https://paypal.me/zhenyuanxiang"

# def set_payment_link(link):
#     if option.set_option("admin_payment_link", link):
#         return True
#     return False

def get_payment_link():
    # return option.get_option("admin_payment_link", "")
    return ADMIN_PAYMENT_LINK

def verify_access_code(code):
    return ADMIN_ACCESS_CODE == code

def verify_photoid(uid, accept):
    try:
        user = User.objects.get(id=uid)
        if accept:
            user.photoid_verified = "accepted"
        else:
            user.photoid_verified = "rejected"
        user.save()
        return 1
    except:
        return -1

def verify_certificate(uid, accept):
    try:
        user = User.objects.get(id=uid)
        if user.provider != "provider":
            return -2
        if accept:
            user.certificate_verified = "accepted"
        else:
            user.certificate_verified = "rejected"
        user.save()
        return 1
    except:
        return -1

def get_unverified_photoid_list():
    tmp = User.objects.filter(photoid_verified='pending')
    res = []
    for user in tmp:
        res.append({
            'uid': user.id,
            'user_type': user.user_type,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'phone': user.phone,
            'about': user.about,
            'categories': user.categories
        })
    return res

def get_unverified_certificate_list():
    tmp = User.objects.filter(user_type="provider").filter(certificate_verified='pending')
    res = []
    for user in tmp:
        res.append({
            'uid': user.id,
            'user_type': user.user_type,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'phone': user.phone,
            'about': user.about,
            'categories': user.categories
        })
    return res

def get_unpaid_order_list():
    tmp = Order.objects.filter(status=order.STATUS_COMPLETED).filter(is_paid=False)
    res = []
    for i in tmp:
        post = Post.objects.get(id=i.pid)
        provider = User.objects.get(id=post.author_id)
        salary = int(post.price) * int(i.duration)
        res.append({
            'oid': i.id,
            'uid': i.uid,
            'pid': i.pid,
            'start_time': i.start_time,
            'duration': i.duration,
            'date': i.date,
            'status': i.status,
            'post_title': post.title,
            'post_price': post.price,
            'provider_first_name': provider.first_name,
            'provider_last_name': provider.last_name,
            'provider_email': provider.email,
            'client_location': i.client_location,
            'client_postal_code': i.client_postal_code,
            'salary': salary
        })
    return res

def pay_salary(oid):
    try:
        order = Order.objects.get(id=oid)
        order.is_paid = True
        order.save()
        return 1
    except:
        return -1
