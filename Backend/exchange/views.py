import json
from .serializers import *
from django.db.models import Q
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status, generics
from rest_framework.response import Response

# Create your views here.
class BasketGet(generics.ListAPIView):
    serializer_class = BasketSerializer
 
    def get_queryset(self):
        return Basket.objects.all().order_by('-id')