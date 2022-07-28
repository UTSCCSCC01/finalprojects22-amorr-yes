from ..models import Order, Post, User

STATUS_PENDING = "pending"
STATUS_ACCEPTED = "accepted"
STATUS_REJECTED = "rejected"
STATUS_COMPLETED = "completed"

ORDER_HST_RATE = 0.13
ORDER_SERVICE_FEE_RATE = 0.1

def calc_order_total(price):
    return price * (1 + ORDER_HST_RATE + ORDER_SERVICE_FEE_RATE)

def create_order(uid, pid, start_time, duration, date, client_location, client_postal_code):
    if pid == -1 or start_time == -1 or duration == -1 or date == -1:
        return -1
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
        return -2

def get_order_list(client_id=-1, provider_id=-1):
    res = Order.objects.all()
    if client_id > 0:
        res = res.filter(uid=client_id)
    if provider_id > 0:
        ps = Post.objects.filter(author_id=provider_id)
        tmp = Post.objects.none()
        for p in ps:
            tmp = tmp | res.filter(pid=p.id)
        res = tmp
    tmp = res
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