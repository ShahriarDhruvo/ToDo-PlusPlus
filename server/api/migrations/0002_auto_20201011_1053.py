# Generated by Django 3.1.2 on 2020-10-11 10:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='author',
            field=models.CharField(default='Anonymous', max_length=100),
        ),
        migrations.AlterField(
            model_name='task',
            name='deadline',
            field=models.DateTimeField(default='2020-10-11 10:53'),
        ),
    ]