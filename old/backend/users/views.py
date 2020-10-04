from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAdminUser
from rest_framework.exceptions import (
	NotFound,
	PermissionDenied,
)

from .models import CustomUser
from .serializers import UserSerializer
from api.models import Work

class UserListView(ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

class UserProfile(ListAPIView):
	serializer_class = UserSerializer
	
	def get_queryset(self):
		token = self.request.headers['Authorization'].replace('TOKEN ', '')
		user = CustomUser.objects.filter(auth_token = token).values('id')
		user_id = user.first()['id']
		pk = self.kwargs.get('pk', None)
		uid = self.kwargs.get('uid', None)

		is_allowed = Work.objects.filter(colaborators = user_id, id = pk) and Work.objects.filter(colaborators = uid, id = pk)
		
		if not is_allowed:
			raise PermissionDenied("You are not allowed to see the details.")

		queryset = CustomUser.objects.filter(pk = uid)

		if queryset:
			return queryset
		else:
			raise NotFound("Page not found")