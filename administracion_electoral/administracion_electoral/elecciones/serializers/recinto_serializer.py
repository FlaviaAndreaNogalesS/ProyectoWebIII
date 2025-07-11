from rest_framework import serializers
from elecciones.models.Recinto import Recinto

class RecintoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recinto
        fields = '__all__'
