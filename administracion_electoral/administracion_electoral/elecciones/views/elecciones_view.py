from rest_framework import viewsets
from elecciones.models.Eleccion import Eleccion
from elecciones.serializers.eleccion_serializer import EleccionSerializer

class EleccionViewSet(viewsets.ModelViewSet):
    queryset = Eleccion.objects.all()
    serializer_class = EleccionSerializer