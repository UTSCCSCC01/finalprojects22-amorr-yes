from django.urls import path

from . import views

urlpatterns = [
    path('signup/', views.signup_view),
    path('logout/', views.logout_view),
    path('user_info/', views.user_info_view),
]
