from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status, viewsets
from elecciones.models import Papeleta, Candidato, Seccion, Eleccion
from elecciones.serializers import PapeletaSerializer

class PapeletaViewSet(viewsets.ModelViewSet):
    queryset = Papeleta.objects.all()
    serializer_class = PapeletaSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=["post"], url_path="generar")
    def generar_papeletas(self, request):
        seccion_id = request.data.get("seccion")
        eleccion_id = request.data.get("eleccion")

        if not seccion_id or not eleccion_id:
            return Response({"error": "Se requiere 'seccion' y 'eleccion'"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            seccion = Seccion.objects.get(pk=seccion_id)
        except Seccion.DoesNotExist:
            return Response({"error": "Sección no encontrada"}, status=status.HTTP_404_NOT_FOUND)

        # Obtener todos los candidatos que están en cargos que afectan a esta sección
        candidatos = Candidato.objects.filter(cargo__secciones=seccion).distinct()

        if not candidatos.exists():
            return Response({"error": "No hay candidatos disponibles para esta sección"}, status=status.HTTP_404_NOT_FOUND)

        # Crear papeleta
        papeleta = Papeleta.objects.create(seccion=seccion, generada_automaticamente=True)
        papeleta.candidatos.set(candidatos)

        serializer = self.get_serializer(papeleta)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

