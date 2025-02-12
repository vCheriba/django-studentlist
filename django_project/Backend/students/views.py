from django.shortcuts import render
from rest_framework import generics
from .models import Student
from .serializers import StudentAPISerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class StudentAPIView(generics.ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentAPISerializer
    permission_classes = [IsAuthenticated]