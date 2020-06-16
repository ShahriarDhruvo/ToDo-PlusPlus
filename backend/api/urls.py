from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),

    path('work-list/', views.workList, name="work-list"),
    path('work-create/', views.workCreate, name="work-create"),
    path('work-delete/<str:pk>', views.workDelete, name="work-delete"),
    path('work-update/<str:pk>', views.workUpdate, name="work-update"),
    path('work-details/<str:pk>', views.workDetail, name="work-details"),

    path('<str:wpk>/task-list/', views.taskList, name="task-list"),
    path('<str:wpk>/task-create/', views.taskCreate, name="task-create"),
    path('<str:wpk>/task-delete/<str:pk>', views.taskDelete, name="task-delete"),
    path('<str:wpk>/task-update/<str:pk>', views.taskUpdate, name="task-update"),
    path('<str:wpk>/task-details/<str:pk>', views.taskDetail, name="task-details")
]