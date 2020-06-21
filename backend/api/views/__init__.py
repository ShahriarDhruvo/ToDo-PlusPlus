# This is a divided version of original view of originalViews.py file and in fbv.py you will find the
# fbv (function based views) implementation of this logic, here it is implemented in cbv (class based views)

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .workViews import (
    WorkList,
    WorkCreate,
    WorkDelete,
    WorkUpdate,
    WorkDetails
)

from .taskViews import (
    TaskList,
    TaskCreate,
    TaskDelete,
    TaskUpdate,
    TaskDetails
)


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
		'Work List':'work-list/',
		'Work Create':'work-create/',
		'Work Update':'work-update/<str:pk>/',
		'Work Delete':'work-delete/<str:pk>/',
		'Work Details':'work-details/<str:pk>/',

		'Task List':'<str:wpk>/task-list/',
		'Task Create':'<str:wpk>/task-create/',
		'Task Update':'w<str:wpk>task-update/<str:pk>/',
		'Task Delete':'<str:wpk>/task-delete/<str:pk>/',
		'Task Details':'<str:wpk>/task-details/<str:pk>'
	}
    return Response(api_urls)