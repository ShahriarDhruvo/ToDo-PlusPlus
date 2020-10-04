# This is a divided version of original view of originalViews.py file and in fbv.py you will find the
# fbv (function based views) implementation of this logic, here it is implemented in cbv (class based views)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import (
	NotFound,
	APIException,
	PermissionDenied,
)
from rest_framework.generics import (
	CreateAPIView,
	DestroyAPIView,
	ListAPIView,
	UpdateAPIView
)

from ..serializers import WorkSerializer, TaskSerializer
from ..models import Work, Task
from django.contrib.auth.models import User
from dj_rest_auth.serializers import UserDetailsSerializer

class Conflict(APIException):
    status_code = 409
    default_detail = 'Item already exist.'
    default_code = 'conflit'

class WorkList(ListAPIView):
	serializer_class = WorkSerializer

	def get_queryset(self):
		user_id = self.request.user.id

		queryset = Work.objects.filter(collaborators = user_id).order_by('-id')

		if queryset:
			return queryset
		else:
			raise NotFound("This list is empty")

class WorkCreate(CreateAPIView):
	serializer_class = WorkSerializer

	def create(self, request, *args, **kwargs):
		user_id = request.user.id

		request.data._mutable = True
		request.data['owner'] = user_id
		request.data['collaborators'] = user_id
		request.data._mutable = False

		return super(WorkCreate, self).create(request, *args, **kwargs)

class WorkDelete(DestroyAPIView):
	def get_queryset(self):
		user_id = self.request.user.id
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
		user_id = self.request.user.id
		pk = self.kwargs.get('pk', None)

		queryset = Work.objects.filter(collaborators = user_id, id = pk)

		if queryset:
			return queryset
		else:
			raise NotFound("Page not found")	

class WorkDetails(ListAPIView):
	serializer_class = WorkSerializer

	def get_queryset(self):
		user_id = self.request.user.id
		pk = self.kwargs.get('pk', None)

		queryset = Work.objects.filter(collaborators = user_id, id = pk)

		if queryset:
			return queryset
		else:
			raise NotFound("Page not found")

class WorkAddCollaborators(UpdateAPIView):
	serializer_class = WorkSerializer

	def get_queryset(self):
		user_id = self.request.user.id
		pk = self.kwargs.get('pk', None)

		queryset = Work.objects.filter(id = pk)
		is_owner = Work.objects.filter(owner = user_id, id = pk)

		if not is_owner:
			raise PermissionDenied("Only owner of this work can add others as a collaborator")

		if queryset:
			return queryset
		else:
			raise NotFound("Page not found")

	def patch(self, request, *args, **kwargs):
		pk = self.kwargs.get('pk', None)
		collaborator = self.kwargs.get('collaborator', None)

		try:
			new_collaborator_id = User.objects.filter(username = collaborator).values('id').first()['id']
		except:
			raise NotFound("This username doesn't exist.")

		prev_collaborators_id = list(Work.objects.filter(id = pk).values('collaborators'))
		collaborators = []

		for i in range(len(prev_collaborators_id)):
			if new_collaborator_id == prev_collaborators_id[i]['collaborators']:
				raise Conflict("This user is already a collaborator of this work")

			collaborators.append(prev_collaborators_id[i]['collaborators'])
		
		collaborators.append(new_collaborator_id)

		request.data['collaborators'] = collaborators

		return self.partial_update(request, *args, **kwargs)

class WorkRemoveCollaborators(UpdateAPIView):
	serializer_class = WorkSerializer

	def get_queryset(self):
		user_id = self.request.user.id
		pk = self.kwargs.get('pk', None)

		queryset = Work.objects.filter(collaborators = user_id, id = pk)

		if queryset:
			return queryset
		else:
			raise NotFound("Page not found")

	def patch(self, request, *args, **kwargs):
		pk = self.kwargs.get('pk', None)
		collaborator = self.kwargs.get('collaborator', None)
		new_collaborator_id = User.objects.filter(username = collaborator).values('id').first()['id']

		is_owner = Work.objects.filter(owner = new_collaborator_id, id = pk)

		if not new_collaborator_id:
			raise NotFound("This username doesn't exist.")

		if is_owner:
			raise PermissionDenied("You cannot remove the owner from the collaborators list")

		prev_collaborators_id = list(Work.objects.filter(id = pk).values('collaborators'))
		collaborators = []
		collaborator_existance = False

		for i in range(len(prev_collaborators_id)):
			if new_collaborator_id == prev_collaborators_id[i]['collaborators']:
				collaborator_existance = True
				continue

			collaborators.append(prev_collaborators_id[i]['collaborators'])
		
		if not collaborator_existance:
			raise NotFound("This user is not a coloborator to begin with")
		
		request.data['collaborators'] = collaborators

		return self.partial_update(request, *args, **kwargs)

class WorkListCollaboratorsDetails(ListAPIView):
	serializer_class = UserDetailsSerializer
	
	def get_queryset(self):
		user_id = self.request.user.id
		pk = self.kwargs.get('pk', None)

		is_allowed = Work.objects.filter(collaborators = user_id, id = pk)
		
		if not is_allowed:
			raise PermissionDenied("You are not allowed to see the details.")

		queryset = Work.objects.filter(id = pk).first().collaborators.all()

		if queryset:
			return queryset
		else:
			raise NotFound("Page not found")
