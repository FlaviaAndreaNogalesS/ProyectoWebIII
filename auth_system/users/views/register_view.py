
from rest_framework import mixins, viewsets
from users.serializers.register import RegisterSerializer
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model

from users.views.permissions import IsSuperAdmin

User = get_user_model()

class RegisterView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [IsSuperAdmin]
