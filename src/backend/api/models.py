from django.db import models

class User(models.Model):
    first_name = models.CharField(max_length=60, default='')
    last_name = models.CharField(max_length=60, default='')
    email = models.CharField(max_length=100, default='')
    password = models.CharField(max_length=255, default='')
    phone = models.CharField(max_length=100, default='')
    about = models.TextField(default='')
    photoid = models.CharField(max_length=200, default='')
