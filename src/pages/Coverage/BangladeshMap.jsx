import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const BangladeshMap = () => {
  const bangladeshCenter = [23.685, 90.3563];

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
      <MapContainer
        center={bangladeshCenter}
        zoom={7}
        scrollWheelZoom={false}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <CircleMarker
          center={bangladeshCenter}
          radius={12}
          pathOptions={{
            color: "#1d4ed8",
            fillColor: "#3b82f6",
            fillOpacity: 0.8,
          }}
        >
          <Popup>Our service is available all over Bangladesh!</Popup>
        </CircleMarker>
      </MapContainer>
    </div>
  );
};

export default BangladeshMap;
