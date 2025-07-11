from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from votacion.views import VotoViewSet

router = routers.DefaultRouter()
router.register(r'votos', VotoViewSet, basename='voto')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
