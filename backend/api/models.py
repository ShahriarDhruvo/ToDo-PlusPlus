from django.db import models
# from django.contrib.auth.models import User
from django.utils import timezone

class Work(models.Model):
    # author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    completed = models.BooleanField(default=False, blank=True, null=True)

    def __str__(self):
        return self.title

class Task(models.Model):
    title = models.CharField(max_length=200)
    deadline = models.DateTimeField(default=timezone.now)
    completed = models.BooleanField(default=False, blank=True, null=True)
    work_name = models.ForeignKey(Work, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
