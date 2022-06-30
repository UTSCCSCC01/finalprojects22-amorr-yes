from ..models import Post

def save_post(pid, title, text, start_time, end_time, location, postal_code,
              author_id):
    pid = int(pid)
    if pid == -1:
        return -3
    p = 0
    if pid == 0:
        if (title == -1 or text == -1 or start_time == -1 or end_time == -1 or
            location == -1 or postal_code == -1):
            return -5
        p = Post(
            title = title,
            text = text,
            start_time = start_time,
            end_time = end_time,
            location = location,
            postal_code = postal_code,
            author_id = author_id
        )
    else:
        ps = Post.objects.filter(id=pid)
        if len(ps) == 0:
            return -1
        p = ps[0]
        if p.author_id != author_id:
            return -4
        if title != -1:
            p.title = title
        if text != -1:
            p.text = text
        if start_time != -1:
            p.start_time = start_time
        if end_time != -1:
            p.end_time = end_time
        if location != -1:
            p.location = location
        if postal_code != -1:
            p.postal_code = postal_code
    try:
        p.save()
    except:
        return -2
    return p.id
        