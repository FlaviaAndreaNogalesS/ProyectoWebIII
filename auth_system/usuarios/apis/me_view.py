from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from usuarios.apis.usuario_viewset import EsSuperAdmin


class MeView(APIView):
    permission_classes = [EsSuperAdmin]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "rol": user.rol,
            "is_staff": user.is_staff
        })
