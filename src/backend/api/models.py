from django.db import models

class User(models.Model):
    first_name = models.CharField(max_length=60, default='')
    last_name = models.CharField(max_length=60, default='')
    email = models.CharField(max_length=100, default='')
    password = models.CharField(max_length=255, default='')
