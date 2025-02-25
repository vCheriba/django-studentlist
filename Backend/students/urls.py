from django.urls import path
from .views import StudentAPIView, StudentDetailAPIView, StudentCreateAPIView

urlpatterns = [
    path('students/', StudentAPIView.as_view(), name='name'),
    path('students/<int:pk>/', StudentDetailAPIView.as_view(), name='student_detail'),
    path('students/create/', StudentCreateAPIView.as_view(), name='add_student'),
]