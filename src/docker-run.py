import os
os.system("python3 /amorr/backend/manage.py makemigrations")
os.system("python3 /amorr/backend/manage.py migrate")
os.system("python3 /amorr/backend/manage.py runserver 0.0.0.0:8000")
