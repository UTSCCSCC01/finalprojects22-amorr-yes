from django.urls import path

from . import views

urlpatterns = [
    path('signup/', views.signup_view),
    path('user_info/', views.user_info_view),
    path('user_info_set/', views.user_info_set_view),
]
