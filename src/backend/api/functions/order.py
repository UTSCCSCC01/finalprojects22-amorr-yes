from ..models import Order, Post

STATUS_PENDING = "pending"
STATUS_ACCEPTED = "accepted"
STATUS_REJECTED = "rejected"
STATUS_COMPLETED = "completed"

def create_order(uid, pid, start_time, duration, date):
    if pid == -1 or start_time == -1 or duration == -1 or date == -1:
        return -1
    o = Order(
        uid = uid,
        pid = pid,
        start_time = start_time,
        duration = duration,
        date = date,
        status = STATUS_PENDING
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
        res.append({
            'oid': i.id,
            'uid': i.uid,
            'pid': i.pid,
            'start_time': i.start_time,
            'duration': i.duration,
            'date': i.date,
            'status': i.status,
        })
    return res
