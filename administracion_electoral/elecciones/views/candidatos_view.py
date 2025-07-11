from rest_framework import viewsets
from elecciones.models.Candidato import Candidato
from elecciones.serializers.candidato_serializer import CandidatoSerializer

class CandidatoViewSet(viewsets.ModelViewSet):
    queryset = Candidato.objects.all()
    serializer_class = CandidatoSerializer
