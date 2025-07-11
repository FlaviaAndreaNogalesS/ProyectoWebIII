from rest_framework import viewsets
from elecciones.models.Cargo import Cargo
from elecciones.serializers.cargo_serializer import CargoSerializer

class CargoViewSet(viewsets.ModelViewSet):
    queryset = Cargo.objects.all()
    serializer_class = CargoSerializer
