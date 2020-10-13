# Serializers are nothing but a way to convert any python model into json data
# It means to convert the python model into json format by using serializer so that 
# we can pass that around to use in api

from rest_framework import serializers

from .models import Work, Task

# All WORK serializers
class WorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Work
        fields = '__all__'

class WorkUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Work
        fields = '__all__'
        read_only_fields = ['owner', 'collaborators']

class WorkUpdateCollaboratorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Work
        fields = '__all__'
        read_only_fields = ['owner', 'title', 'completed']

# All TASK serializers
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields  = '__all__'

class TaskUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields  = '__all__'
        read_only_fields = ['work_name']
        