import requests, json, geopy.distance

GM_API_KEY = 'AIzaSyA_TSMwavtEtziPdylCNIzlWiuj5XzRP-E'
GM_GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json'

def get_by_geocode(geocode):
    params = {
        'address': geocode,
        'region': 'CA',
        'language': 'en',
        'key': GM_API_KEY
    }
    return json.loads(requests.get(GM_GEOCODE_URL, params=params).content)

def get_coordinates(geocode):
    info = get_by_geocode(geocode)
    res = {
        'status': info['status']
    }
    if (info['status'] != 'OK'):
        return res
    res['lat'] = info['results'][0]['geometry']['location']['lat']
    res['lng'] = info['results'][0]['geometry']['location']['lng']
    return res

def get_distance_km(geocode1, geocode2):
    coor1 = get_coordinates(geocode1)
    print(coor1)
    if (coor1['status'] != 'OK'):
        return -1
    coor2 = get_coordinates(geocode2)
    print(coor2)
    if (coor2['status'] != 'OK'):
        return -1
    p1 = (coor1['lat'], coor1['lng'])
    p2 = (coor2['lat'], coor2['lng'])
    return geopy.distance.geodesic(p1, p2).km

def get_distance_km_by_coordinates(p1, p2):
    return geopy.distance.geodesic(p1, p2).km