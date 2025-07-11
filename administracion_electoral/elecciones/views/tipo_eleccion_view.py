from rest_framework import viewsets
from elecciones.models.TipoEleccion import TipoEleccion
from elecciones.serializers.tipo_eleccion_serializer import TipoEleccionSerializer

class TipoEleccionViewSet(viewsets.ModelViewSet):
    queryset = TipoEleccion.objects.all()
    serializer_class = TipoEleccionSerializer
