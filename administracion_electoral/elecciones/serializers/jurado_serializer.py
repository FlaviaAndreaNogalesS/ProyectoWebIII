from rest_framework import serializers
from elecciones.models.JuradoElectoral import JuradoElectoral

class JuradoElectoralSerializer(serializers.ModelSerializer):
    class Meta:
        model = JuradoElectoral
        fields = '__all__'
