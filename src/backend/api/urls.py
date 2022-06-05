from django.urls import path

from . import views

urlpatterns = [
    path('login/', views.login_view),
    path('signup/', views.signup_view),
    path('user_info/', views.user_info_view),
]
