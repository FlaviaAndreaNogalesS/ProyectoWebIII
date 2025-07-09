import {
  GoogleMap,
  DrawingManager,
  LoadScript,
  Polygon,
} from "@react-google-maps/api";
import { useCallback, useEffect, useRef, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -17.7833,
  lng: -63.1821,
};

type Coordenada = {
  lat: number;
  lng: number;
};

type Props = {
  onPolygonComplete: (coords: Coordenada[]) => void;
  initialPolygon?: Coordenada[];
};

export const MapaGoogle = ({ onPolygonComplete, initialPolygon }: Props) => {
  const [polygonPath, setPolygonPath] = useState<Coordenada[] | null>(
    initialPolygon || null
  );
  // Actualizar el polígono cuando cambien las props (por ejemplo, al editar)
  useEffect(() => {
  if (initialPolygon && Array.isArray(initialPolygon)) {
    setPolygonPath(initialPolygon);
  } else {
    setPolygonPath(null); // 🔥 esto borra el polígono del mapa
  }
}, [initialPolygon]);

  const [drawingMode, setDrawingMode] = useState<
    google.maps.drawing.OverlayType | null
  >(null);
  const [mapReady, setMapReady] = useState(false);

  const polygonRef = useRef<google.maps.Polygon | null>(null);

  const handlePolygonComplete = useCallback(
    (polygon: google.maps.Polygon) => {
      const path = polygon.getPath();
      const coords = [];
      for (let i = 0; i < path.getLength(); i++) {
        const point = path.getAt(i);
        coords.push({ lat: point.lat(), lng: point.lng() });
      }
      setPolygonPath(coords);
      onPolygonComplete(coords);
      setDrawingMode(null);
      polygon.setMap(null); // ocultar el dibujo viejo
    },
    [onPolygonComplete]
  );

  const handlePathChange = () => {
    if (!polygonRef.current) return;
    const path = polygonRef.current.getPath();
    const updatedCoords = [];
    for (let i = 0; i < path.getLength(); i++) {
      const point = path.getAt(i);
      updatedCoords.push({ lat: point.lat(), lng: point.lng() });
    }
    setPolygonPath(updatedCoords);
    onPolygonComplete(updatedCoords);
  };

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""}
      libraries={["drawing"]}
      onLoad={() => {
        if (
          window.google &&
          window.google.maps &&
          window.google.maps.drawing
        ) {
          setDrawingMode(window.google.maps.drawing.OverlayType.POLYGON);
          setMapReady(true);
        }
      }}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      >
        {/* Mostrar y editar polígono existente */}
        {polygonPath && mapReady && (
          <Polygon
            path={polygonPath}
            editable={true}
            draggable={false}
            options={{
              fillColor: "#2196f3",
              fillOpacity: 0.3,
              strokeWeight: 2,
              clickable: false,
              zIndex: 1,
            }}
            onLoad={(polygon) => (polygonRef.current = polygon)}
            onMouseUp={handlePathChange}
            onDragEnd={handlePathChange}
          />
        )}

        {/* Mostrar DrawingManager solo si no hay polígono */}
        {!polygonPath &&
          mapReady &&
          window.google?.maps?.drawing &&
          window.google?.maps?.ControlPosition && (
            <DrawingManager
              onPolygonComplete={handlePolygonComplete}
              options={{
                drawingControl: true,
                drawingControlOptions: {
                  position: window.google.maps.ControlPosition.TOP_CENTER,
                  drawingModes: [
                    window.google.maps.drawing.OverlayType.POLYGON,
                  ],
                },
                polygonOptions: {
                  fillColor: "#2196f3",
                  fillOpacity: 0.3,
                  strokeWeight: 2,
                  clickable: true,
                  editable: true,
                  zIndex: 1,
                },
              }}
              drawingMode={drawingMode}
            />
          )}
      </GoogleMap>
    </LoadScript>
  );
};
