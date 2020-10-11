from django.db import models
from datetime import datetime
from django.utils import timezone
from django.contrib.auth.models import User

formatted_date = datetime.strftime(timezone.now(), '%Y-%m-%d %H:%M')

class Work(models.Model):
    title = models.CharField(max_length=100)
    completed = models.BooleanField(default=False, blank=True, null=True)
    collaborators = models.ManyToManyField(User, default=1, related_name='collaborators')
    owner = models.ForeignKey(User, default=1, related_name='owner', on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Task(models.Model):
    title = models.CharField(max_length=400)
    haveDeadline = models.BooleanField(default=False)
    deadline = models.DateTimeField(default=formatted_date)
    author = models.CharField(max_length=100, default="Anonymous")
    completed = models.BooleanField(default=False, blank=True, null=True)
    work_name = models.ForeignKey(Work, default=1, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
