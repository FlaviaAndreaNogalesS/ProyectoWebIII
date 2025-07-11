from rest_framework import serializers
from elecciones.models.TipoEleccion import TipoEleccion

class TipoEleccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoEleccion
        fields = '__all__'
