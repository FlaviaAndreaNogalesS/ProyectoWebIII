from rest_framework import serializers
from elecciones.models.Papeleta import Papeleta

class PapeletaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Papeleta
        fields = '__all__'
