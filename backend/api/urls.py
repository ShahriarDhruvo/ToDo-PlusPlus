from django.urls import path
from .views import (
    apiOverview,

    WorkList,
    WorkCreate,
    WorkDelete,
    WorkUpdate,
    WorkDetails,

    TaskList,
    TaskCreate,
    TaskDelete,
    TaskUpdate,
    TaskDetails
)

urlpatterns = [
    path('', apiOverview, name="api-overview"),

    path('work/list/', WorkList.as_view(), name="work-list"),
    path('work/create/', WorkCreate.as_view(), name="work-create"),
    path('work/delete/<str:pk>', WorkDelete.as_view(), name="work-delete"),
    path('work/update/<str:pk>', WorkUpdate.as_view(), name="work-update"),
    path('work/details/<str:pk>', WorkDetails.as_view(), name="work-details"),

    path('<str:wpk>/task/list/', TaskList.as_view(), name="task-list"),
    path('<str:wpk>/task/create/', TaskCreate.as_view(), name="task-create"),
    path('<str:wpk>/task/delete/<str:pk>', TaskDelete.as_view(), name="task-delete"),
    path('<str:wpk>/task/update/<str:pk>', TaskUpdate.as_view(), name="task-update"),
    path('<str:wpk>/task/details/<str:pk>', TaskDetails.as_view(), name="task-details")
]