# Generated by Django 5.0.4 on 2024-04-13 01:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todo',
            name='title',
        ),
        migrations.AddField(
            model_name='todo',
            name='climb',
            field=models.CharField(blank=True, max_length=120),
        ),
        migrations.AddField(
            model_name='todo',
            name='grade',
            field=models.IntegerField(blank=True, default=16),
        ),
    ]
