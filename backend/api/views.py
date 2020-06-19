from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import WorkSerializer, TaskSerializer
from .models import Work, Task

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
		'Work List':'work-list/',
		'Work Create':'work-create/',
		'Work Update':'work-update/<str:pk>/',
		'Work Delete':'work-delete/<str:pk>/',
		'Work Detail View':'work-detail/<str:pk>/',

		'Task List':'work-title/task-list/',
		'Task Create':'work-title/task-create/',
		'Task Update':'work-title/task-update/<str:pk>/',
		'Task Delete':'work-title/task-delete/<str:pk>/',
		'Task Detail View':'task-detail/<str:pk>/'
	}
    return Response(api_urls)

# Views for works
# This is the list of all works
@api_view(['GET'])
def workList(request):
	tasks = Work.objects.all().order_by('-id')
	serializer = WorkSerializer(tasks, many=True)

	return Response(serializer.data)

# This is the list of all tasks of a certain work
@api_view(['GET'])
def workDetail(request, pk):
	tasks = Work.objects.get(id = pk)
	serializer = WorkSerializer(tasks, many=False)

	return Response(serializer.data)

@api_view(['POST'])
def workCreate(request):
	serializer = WorkSerializer(data = request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

@api_view(['POST'])
def workUpdate(request, pk):
	tasks = Work.objects.get(id = pk)
	serializer = WorkSerializer(instance = tasks, data = request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

@api_view(['DELETE'])
def workDelete(request, pk):
	tasks = Work.objects.get(id = pk)
	tasks.delete()

	return Response("Item succesfully deleted!")


# Views for tasks
@api_view(['GET'])
def taskList(request, wpk):
	# tasks = Task.objects.all().order_by('-id')
	tasks = Task.objects.filter(work_name = wpk).order_by('-id')
	serializer = TaskSerializer(tasks, many=True)

	return Response(serializer.data)

@api_view(['GET'])
def taskDetail(request, wpk, pk):
	tasks = Task.objects.filter(work_name = wpk).get(id = pk)
	serializer = TaskSerializer(tasks, many=False)

	return Response(serializer.data)
	
# Want to make sure that it is done exactly how it meant to be
@api_view(['POST'])
def taskCreate(request, wpk):
	request.data['work_name'] = wpk
	serializer = TaskSerializer(data = request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

# Want to make sure that it is done exactly how it meant to be
@api_view(['POST'])
def taskUpdate(request, wpk, pk):
	request.data['work_name'] = wpk
	tasks = Task.objects.filter(work_name = wpk).get(id = pk)
	serializer = TaskSerializer(instance = tasks, data = request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

@api_view(['DELETE'])
def taskDelete(request, wpk, pk):
	tasks = Task.objects.filter(work_name = wpk).get(id = pk)
	tasks.delete()

	return Response("Item succesfully deleted!")