from django.db import models
from django.utils import timezone
from users.models import CustomUser

class Work(models.Model):
    owner = models.ForeignKey(CustomUser, default=1, related_name='owner', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    completed = models.BooleanField(default=False, blank=True, null=True)
    colaborators = models.ManyToManyField(CustomUser, default=1, related_name='colaborators')

    def __str__(self):
        return self.title

class Task(models.Model):
    title = models.CharField(max_length=200)
    deadline = models.DateTimeField(default=timezone.now)
    completed = models.BooleanField(default=False, blank=True, null=True)
    work_name = models.ForeignKey(Work, default=1, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
