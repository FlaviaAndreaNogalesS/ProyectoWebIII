from rest_framework import serializers
from elecciones.models.Mesa import Mesa

class MesaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mesa
        fields = '__all__'
