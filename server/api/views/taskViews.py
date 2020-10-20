# This is a divided version of original view of originalViews.py file and in fbv.py you will find the
# fbv (function based views) implementation of this logic, here it is implemented in cbv (class based views)

from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import (
	NotFound,
	PermissionDenied
)
from rest_framework.generics import (
	CreateAPIView,
	DestroyAPIView,
	ListAPIView,
	UpdateAPIView
)

from ..serializers import TaskSerializer, TaskUpdateSerializer
from ..models import Work, Task

class TaskList(ListAPIView):
	serializer_class = TaskSerializer

	def get_queryset(self):
		user_id = self.request.user.id
		wpk = self.kwargs.get('wpk', None)

		is_authenticated = Work.objects.filter(collaborators = user_id, id = wpk)

		if not is_authenticated:
			raise PermissionDenied("You are not authorized to see the list")
		
		queryset = Task.objects.filter(work_name = wpk).order_by('id')

		if queryset:
			return queryset
		else:
			raise NotFound("No task added yet.")

class TaskCreate(CreateAPIView):
	serializer_class = TaskSerializer

	def create(self, request, *args, **kwargs):
		user_id = request.user.id
		wpk = self.kwargs.get('wpk', None)

		is_authenticated = Work.objects.filter(collaborators = user_id, id = wpk)

		if not is_authenticated:
			raise PermissionDenied("You are not authorized to create a task with this id")

		request.data._mutable = True
		request.data['work_name'] = wpk
		request.data['author'] = request.user.username
		request.data._mutable = False

		return super(TaskCreate, self).create(request, *args, **kwargs)
	
class TaskDelete(DestroyAPIView):
	def get_queryset(self):
		user_id = self.request.user.id
		wpk = self.kwargs.get('wpk', None)
		pk = self.kwargs.get('pk', None)

		is_authenticated = Work.objects.filter(collaborators = user_id, id = wpk)

		if not is_authenticated:
			raise PermissionDenied("You are not authorized to delete this item")

		queryset = Task.objects.filter(work_name = wpk, id = pk)

		if queryset:
			return queryset
		else:
			raise NotFound("Item not found")

class TaskUpdate(UpdateAPIView):
	serializer_class = TaskUpdateSerializer

	def get_queryset(self):
		user_id = self.request.user.id
		wpk = self.kwargs.get('wpk', None)
		pk = self.kwargs.get('pk', None)

		is_authenticated = Work.objects.filter(collaborators = user_id, id = wpk)

		if not is_authenticated:
			raise PermissionDenied("You are not authorized to update this item")

		queryset = Task.objects.filter(work_name = wpk, id = pk)

		if queryset:
			return queryset
		else:
			raise NotFound("Page not found")
	
	# To keep the Task instance author into the current loggedin user (both put and patch) (You shouldn't be able to update the author field from client side)
	def patch(self, request, *args, **kwargs):
		request.data._mutable = True
		request.data['author'] = request.user.username
		request.data._mutable = False

		return self.partial_update(request, *args, **kwargs)

	def put(self, request, *args, **kwargs):
		request.data._mutable = True
		request.data['author'] = request.user.username
		request.data._mutable = False

		return self.update(request, *args, **kwargs)

class TaskDetails(ListAPIView):
	serializer_class = TaskSerializer

	def get_queryset(self):
		user_id = self.request.user.id
		wpk = self.kwargs.get('wpk', None)
		pk = self.kwargs.get('pk', None)

		queryset = Task.objects.filter(work_name = wpk, id = pk)
		is_authenticated = Work.objects.filter(collaborators = user_id, id = wpk)

		if not is_authenticated:
			raise PermissionDenied("You are not authorized to see the details of this item")

		if queryset:
			return queryset
		else:
			raise NotFound("Page not found")
		