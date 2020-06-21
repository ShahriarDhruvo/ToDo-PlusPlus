# THIS FILE IS NOT A PART OF THIS PROJECT IT IS HERE TO SERVE AS AN EXAMPLE
# THIS FILE IS NOT A PART OF THIS PROJECT IT IS HERE TO SERVE AS AN EXAMPLE
# THIS FILE IS NOT A PART OF THIS PROJECT IT IS HERE TO SERVE AS AN EXAMPLE
# THIS FILE IS NOT A PART OF THIS PROJECT IT IS HERE TO SERVE AS AN EXAMPLE
# THIS FILE IS NOT A PART OF THIS PROJECT IT IS HERE TO SERVE AS AN EXAMPLE


# This doen't have user handleing or any kind of authentication feature

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, NotAcceptable
from rest_framework.generics import (
	CreateAPIView,
	DestroyAPIView,
	ListAPIView,
	UpdateAPIView
)

from .serializers import WorkSerializer, TaskSerializer
from .models import Work, Task

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

Views for Work model
class WorkList(ListAPIView):
	queryset = Work.objects.all().order_by('-id')
	serializer_class = WorkSerializer

class WorkCreate(CreateAPIView):
	serializer_class = WorkSerializer

class WorkDelete(DestroyAPIView):
	def get_queryset(self):
		pk = self.kwargs.get('pk', None)

		queryset = Work.objects.filter(id = pk)

		if queryset:
			return queryset
		else:
			raise NotFound("Page not found")

class WorkUpdate(UpdateAPIView):
	serializer_class = WorkSerializer

	def get_queryset(self):
		pk = self.kwargs.get('pk', None)

		queryset = Work.objects.filter(id = pk)

		if queryset:
			return queryset
		else:
			raise NotFound("Page not found")
		

class WorkDetails(ListAPIView):
	serializer_class = WorkSerializer

	def get_queryset(self):
		pk = self.kwargs.get('pk', None)

		queryset = Work.objects.filter(id = pk)

		if queryset:
			return queryset
		else:
			raise NotFound("Page not found")


# Views for Task model
class TaskList(ListAPIView):
	serializer_class = TaskSerializer

	def get_queryset(self):		
		wpk = self.kwargs.get('wpk', None)

		queryset = Task.objects.filter(work_name = wpk).order_by('-id')

		if queryset:
			return queryset
		else:
			raise NotFound("Page not found")

class TaskCreate(CreateAPIView):
	serializer_class = TaskSerializer

	def create(self, request, *args, **kwargs):
		wpk = self.kwargs.get('wpk', None)
		request.data._mutable = True
		request.data['work_name'] = wpk
		request.data._mutable = False

		return super(TaskCreate, self).create(request, *args, **kwargs)

class TaskDelete(DestroyAPIView):
	def get_queryset(self):
		wpk = self.kwargs.get('wpk', None)
		pk = self.kwargs.get('pk', None)

		queryset = Task.objects.filter(work_name = wpk, id = pk)

		if queryset:
			return queryset
		else:
			raise NotFound("Page not found")

class TaskUpdate(UpdateAPIView):
	serializer_class = TaskSerializer

	def get_queryset(self):
		wpk = self.kwargs.get('wpk', None)
		pk = self.kwargs.get('pk', None)

		queryset = Task.objects.filter(work_name = wpk, id = pk)

		if queryset:
			return queryset
		else:
			raise NotFound("Page not found")

	def update(self, request, *args, **kwargs):
		wpk = self.kwargs.get('wpk', None)
		request.data._mutable = True
		request.data['work_name'] = wpk
		request.data._mutable = False

		return super(TaskUpdate, self).update(request, *args, **kwargs)

class TaskDetails(ListAPIView):
	serializer_class = TaskSerializer

	def get_queryset(self):
		wpk = self.kwargs.get('wpk', None)
		pk = self.kwargs.get('pk', None)

		queryset = Task.objects.filter(work_name = wpk, id = pk)

		if queryset:
			return queryset
		else:
			raise NotFound("Page not found")