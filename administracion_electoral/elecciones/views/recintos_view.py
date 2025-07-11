from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from elecciones.models.Recinto import Recinto
from elecciones.models.Mesa import Mesa
from elecciones.serializers.recinto_serializer import RecintoSerializer

class RecintoViewSet(viewsets.ModelViewSet):
    queryset = Recinto.objects.all()
    serializer_class = RecintoSerializer

    @action(detail=True, methods=["post"])
    def crear_mesas(self, request, pk=None):
        cantidad = int(request.data.get("cantidad", 0))
        recinto = self.get_object()
        for i in range(1, cantidad + 1):
            Mesa.objects.create(numero=i, recinto=recinto)
        return Response({"mensaje": f"{cantidad} mesas creadas en {recinto.nombre}"})

