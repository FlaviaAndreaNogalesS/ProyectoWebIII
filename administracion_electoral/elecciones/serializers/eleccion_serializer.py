from rest_framework import serializers
from elecciones.models.Eleccion import Eleccion

class EleccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Eleccion
        fields = '__all__'
