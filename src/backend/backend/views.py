from django.shortcuts import render
from django.http import JsonResponse

def index(request):
    request.session['login'] = False
    return render(request, 'index.html')
