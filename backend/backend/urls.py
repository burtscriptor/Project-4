"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from main_app import views
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views # Authenication 

router = routers.DefaultRouter()
router.register(r'tasks', views.TodoView, 'task') # has to do with CRUD ops - the 
# name tasks is relative to the name todos so not inherited from django

# do i need to add these for other models?

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('token/', 
          jwt_views.TokenObtainPairView.as_view(), # As per Authenication Article
          name ='token_obtain_pair'),
     path('token/refresh/', 
          jwt_views.TokenRefreshView.as_view(), # As per Authenication Article
          name ='token_refresh'),
    path('', include('main_app.urls')),
]
