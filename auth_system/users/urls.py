
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from users.views.me_view import MeView
from users.views.usuario_admin_viewset import UserAdminViewSet
from users.views.token_view import MyTokenObtainPairView
from users.views.register_view import RegisterView
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r'users', UserAdminViewSet, basename='users')
router.register(r'register', RegisterView, basename='register')

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
    path('me/', MeView.as_view(), name='me'),
]
