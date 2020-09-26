# This is a divided version of original view of originalViews.py file and in fbv.py you will find the
# fbv (function based views) implementation of this logic, here it is implemented in cbv (class based views)

from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import (
	NotFound,
	NotAcceptable,
	PermissionDenied
)
from rest_framework.generics import (
	CreateAPIView,
	DestroyAPIView,
	ListAPIView,
	UpdateAPIView
)

from ..serializers import WorkSerializer, TaskSerializer
from ..models import Work, Task
from users.models import CustomUser

class TaskList(ListAPIView):
	serializer_class = TaskSerializer

	def get_queryset(self):
		token = self.request.headers['Authorization'].replace('TOKEN ', '')
		user = CustomUser.objects.filter(auth_token = token).values('id')
		user_id = user.first()['id']
		wpk = self.kwargs.get('wpk', None)

		is_authenticated = Work.objects.filter(colaborators = user_id, id = wpk)

		if not is_authenticated:
			raise PermissionDenied("You are not authorized to see the list")
		
		queryset = Task.objects.filter(work_name = wpk).order_by('-id')

		if queryset:
			return queryset
		else:
			raise NotFound("No task added yet.")

class TaskCreate(CreateAPIView):
	serializer_class = TaskSerializer

	def create(self, request, *args, **kwargs):
		token = self.request.headers['Authorization'].replace('TOKEN ', '')
		user = CustomUser.objects.filter(auth_token = token).values('id')
		user_id = user.first()['id']
		wpk = self.kwargs.get('wpk', None)

		is_authenticated = Work.objects.filter(colaborators = user_id, id = wpk)

		if not is_authenticated:
			raise PermissionDenied("You are not authorized to create a task with this id")

		request.data._mutable = True
		request.data['work_name'] = wpk
		request.data._mutable = False

		return super(TaskCreate, self).create(request, *args, **kwargs)
	
class TaskDelete(DestroyAPIView):
	def get_queryset(self):
		token = self.request.headers['Authorization'].replace('TOKEN ', '')
		user = CustomUser.objects.filter(auth_token = token).values('id')
		user_id = user.first()['id']
		wpk = self.kwargs.get('wpk', None)
		pk = self.kwargs.get('pk', None)

		is_authenticated = Work.objects.filter(colaborators = user_id, id = wpk)

		if not is_authenticated:
			raise PermissionDenied("You are not authorized to delete this item")

		queryset = Task.objects.filter(work_name = wpk, id = pk)

		if queryset:
			return queryset
		else:
			raise NotFound("Item not found")

class TaskUpdate(UpdateAPIView):
	serializer_class = TaskSerializer

	def get_queryset(self):
		token = self.request.headers['Authorization'].replace('TOKEN ', '')
		user = CustomUser.objects.filter(auth_token = token).values('id')
		user_id = user.first()['id']
		wpk = self.kwargs.get('wpk', None)
		pk = self.kwargs.get('pk', None)

		is_authenticated = Work.objects.filter(colaborators = user_id, id = wpk)

		if not is_authenticated:
			raise PermissionDenied("You are not authorized to update this item")

		queryset = Task.objects.filter(work_name = wpk, id = pk)

		if queryset:
			return queryset
		else:
			raise NotFound("Page not found")
	
	# To keep the Task instance into the current Work instance (You shouldn't be able to update the work_name field)
	def patch(self, request, *args, **kwargs):
		wpk = self.kwargs.get('wpk', None)
		request.data._mutable = True
		request.data['work_name'] = wpk
		request.data._mutable = False

		return self.partial_update(request, *args, **kwargs)

class TaskDetails(ListAPIView):
	serializer_class = TaskSerializer

	def get_queryset(self):
		token = self.request.headers['Authorization'].replace('TOKEN ', '')
		user = CustomUser.objects.filter(auth_token = token).values('id')
		user_id = user.first()['id']
		wpk = self.kwargs.get('wpk', None)
		pk = self.kwargs.get('pk', None)

		queryset = Task.objects.filter(work_name = wpk, id = pk)
		is_authenticated = Work.objects.filter(colaborators = user_id, id = wpk)

		if not is_authenticated:
			raise PermissionDenied("You are not authorized to see the details of this item")

		if queryset:
			return queryset
		else:
			raise NotFound("Page not found")
		