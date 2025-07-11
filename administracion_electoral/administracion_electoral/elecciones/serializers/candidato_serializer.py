from rest_framework import serializers

from elecciones.models import Candidato


class CandidatoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidato
        fields = '__all__'
