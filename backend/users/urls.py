from django.urls import include, path

from .views import UserListView

urlpatterns = [
    path('', UserListView.as_view(), name="users-list"),
]