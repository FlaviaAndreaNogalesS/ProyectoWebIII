from rest_framework import viewsets
from elecciones.models.Seccion import Seccion
from elecciones.serializers.seccion_serializer import SeccionSerializer

class SeccionViewSet(viewsets.ModelViewSet):
    queryset = Seccion.objects.all()
    serializer_class = SeccionSerializer