import traceback, time, datetime

from ..models import Order, Post, User
from django.db.models import Q

STATUS_PENDING = "pending"
STATUS_ACCEPTED = "accepted"
STATUS_REJECTED = "rejected"
STATUS_COMPLETED = "completed"

ORDER_HST_RATE = 0.13
ORDER_SERVICE_FEE_RATE = 0.1

def calc_order_total(price):
    return price * (1 + ORDER_SERVICE_FEE_RATE) * (1 + ORDER_HST_RATE)

def time_to_ts(date, start_time, offset_h):
    res = int(time.mktime(datetime.datetime.strptime(date, "%Y-%m-%d").timetuple()))
    sts = start_time.split(':')
    res += 3600 * (int(sts[0]) + int(offset_h)) + 60 * int(sts[1])
    return res

def check_order_conflict(order_set, date, start_time, duration):
    start_ts = time_to_ts(date, start_time, 0)
    end_ts = time_to_ts(date, start_time, duration)
    for order in order_set:
        o_start = time_to_ts(order.date, order.start_time, 0)
        o_end = time_to_ts(order.date, order.start_time, order.duration)
        if not (o_end <= start_ts or o_start >= end_ts):
            return True
    return False

def get_order_set(client_id=-1, provider_id=-1):
    res = Order.objects.all()
    if client_id > 0:
        res = res.filter(uid=client_id)
    if provider_id > 0:
        ps = Post.objects.filter(author_id=provider_id)
        tmp = Post.objects.none()
        for p in ps:
            tmp = tmp | res.filter(pid=p.id)
        res = tmp
    return res

def create_order(uid, pid, start_time, duration, date, client_location, client_postal_code):
    if pid == -1 or start_time == -1 or duration == -1 or date == -1:
        return -1
    post = Post.objects.get(id=pid)
    if post.daySelector & (1 << (datetime.datetime.strptime(date, "%Y-%m-%d").weekday())) == 0:
        return -3
    order_set = get_order_set(-1, post.author_id).filter(Q(status=STATUS_PENDING) | Q(status=STATUS_ACCEPTED))
    if check_order_conflict(order_set, date, start_time, duration):
        return -4
    o = Order(
        uid = uid,
        pid = pid,
        start_time = start_time,
        duration = duration,
        date = date,
        status = STATUS_PENDING,
        client_location = client_location,
        client_postal_code = client_postal_code
    )
    try:
        o.save()
        return o.id
    except:
        traceback.print_exc()
        return -2

def get_order_list(client_id=-1, provider_id=-1):
    tmp = get_order_set(client_id, provider_id)
    res = []
    for i in tmp:
        post = Post.objects.get(id=i.pid)
        client = User.objects.get(id=i.uid)
        provider = User.objects.get(id=post.author_id)
        total = calc_order_total(int(post.price) * int(i.duration))
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
            'client_first_name': client.first_name,
            'client_last_name': client.last_name,
            'provider_first_name': provider.first_name,
            'provider_last_name': provider.last_name,
            'client_location': i.client_location,
            'client_postal_code': i.client_postal_code,
            'total': total
        })
    return res

def set_order_status(oid, status):
    if oid == -1 or status not in (STATUS_PENDING, STATUS_ACCEPTED,
                                   STATUS_REJECTED, STATUS_COMPLETED):
        return -1
    try:
        order = Order.objects.get(id=oid)
        post = Post.objects.get(id=order.pid)
        if status == STATUS_ACCEPTED:
            order_set = get_order_set(-1, post.author_id).filter(status=STATUS_ACCEPTED)
            if check_order_conflict(order_set, order.date, order.start_time, order.duration):
                return -3
        order.status = status
        order.save()
        return 1
    except:
        return -2

def get_order_details(oid):
    try:
        order = Order.objects.get(id=oid)
        post = Post.objects.get(id=order.pid)
        client = User.objects.get(id=order.uid)
        provider = User.objects.get(id=post.author_id)
        total = calc_order_total(int(post.price) * int(order.duration))
        return {
            'oid': order.id,
            'uid': order.uid,
            'pid': order.pid,
            'start_time': order.start_time,
            'duration': order.duration,
            'date': order.date,
            'status': order.status,
            'post_title': post.title,
            'post_price': post.price,
            'client_first_name': client.first_name,
            'client_last_name': client.last_name,
            'provider_first_name': provider.first_name,
            'provider_last_name': provider.last_name,
            'client_location': order.client_location,
            'client_postal_code': order.client_postal_code,
            'total': total
        }
    except:
        return -1