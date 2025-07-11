# users/views/usuario_admin_viewset.py
from rest_framework import viewsets
from django.contrib.auth import get_user_model
from users.serializers.usuario import UserSerializer
from rest_framework.permissions import IsAuthenticated

from users.views.permissions import IsSuperAdmin

User = get_user_model()

class UserAdminViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsSuperAdmin]
