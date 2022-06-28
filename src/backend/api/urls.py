from django.urls import path

from . import views

urlpatterns = [
    path('signup/', views.signup_view),
    path('logout/', views.logout_view),
    path('user_info/', views.user_info_view),
    path('user_info_set/', views.user_info_set_view),
    path('upload_photoid/', views.upload_photoid_view),
    path('upload_certificate/', views.upload_certificate_view),
    path('login/', views.login_view)
]
