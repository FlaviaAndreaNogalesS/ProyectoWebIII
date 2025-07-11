from rest_framework import serializers
from elecciones.models.Seccion import Seccion

class SeccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seccion
        fields = '__all__'
