
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny

from users.serializers.token import MyTokenObtainPairSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]
    serializer_class = MyTokenObtainPairSerializer