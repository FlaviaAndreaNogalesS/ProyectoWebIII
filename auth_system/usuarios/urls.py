from django.urls import path
from rest_framework.routers import DefaultRouter
from usuarios.apis.me_view import MeView
from usuarios.apis.usuario_viewset import UsuarioViewSet
from usuarios.apis.auth_viewset import CustomTokenObtainPairView

router = DefaultRouter()
router.register('usuarios', UsuarioViewSet)

urlpatterns = router.urls + [
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('usuarios/me/', MeView.as_view(), name='me'),
]
