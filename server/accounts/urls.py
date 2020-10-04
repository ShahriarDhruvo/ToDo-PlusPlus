from django.contrib import admin
from django.urls import path, include
from .views import (
    FacebookLogin,
    TwitterLogin,
    VerifyEmailView,
    CollaboratorProfile
)

urlpatterns = [
    path('', include('dj_rest_auth.urls')),

    path('collaborator/profile/<str:pk>/<str:uid>', CollaboratorProfile.as_view(), name="collaborator's-profile"),

    path('registration/', include('dj_rest_auth.registration.urls')),
    path('account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),

    path('facebook/', FacebookLogin.as_view(), name='fb_login'),
    path('twitter/', TwitterLogin.as_view(), name='twitter_login'),
]
