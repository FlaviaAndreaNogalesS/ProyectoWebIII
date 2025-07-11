from django.urls import path, include
from rest_framework.routers import DefaultRouter
from votacion.views import VotoViewSet

router = DefaultRouter()
router.register(r'votos', VotoViewSet, basename='voto')

urlpatterns = [
    path('api/', include(router.urls)),
]
