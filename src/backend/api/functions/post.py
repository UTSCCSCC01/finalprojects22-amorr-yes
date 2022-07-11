from operator import itemgetter, attrgetter
from ..models import Post, User
from . import google_map
import markdown

INF_DISTANCE_KM = 152100000

def day_to_int(daySelector):
    res = 0
    if daySelector['monday']:
        res + = 1
    if daySelector['tuesday']:
        res += 2
    if daySelector['wednesday']:
        res += 4
    if daySelector['thursday']:
        res += 8
    if daySelector['friday']:
        res += 16
    if daySelector['saturday']:
        res += 32
    if daySelector['sunday']:
        res += 64
    return res

def int_to_day(daySelector):
    res = {
        'monday': False,
        'tuesday': False,
        'wednesday': False,
        'thursday': False,
        'friday': False,
        'saturday': False,
        'sunday': False
    }
    if daySelector == 0:
        return res
    for i in range(7):
        if (daySelector & (1 << i)) != 0:
            res[day_list[i]] = True
    return res


def save_post(pid, title, text, start_time, end_time, location, postal_code,
              price, author_id, daySelector):
    pid = int(pid)
    if pid == -1:
        return -3
    p = 0
    if pid == 0:
        if (title == -1 or text == -1 or start_time == -1 or end_time == -1 or
            location == -1 or postal_code == -1 or price == -1):
            return -5
        p = Post(
            title = title,
            text = text,
            start_time = start_time,
            end_time = end_time,
            location = location,
            postal_code = postal_code,
            author_id = author_id,
            price = price,
            daySelector = day_to_int(daySelector)
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
        if price != -1:
            p.price = price
        if daySelector != -1:
            p.daySelector = day_to_int(daySelector)
    try:
        p.save()
    except:
        return -2
    return p.id

def get_post_list(params):
    res = Post.objects.all()
    if 'author' in params:
        res = res.filter(author_id=params['author'])
    if 'keywords' in params:
        keys = params['keywords'].split()
        if len(keys) > 0:
            res_title = res
            res_text = res
            for k in keys:
                res_title = res_title.filter(title__icontains=k)
                res_text = res_text.filter(text__icontains=k)
            res = res_title | res_text
    res = list(res)
    if 'range' in params:
        coor1 = google_map.get_coordinates(params['addr'])
        if coor1['status'] == 'OK':
            r = float(params['range'])
            p1 = (coor1['lat'], coor1['lng'])
            tmp = []
            for p in res:
                coor2 = google_map.get_coordinates(p.postal_code)
                if coor2['status'] == 'OK':
                    p2 = (coor2['lat'], coor2['lng'])
                    if google_map.get_distance_km_by_coordinates(p1, p2) <= r:
                        tmp.append(p)
            res = tmp
    if 'sortby' in params:
        key = params['sortby']
        if key == 'range':
            coor1 = google_map.get_coordinates(params['addr'])
            if coor1['status'] == 'OK':
                p1 = (coor1['lat'], coor1['lng'])
                tmp = []
                for p in res:
                    coor2 = google_map.get_coordinates(p.postal_code)
                    if coor2['status'] == 'OK':
                        p2 = (coor2['lat'], coor2['lng'])
                        tmp.append((
                            google_map.get_distance_km_by_coordinates(p1, p2),
                            p
                        ))
                    else:
                        tmp.append((INF_DISTANCE_KM, p))
                tmp.sort(key=itemgetter(0))
                res = []
                for p in tmp:
                    res.append(p[1])
        elif key == 'price':
            res.sort(key=attrgetter('price'))
    tmp = []
    for p in res:
        author = User.objects.get(id=p.author_id)
        tmp.append({
            'pid': p.id,
            'title': p.title,
            'author_id': author.id,
            'author_first_name': author.first_name,
            'author_last_name': author.last_name,
            'start_time': p.start_time,
            'end_time': p.end_time,
            'location': p.location,
            'postal_code': p.postal_code,
            'price': p.price
        })
    res = tmp
    return res

def get_post(pid):
    pid = int(pid)
    p = Post.objects.filter(id=pid)
    if len(p) == 0:
        return -1
    p = p[0]
    author = User.objects.get(id=p.author_id)
    res = {
        'pid': p.id,
        'title': p.title,
        'text': p.text,
        'html': markdown.markdown(p.text),
        'author_id': author.id,
        'author_first_name': author.first_name,
        'author_last_name': author.last_name,
        'author_email': author.email,
        'author_phone': author.phone,
        'start_time': p.start_time,
        'end_time': p.end_time,
        'location': p.location,
        'postal_code': p.postal_code,
        'price': p.price,
        'daySelector':  int_to_day(p.daySelector)
    }
    return res
