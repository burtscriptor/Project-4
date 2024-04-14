from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Todo(models.Model):
    climb = models.CharField(max_length=120, blank=True)
    description = models.CharField(max_length=500)
    completed = models.BooleanField(default=False)
    grade = models.IntegerField(default=16,blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.climb} - {self.user.username}"


