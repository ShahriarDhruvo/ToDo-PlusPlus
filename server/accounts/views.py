from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from dj_rest_auth.registration.views import SocialLoginView, VerifyEmailView
from dj_rest_auth.social_serializers import TwitterLoginSerializer
from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework.generics import ListAPIView
from django.contrib.auth.models import User
from rest_framework.exceptions import (
	NotFound,
	PermissionDenied,
)
from api.models import Work

class TwitterLogin(SocialLoginView):
    serializer_class = TwitterLoginSerializer
    adapter_class = TwitterOAuthAdapter

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter

class CollaboratorProfile(ListAPIView):
    serializer_class = UserDetailsSerializer

    def get_queryset(self):
        user_id = self.request.user.id

        pk = self.kwargs.get('pk', None)
        uid = self.kwargs.get('uid', None)

        is_allowed = Work.objects.filter(collaborators = user_id, id = pk) and Work.objects.filter(collaborators = uid, id = pk)

        if not is_allowed:
            raise PermissionDenied("You are not allowed to see the details.")

        queryset = User.objects.filter(pk = uid)

        if queryset:
            return queryset
        else:
            raise NotFound("Page not found")
