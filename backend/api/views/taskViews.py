# This is a divided version of original view of originalViews.py file and in fbv.py you will find the
# fbv (function based views) implementation of this logic, here it is implemented in cbv (class based views)

from rest_framework.exceptions import NotFound, NotAcceptable
from rest_framework.generics import (
	CreateAPIView,
	DestroyAPIView,
	ListAPIView,
	UpdateAPIView
)

from ..serializers import WorkSerializer, TaskSerializer
from ..models import Work, Task


class TaskList(ListAPIView):
	serializer_class = TaskSerializer

	def get_queryset(self):		
		wpk = self.kwargs.get('wpk', None)

		queryset = Task.objects.filter(work_name = wpk).order_by('-id')

		if Work.objects.filter(id = wpk).exists() or queryset:
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