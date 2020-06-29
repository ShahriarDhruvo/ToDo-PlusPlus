# This is a divided version of original view of originalViews.py file and in fbv.py you will find the
# fbv (function based views) implementation of this logic, here it is implemented in cbv (class based views)

from rest_framework.decorators import api_view
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

class WorkList(ListAPIView):
	serializer_class = WorkSerializer

	def get_queryset(self):		
		token = self.request.headers['Authorization'].replace('TOKEN ', '')
		user = CustomUser.objects.filter(auth_token = token).values('id')
		user_id = user.first()['id']

		queryset = Work.objects.filter(colaborators = user_id).order_by('-id')

		if queryset:
			return queryset
		else:
			raise NotFound("This list is empty")

class WorkCreate(CreateAPIView):
	serializer_class = WorkSerializer

	def create(self, request, *args, **kwargs):
		token = request.headers['Authorization'].replace('TOKEN ', '')
		user = CustomUser.objects.filter(auth_token = token).values('id')
		user_id = user.first()['id']

		request.data._mutable = True
		request.data['owner'] = user_id
		request.data['colaborators'] = user_id
		request.data._mutable = False

		return super(WorkCreate, self).create(request, *args, **kwargs)

class WorkDelete(DestroyAPIView):
	def get_queryset(self):
		token = self.request.headers['Authorization'].replace('TOKEN ', '')
		user = CustomUser.objects.filter(auth_token = token).values('id')
		user_id = user.first()['id']
		pk = self.kwargs.get('pk', None)

		queryset = Work.objects.filter(id = pk)
		is_owner = Work.objects.filter(owner = user_id, id = pk)

		if not is_owner:
			raise PermissionDenied("Only owner of this work is authorized for deletion")

		if queryset:
			return queryset
		else:
			raise NotFound("Page not found")

class WorkUpdate(UpdateAPIView):
	serializer_class = WorkSerializer

	def get_queryset(self):
		token = self.request.headers['Authorization'].replace('TOKEN ', '')
		user = CustomUser.objects.filter(auth_token = token).values('id')
		user_id = user.first()['id']
		pk = self.kwargs.get('pk', None)

		queryset = Work.objects.filter(colaborators = user_id, id = pk)

		if queryset:
			return queryset
		else:
			raise NotFound("Page not found")	

class WorkDetails(ListAPIView):
	serializer_class = WorkSerializer

	def get_queryset(self):
		token = self.request.headers['Authorization'].replace('TOKEN ', '')
		user = CustomUser.objects.filter(auth_token = token).values('id')
		user_id = user.first()['id']
		pk = self.kwargs.get('pk', None)

		queryset = Work.objects.filter(colaborators = user_id, id = pk)

		if queryset:
			return queryset
		else:
			raise NotFound("Page not found")

class WorkAddColaborators(UpdateAPIView):
	serializer_class = WorkSerializer

	def get_queryset(self):
		token = self.request.headers['Authorization'].replace('TOKEN ', '')
		user = CustomUser.objects.filter(auth_token = token).values('id')
		user_id = user.first()['id']
		pk = self.kwargs.get('pk', None)

		queryset = Work.objects.filter(id = pk)
		is_owner = Work.objects.filter(owner = user_id, id = pk)

		if not is_owner:
			raise PermissionDenied("Only owner of this work can add others as a colaborator")

		if queryset:
			return queryset
		else:
			raise NotFound("Page not found")

	def patch(self, request, *args, **kwargs):
		pk = self.kwargs.get('pk', None)
		colaborator = self.kwargs.get('colaborator', None)
		new_colaborator_id = CustomUser.objects.filter(username = colaborator).values('id').first()['id']

		if not new_colaborator_id:
			raise NotFound("This username doesn't exist.")

		prev_colaborators_id = list(Work.objects.filter(id = pk).values('colaborators'))
		colaborators = []

		for i in range(len(prev_colaborators_id)):
			if new_colaborator_id == prev_colaborators_id[i]['colaborators']:
				return Response("This user is already a colaborator of this work")

			colaborators.append(prev_colaborators_id[i]['colaborators'])
		
		colaborators.append(new_colaborator_id)

		request.data['colaborators'] = colaborators

		return self.partial_update(request, *args, **kwargs)

class WorkRemoveColaborators(UpdateAPIView):
	serializer_class = WorkSerializer

	def get_queryset(self):
		token = self.request.headers['Authorization'].replace('TOKEN ', '')
		user = CustomUser.objects.filter(auth_token = token).values('id')
		user_id = user.first()['id']
		pk = self.kwargs.get('pk', None)

		queryset = Work.objects.filter(colaborators = user_id, id = pk)

		if queryset:
			return queryset
		else:
			raise NotFound("Page not found")

	def patch(self, request, *args, **kwargs):
		pk = self.kwargs.get('pk', None)
		colaborator = self.kwargs.get('colaborator', None)
		new_colaborator_id = CustomUser.objects.filter(username = colaborator).values('id').first()['id']

		is_owner = Work.objects.filter(owner = new_colaborator_id, id = pk)

		if not new_colaborator_id:
			raise NotFound("This username doesn't exist.")

		if is_owner:
			raise PermissionDenied("You cannot remove the owner from the colaborators list")

		prev_colaborators_id = list(Work.objects.filter(id = pk).values('colaborators'))
		colaborators = []
		colaborator_existance = False

		for i in range(len(prev_colaborators_id)):
			if new_colaborator_id == prev_colaborators_id[i]['colaborators']:
				colaborator_existance = True
				continue

			colaborators.append(prev_colaborators_id[i]['colaborators'])
		
		if not colaborator_existance:
			raise NotFound("This user is not a coloborator to begin with")
		
		request.data['colaborators'] = colaborators

		return self.partial_update(request, *args, **kwargs)