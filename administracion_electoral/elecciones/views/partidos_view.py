from rest_framework import viewsets
from elecciones.models.PartidoPolitico import PartidoPolitico
from elecciones.serializers.partido_serializer import PartidoPoliticoSerializer

class PartidoViewSet(viewsets.ModelViewSet):
    queryset = PartidoPolitico.objects.all()
    serializer_class = PartidoPoliticoSerializer
