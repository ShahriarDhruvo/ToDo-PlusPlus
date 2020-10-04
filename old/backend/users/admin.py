from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['username', 'pk', 'email', 'is_staff', 'is_superuser']

admin.site.register(CustomUser, CustomUserAdmin)