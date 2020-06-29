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
    WorkAddColaborators,
    WorkRemoveColaborators
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
        'API Overview'           : 'api/v1/',

        'Users List'             : 'api/v1/users/',
        'User Login'             : 'api/v1/user/login/',
        'User Logout'            : 'api/v1/user/logout/',
        'User Registration'      : 'api/v1/user/registration/',
        'User Password Reset'    : 'api/v1/user/password/reset/',
        'User Password Change'   : 'api/v1/user/password/change/',

		'Work List'              : 'api/v1/work-list/',
		'Work Create'            : 'api/v1/work-create/',
		'Work Update'            : 'api/v1/work-update/<str:pk>/',
		'Work Delete'            : 'api/v1/work-delete/<str:pk>/',
		'Work Details'           : 'api/v1/work-details/<str:pk>/',
        'Work Add Colaborator'   : 'api/v1/work/add/colaborator/<str:pk>/<str:colaborator>/',
        'Work Remove Colaborator': 'api/v1/work/remove/colaborator/<str:pk>/<str:colaborator>/',

		'Task List'              : 'api/v1/<str:wpk>/task-list/',
		'Task Create'            : 'api/v1/<str:wpk>/task-create/',
		'Task Update'            : 'api/v1/<str:wpk>task-update/<str:pk>/',
		'Task Delete'            : 'api/v1/<str:wpk>/task-delete/<str:pk>/',
		'Task Details'           : 'api/v1/<str:wpk>/task-details/<str:pk>/',
	}

    return Response(api_urls)