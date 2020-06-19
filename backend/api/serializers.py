# Serializers are nothing but a way to convert any python model into json data
# It means to convert the python model into json format by using serializer so that 
# we can pass that around to use in api

from rest_framework import serializers

from .models import Work, Task

class WorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Work
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    # work = WorkSerializer(many=True, read_only=True)
    class Meta:
        model = Task
        fields  = '__all__'