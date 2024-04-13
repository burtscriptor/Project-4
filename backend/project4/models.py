from django.db import models

# Create your models here.
class Todo(models.Model):
    climb = models.CharField(max_length=120, blank=True)
    description = models.CharField(max_length=500)
    completed = models.BooleanField(default=False)
    grade = models.IntegerField(default=16,blank=True)
    
    def __str__(self):
        return self.climb
