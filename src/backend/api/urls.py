from django.urls import path

from . import views

urlpatterns = [
    path('signup/', views.signup_view),
    path('logout/', views.logout_view),
    path('user_info/', views.user_info_view),
    path('user_info_by_uid/', views.user_info_by_uid_view),
    path('user_info_set/', views.user_info_set_view),
    path('upload_photoid/', views.upload_photoid_view),
    path('upload_certificate/', views.upload_certificate_view),
    path('login/', views.login_view),
    path('get_post_list/', views.get_post_list_view),
    path('get_post/', views.get_post_view),
    path('save_post/', views.save_post_view),
    path('get_user_post_list/', views.get_user_post_list_view),
    path('create_order/', views.create_order_view),
    path('get_order/', views.get_order_view),
    path('get_client_order/', views.get_client_order_view),
    path('get_provider_order/', views.get_provider_order_view),
    path('accept_order/', views.accept_order_view),
    path('delete_post/', views.delete_post_view),
    path('set_payment_link/', views.set_payment_link_view),
    path('get_payment_link/', views.get_payment_link_view),
    path('admin_login/', views.admin_login_view),
    path('admin_logout/', views.admin_logout_view),
    path('get_order_details/', views.get_order_details_view),
    path('verify_photoid/', views.verify_photoid_view),
    path('verify_certificate/', views.verify_certificate_view),
    path('get_unverified_photoid_list/', views.get_unverified_photoid_list_view),
    path('get_unverified_certificate_list/', views.get_unverified_certificate_list_view),
    path('get_unpaid_order_list/', views.get_unpaid_order_list_view),
    path('get_admin_status/', views.get_admin_status_view),
]
