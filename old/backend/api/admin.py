from django.contrib import admin
from .models import Work, Task

class WorkAdmin(admin.ModelAdmin):
    model = Work
    list_display = ['pk', 'owner', 'title', 'completed']

class TaskAdmin(admin.ModelAdmin):
    model = Task
    list_display = ['pk', 'work_name', 'title', 'deadline', 'completed']

admin.site.register(Work, WorkAdmin)
admin.site.register(Task, TaskAdmin)