# THIS FILE IS NOT A PART OF THIS PROJECT IT IS HERE TO SERVE AS AN EXAMPLE
# THIS FILE IS NOT A PART OF THIS PROJECT IT IS HERE TO SERVE AS AN EXAMPLE
# THIS FILE IS NOT A PART OF THIS PROJECT IT IS HERE TO SERVE AS AN EXAMPLE
# THIS FILE IS NOT A PART OF THIS PROJECT IT IS HERE TO SERVE AS AN EXAMPLE
# THIS FILE IS NOT A PART OF THIS PROJECT IT IS HERE TO SERVE AS AN EXAMPLE


# This doen't have user handleing or any kind of authentication feature


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import NotFound

from ..serializers import WorkSerializer, TaskSerializer
from ..models import Work, Task


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
		'Work List':'work-list/',
		'Work Create':'work-create/',
		'Work Update':'work-update/<str:pk>/',
		'Work Delete':'work-delete/<str:pk>/',
		'Work Detail':'work-details/<str:pk>/',

		'Task List':'<str:wpk>/task-list/',
		'Task Create':'<str:wpk>/task-create/',
		'Task Update':'w<str:wpk>task-update/<str:pk>/',
		'Task Delete':'<str:wpk>/task-delete/<str:pk>/',
		'Task Detail':'<str:wpk>/task-details/<str:pk>'
	}
    return Response(api_urls)

# Views for Work model
@api_view(['GET'])
def workList(request):
	try:
		works = Work.objects.all().order_by('-id')
	except Work.DoesNotExist:
		raise NotFound("Page not found")

	serializer = WorkSerializer(works, many=True)

	return Response(serializer.data)

@api_view(['GET'])
def workDetail(request, pk):
	try:
		works = Work.objects.get(id = pk)
	except Work.DoesNotExist:
		raise NotFound("Page not found")

	serializer = WorkSerializer(works, many=False)

	return Response(serializer.data)

@api_view(['POST'])
def workCreate(request):
	serializer = WorkSerializer(data = request.data)

	if serializer.is_valid():
		serializer.save()
	else:
		raise NotFound(serializer.errors)

	return Response(serializer.data)

@api_view(['POST'])
def workUpdate(request, pk):
	try:
		works = Work.objects.get(id = pk)
	except Work.DoesNotExist:
		raise NotFound("Page not found")

	serializer = WorkSerializer(instance = works, data = request.data)

	if serializer.is_valid():
		serializer.save()
	else:
		raise NotFound(serializer.errors)

	return Response(serializer.data)

@api_view(['DELETE'])
def workDelete(request, pk):
	try:
		works = Work.objects.get(id = pk)
	except Work.DoesNotExist:
		raise NotFound("Page not found")

	works.delete()

	return Response("Item deleted succesfully.")



# Views for Task model
@api_view(['GET'])
def taskList(request, wpk):
	try:
		tasks = Task.objects.filter(work_name = wpk).order_by('-id')
	except Task.DoesNotExist:
		raise NotFound("Page not found")

	serializer = TaskSerializer(tasks, many=True)

	return Response(serializer.data)

@api_view(['GET'])
def taskDetail(request, wpk, pk):
	try:
		tasks = Task.objects.filter(work_name = wpk).get(id = pk)
	except Task.DoesNotExist:
		raise NotFound("Page not found")

	serializer = TaskSerializer(tasks, many=False)

	return Response(serializer.data)
	
@api_view(['POST'])
def taskCreate(request, wpk):
	request.data['work_name'] = wpk
	
	try:
		serializer = TaskSerializer(data = request.data)
	except Task.DoesNotExist:
		raise NotFound("Page not found")

	if serializer.is_valid():
		serializer.save()
	else:
		raise NotFound(serializer.errors)

	return Response(serializer.data)

@api_view(['POST'])
def taskUpdate(request, wpk, pk):
	request.data['work_name'] = wpk

	try:
		tasks = Task.objects.filter(work_name = wpk).get(id = pk)
	except Task.DoesNotExist:
		raise NotFound("Page not found")

	serializer = TaskSerializer(instance = tasks, data = request.data)

	if serializer.is_valid():
		serializer.save()
	else:
		raise NotFound(serializer.errors)

	return Response(serializer.data)

@api_view(['DELETE'])
def taskDelete(request, wpk, pk):
	try:
		tasks = Task.objects.filter(work_name = wpk).get(id = pk)
	except Task.DoesNotExist:
		raise NotFound("Page not found")

	tasks.delete()

	return Response("Item deleted succesfully.")