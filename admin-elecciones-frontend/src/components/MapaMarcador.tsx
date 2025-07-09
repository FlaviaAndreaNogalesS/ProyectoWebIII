import {
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { useState, useEffect } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: -17.7833,
  lng: -63.1821,
};

type Props = {
  onSelect: (lat: number, lng: number) => void;
  initialPosition?: { lat: number; lng: number };
};

export const MapaMarcador = ({ onSelect, initialPosition }: Props) => {
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(initialPosition || null);

  useEffect(() => {
    // Actualiza el marcador si las coordenadas cambian desde fuera (modo edición)
    if (initialPosition) {
      setMarker(initialPosition);
    }
  }, [initialPosition]);

  const handleClick = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    const newPosition = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setMarker(newPosition);
    onSelect(newPosition.lat, newPosition.lng);
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={marker || defaultCenter}
        zoom={14}
        onClick={handleClick}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
    </LoadScript>
  );
};
