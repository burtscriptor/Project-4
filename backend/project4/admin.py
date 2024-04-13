from django.contrib import admin
from .models import Todo

class TodoAdmin(admin.ModelAdmin):
    list_display = ('climb', 'grade', 'description', 'completed')

admin.site.register(Todo)
