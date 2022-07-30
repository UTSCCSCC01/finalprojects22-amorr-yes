from django.db import models

class User(models.Model):
    first_name = models.CharField(max_length=60, default='')
    last_name = models.CharField(max_length=60, default='')
    email = models.CharField(max_length=100, default='')
    password = models.CharField(max_length=255, default='')
    phone = models.CharField(max_length=100, default='')
    about = models.TextField(default='')
    categories = models.TextField(default='')
    photoid = models.CharField(max_length=200, default='')
    photoid_verified = models.BooleanField(default=True)
    certificate = models.CharField(max_length=200, default='')
    certificate_verified = models.BooleanField(default=True)
    user_type = models.CharField(max_length=200, default='')

class Post(models.Model):
    title = models.CharField(max_length=200, default='')
    text = models.TextField(default='')
    start_time = models.CharField(max_length=30, default='')
    end_time = models.CharField(max_length=30, default='')
    location = models.CharField(max_length=255, default='')
    postal_code = models.CharField(max_length=30, default='')
    author_id = models.PositiveIntegerField(default=0)
    price = models.PositiveIntegerField(default=0)
    daySelector = models.PositiveIntegerField(default=0)
    deleted = models.BooleanField(default=False)

class Order(models.Model):
    uid = models.PositiveIntegerField(default=0)
    pid = models.PositiveIntegerField(default=0)
    start_time = models.CharField(max_length=30, default='')
    duration = models.PositiveIntegerField(default=0)
    date = models.CharField(max_length=30, default='')
    status = models.CharField(max_length=30, default='')
    client_location = models.CharField(max_length=255, default='')
    client_postal_code = models.CharField(max_length=30, default='')
    is_paid = models.BooleanField(default=False)

class Option(models.Model):
    name = models.CharField(max_length=32)
    value = models.TextField()
