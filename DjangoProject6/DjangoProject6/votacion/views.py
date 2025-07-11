from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.db.models import Count
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Voto
from .serializer import VotoSerializer


class VotoViewSet(viewsets.ModelViewSet):
    queryset = Voto.objects.all()
    serializer_class = VotoSerializer

    def votar(self, request):
        votante_id = request.data.get("votante_id")
        if Voto.objects.filter(votante_id=votante_id).exists():
            return Response({'error': 'Este votante ya ha votado.'}, status=400)

        response = self.create(request)

        # Emitir el evento
        if response.status_code == 201:
            channel_layer = get_channel_layer()
            data = {
                "candidato_id": response.data["candidato_id"],
                "mesa_id": response.data["mesa_id"]
            }
            async_to_sync(channel_layer.group_send)(
                "resultados_votacion",
                {
                    "type": "recibir_voto",
                    "data": data
                }
            )

        return response
    @action(detail=False, methods=["get"], url_path="resultados")
    def resultados(self, request):
        resultados = Voto.objects.values("candidato_id").annotate(total=Count("id"))
        return Response(resultados)

    @action(detail=False, methods=["get"], url_path="avance-votacion")
    def avance_votacion(self, request):
        avance = Voto.objects.values("mesa_id").annotate(total=Count("id"))
        return Response(avance)


