from ..models import Order

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
