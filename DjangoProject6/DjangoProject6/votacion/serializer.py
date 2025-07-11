from rest_framework import serializers
from .models import Voto

class VotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voto
        fields = '__all__'
