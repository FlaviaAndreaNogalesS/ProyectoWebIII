from rest_framework.routers import DefaultRouter

from elecciones.views import EleccionViewSet, TipoEleccionViewSet
from elecciones.views.recintos_view import RecintoViewSet
from elecciones.views.mesas_view import MesaViewSet
from elecciones.views.cargos_view import CargoViewSet
from elecciones.views.partidos_view import PartidoViewSet
from elecciones.views.candidatos_view import CandidatoViewSet
from elecciones.views.jurados_view import JuradoViewSet
from elecciones.views.papeletas_view import PapeletaViewSet
from elecciones.views.secciones_view import SeccionViewSet
from elecciones.views.me_view import MeView
router = DefaultRouter()
router.register(r'recintos', RecintoViewSet)
router.register(r'mesas', MesaViewSet)
router.register(r'elecciones', EleccionViewSet)
router.register(r'secciones', SeccionViewSet)
router.register(r'cargos', CargoViewSet)
router.register(r'partidos', PartidoViewSet)
router.register(r'candidatos', CandidatoViewSet)
router.register(r'jurados', JuradoViewSet)
router.register(r'papeletas', PapeletaViewSet)
router.register(r'tipos-eleccion', TipoEleccionViewSet)

urlpatterns = router.urls
