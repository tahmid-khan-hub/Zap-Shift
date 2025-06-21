import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -35],
});

const FlyToDistrict = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 10); 
    }
  }, [position, map]);
  return null;
};

const BangladeshMap = ({ serviceCenter }) => {
  const mapRef = useRef();
  const [searchText, setSearchText] = useState("");
  const [focusedPosition, setFocusedPosition] = useState(null);
  const [openPopupIndex, setOpenPopupIndex] = useState(null);

  const handleSearch = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);

    const found = serviceCenter.find((district) =>
      district.city.toLowerCase().includes(text)
    );

    if (found) {
      setFocusedPosition([found.latitude, found.longitude]);
      const index = serviceCenter.findIndex((d) => d.city === found.city);
      setOpenPopupIndex(index);
    }
  };

  return (
    <div className="w-full space-y-4">
      <input
        type="text"
        value={searchText}
        onChange={handleSearch}
        placeholder="Search district..."
        className="w-full md:w-1/2 px-4 py-2 border border-lime-600 rounded-md shadow my-7"
      />

      <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg">
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={7}
          scrollWheelZoom={true}
          className="h-full w-full z-0"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <FlyToDistrict position={focusedPosition} />

          {serviceCenter.map((district, idx) => (
            <Marker
              key={idx}
              position={[district.latitude, district.longitude]}
              icon={customIcon}
              eventHandlers={{
                add: (e) => {
                  if (idx === openPopupIndex) {
                    e.target.openPopup();
                  }
                },
              }}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold text-blue-600">{district.city}</p>
                  <p className="text-xs text-gray-600 mb-1">
                    Covered: {district.covered_area?.join(", ")}
                  </p>
                  <a
                    href={district.flowchart}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline text-xs"
                  >
                    View flowchart
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default BangladeshMap;
