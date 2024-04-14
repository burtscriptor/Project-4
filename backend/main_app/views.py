from django.shortcuts import render
from rest_framework import viewsets, status # Status as per Authenication
from .serializers import TodoSerializers
from .models import Todo
from rest_framework.views import APIView # As per Authentication
from rest_framework.response import Response  # As per Authentication
from rest_framework.permissions import IsAuthenticated # As per Authentication
from rest_framework_simplejwt.tokens import RefreshToken # As per Authentication 



class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializers
    queryset =  Todo.objects.all()

class HomeView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        content = {'message': 'Welcome to the JWT Authentication page using React Js and Django!'}
        return Response(content)
    
class LogoutView(APIView):
     permission_classes = (IsAuthenticated,)
     def post(self, request):
          
          try:
               refresh_token = request.data["refresh_token"]
               token = RefreshToken(refresh_token)
               token.blacklist()
               return Response(status=status.HTTP_205_RESET_CONTENT)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)