import React, {useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from 'react-leaflet';
import {LatLng} from 'leaflet';

function LocationMarker() {
  const [position, setPosition] = useState<LatLng | null>(null); // Use LatLng | null type
  const map = useMap();

  useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng as LatLng); // Cast to LatLng
      map.flyTo(e.latlng, map.getZoom());
    }
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

const CustomMap = () => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      style={{height: '400px', width: '100%'}}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <LocationMarker/>
    </MapContainer>
  );
}

export default CustomMap;
