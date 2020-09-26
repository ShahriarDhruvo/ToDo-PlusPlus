from django.urls import (
    path,
    include
)
from .views import (
    apiOverview,

    WorkList,
    WorkCreate,
    WorkDelete,
    WorkUpdate,
    WorkDetails,
    WorkAddCollaborators,
    WorkRemoveCollaborators,
    WorkListCollaboratorsDetails,

    TaskList,
    TaskCreate,
    TaskDelete,
    TaskUpdate,
    TaskDetails
)

from rest_auth.views import PasswordResetConfirmView

urlpatterns = [
    path('', apiOverview, name="api-overview"),

    path('users/', include('users.urls')),

    path('user/', include('rest_auth.urls')),
    path('user/registration/', include('rest_auth.registration.urls')),
    path('user/password/reset/confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name="password_reset_confirm"),
    
    path('accounts/', include('allauth.urls')),

    path('work/list/', WorkList.as_view(), name="work-list"),
    path('work/create/', WorkCreate.as_view(), name="work-create"),
    path('work/delete/<str:pk>', WorkDelete.as_view(), name="work-delete"),
    path('work/update/<str:pk>', WorkUpdate.as_view(), name="work-update"),
    path('work/details/<str:pk>', WorkDetails.as_view(), name="work-details"),
    path('work/add/collaborator/<str:pk>/<str:colaborator>', WorkAddCollaborators.as_view(), name="work-add-collaborator"),
    path('work/remove/collaborator/<str:pk>/<str:colaborator>', WorkRemoveCollaborators.as_view(), name="work-remove-collaborator"),
    path('work/list/collaborator/details/<str:pk>', WorkListCollaboratorsDetails.as_view(), name="work-list-collaborator-details"),

    path('<str:wpk>/task/list/', TaskList.as_view(), name="task-list"),
    path('<str:wpk>/task/create/', TaskCreate.as_view(), name="task-create"),
    path('<str:wpk>/task/delete/<str:pk>', TaskDelete.as_view(), name="task-delete"),
    path('<str:wpk>/task/update/<str:pk>', TaskUpdate.as_view(), name="task-update"),
    path('<str:wpk>/task/details/<str:pk>', TaskDetails.as_view(), name="task-details")
]