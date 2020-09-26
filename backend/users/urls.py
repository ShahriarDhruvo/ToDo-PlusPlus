from django.urls import include, path

from .views import UserListView, UserProfile

urlpatterns = [
    path('', UserListView.as_view(), name="users-list"),
    path('profile/<str:pk>/<str:uid>', UserProfile.as_view(), name="users-profile"),
]