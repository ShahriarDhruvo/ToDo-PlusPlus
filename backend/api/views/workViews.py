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