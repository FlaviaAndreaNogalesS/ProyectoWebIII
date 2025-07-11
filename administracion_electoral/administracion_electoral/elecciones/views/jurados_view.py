from rest_framework import viewsets
from elecciones.models.JuradoElectoral import JuradoElectoral
from elecciones.serializers.jurado_serializer import JuradoElectoralSerializer

class JuradoViewSet(viewsets.ModelViewSet):
    queryset = JuradoElectoral.objects.all()
    serializer_class = JuradoElectoralSerializer
