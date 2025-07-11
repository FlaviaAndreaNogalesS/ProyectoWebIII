from django.contrib.sites import requests
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from elecciones.models.Mesa import Mesa
from elecciones.models.VotanteMesa import VotanteMesa
from elecciones.serializers.mesa_serializer import MesaSerializer

class MesaViewSet(viewsets.ModelViewSet):
    queryset = Mesa.objects.all()
    serializer_class = MesaSerializer

    @action(detail=True, methods=["post"])
    def distribuir_votantes(self, request, pk=None):
        recinto = self.get_object()
        mesas = list(recinto.mesas.all().order_by("numero"))
        if not mesas:
            return Response({"error": "No hay mesas en este recinto"}, status=400)

        # Obtener votantes del microservicio de padrón
        response = requests.get(f"http://padron-service/api/votantes/?recinto_id={recinto.id}")
        if response.status_code != 200:
            return Response({"error": "No se pudieron obtener votantes"}, status=400)

        votantes = response.json()
        if not votantes:
            return Response({"mensaje": "No hay votantes registrados para este recinto"})

        # Ordenar por apellido paterno (último nombre)
        votantes.sort(key=lambda x: x["nombre_completo"].split()[-1])

        total_votantes = len(votantes)
        cantidad_mesas = len(mesas)
        size = total_votantes // cantidad_mesas
        resto = total_votantes % cantidad_mesas

        inicio = 0
        for i, mesa in enumerate(mesas):
            fin = inicio + size + (1 if i < resto else 0)
            asignados = votantes[inicio:fin]

            for orden, votante in enumerate(asignados):
                VotanteMesa.objects.create(
                    votante_id=votante["id"],
                    mesa=mesa,
                    orden=orden
                )

            inicio = fin

        return Response({"mensaje": "Votantes distribuidos correctamente"})

    # En lugar de MesaViewSet, pon este código en RecintoViewSet

    @action(detail=True, methods=["get"], url_path="rango-apellidos-por-mesa")
    def rango_apellidos_por_mesa(self, request, pk=None):
        recinto = self.get_object()
        mesas = list(recinto.mesas.all().order_by("numero"))

        if not mesas:
            return Response({"error": "No hay mesas en este recinto"}, status=400)

        # Obtener votantes desde el microservicio de padrón
        try:
            response = requests.get(f"http://padron-service/api/votantes/?recinto_id={recinto.id}")
            response.raise_for_status()
            votantes = response.json()
        except Exception as e:
            return Response({"error": f"No se pudo obtener los votantes: {str(e)}"}, status=400)

        if not votantes:
            return Response({"mensaje": "No hay votantes registrados para este recinto"})

        votantes.sort(key=lambda x: x["nombre_completo"].split()[-1])

        total_votantes = len(votantes)
        cantidad_mesas = len(mesas)
        size = total_votantes // cantidad_mesas
        resto = total_votantes % cantidad_mesas

        resultado = []
        inicio = 0

        for i, mesa in enumerate(mesas):
            fin = inicio + size + (1 if i < resto else 0)
            asignados = votantes[inicio:fin]

            if asignados:
                apellido_inicio = asignados[0]["nombre_completo"].split()[-1]
                apellido_fin = asignados[-1]["nombre_completo"].split()[-1]

                resultado.append({
                    "mesa": mesa.numero,
                    "de": apellido_inicio,
                    "a": apellido_fin
                })

            inicio = fin

        return Response(resultado, status=200)







