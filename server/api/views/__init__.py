# This is a divided version of original view of originalViews.py file and in fbv.py you will find the
# fbv (function based views) implementation of this logic, here it is implemented in cbv (class based views)

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from .workViews import (
    WorkList,
    WorkCreate,
    WorkDelete,
    WorkUpdate,
    WorkDetails,
    WorkAddCollaborators,
    WorkRemoveCollaborators,
    WorkListCollaboratorsDetails
)

from .taskViews import (
    TaskList,
    TaskCreate,
    TaskDelete,
    TaskUpdate,
    TaskDetails
)


@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def apiOverview(request):
    api_urls = {
        'API Overview'                      : 'api/v1/',

        'User Login'                        : 'api/v1/accounts/login/',
        'User Logout'                       : 'api/v1/accounts/logout/',
        'User Details'                      : 'api/v1/accounts/user',
        'User Token Verify'                 : 'api/v1/accounts/token/verify/',
        'User Token Refresh'                : 'api/v1/accounts/token/refresh/',
        'User Registration'                 : 'api/v1/accounts/registration/',
        'User Password Reset'               : 'api/v1/accounts/password/reset/',
        'User Password Change'              : 'api/v1/accounts/password/change/',
        'User Social Login Twitter'         : 'api/v1/accounts/twitter',
        'User Social Login Facebook'        : 'api/v1/accounts/facebook',
        'User Account Confirm Email'        : 'api/v1/accounts/account-confirm-email/',
        'User Password Reset Confirm'       : 'api/v1/accounts/password/reset/confirm/',

		'Work List'                         : 'api/v1/work/list/',
		'Work Create'                       : 'api/v1/work/create/',
		'Work Update'                       : 'api/v1/work/update/<str:pk>/',
		'Work Delete'                       : 'api/v1/work/delete/<str:pk>/',
		'Work Details'                      : 'api/v1/work/details/<str:pk>/',
        'Work Add Collaborator'             : 'api/v1/work/add/collaborator/<str:pk>/<str:collaborator>/',
        'Work Remove Collaborator'          : 'api/v1/work/remove/collaborator/<str:pk>/<str:collaborator>/',
        'Work Collaborator Profile'         : 'api/v1/accounts/collaborator/profile/<str:pk>/<str:uid>',
        'Work List Collaborator Details'    : 'api/v1/work/list/collaborator/details/<str:pk>/',

		'Task List'                         : 'api/v1/<str:wpk>/task/list/',
		'Task Create'                       : 'api/v1/<str:wpk>/task/create/',
		'Task Update'                       : 'api/v1/<str:wpk>/task/update/<str:pk>/',
		'Task Delete'                       : 'api/v1/<str:wpk>/task/delete/<str:pk>/',
		'Task Details'                      : 'api/v1/<str:wpk>/task/details/<str:pk>/',
	}

    return Response(api_urls)