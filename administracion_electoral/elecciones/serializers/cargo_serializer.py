from rest_framework import serializers
from elecciones.models.Cargo import Cargo

class CargoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cargo
        fields = '__all__'
