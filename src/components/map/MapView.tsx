import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import { Map as MapIcon, Layers, Filter } from 'lucide-react';
import { useMap as useMapContext } from '../../contexts/MapContext';
import { useIncidents } from '../../contexts/IncidentContext';
import { useForces } from '../../contexts/ForceContext';
import L from 'leaflet';

// Custom marker icons
const createIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div class="marker-pin" style="background-color: ${color}"></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });
};

const MapRecenter = ({ center }: { center: { lat: number; lng: number } }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

const MapView: React.FC = () => {
  const { mapCenter, setMapCenter, mapType, setMapType, activeOverlays, toggleOverlay } = useMapContext();
  const { incidents } = useIncidents();
  const { forces } = useForces();
  
  // Map layers for toggling
  const mapLayers = [
    { id: 'heatmap', label: 'Crime Heatmap', color: 'bg-red-500' },
    { id: 'traffic', label: 'Traffic', color: 'bg-yellow-500' },
    { id: 'forces', label: 'Force Units', color: 'bg-blue-500' },
    { id: 'safezones', label: 'Safe Zones', color: 'bg-green-500' },
  ];
  
  // Map types
  const mapTypes = [
    { id: 'standard', label: 'Standard' },
    { id: 'satellite', label: 'Satellite' },
    { id: 'traffic', label: 'Traffic' },
  ];

  return (
    <div className="relative h-full">
      <MapContainer
        center={[12.9716, 77.5946]}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapRecenter center={mapCenter} />
        
        {/* Incident Markers */}
        {incidents.map((incident) => (
          <Marker
            key={incident.id}
            position={[incident.coordinates.lat, incident.coordinates.lng]}
            icon={createIcon(
              incident.severity === 'high' ? '#DC2626' :
              incident.severity === 'medium' ? '#D97706' : '#3B82F6'
            )}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold">{incident.type}</h3>
                <p className="text-sm">{incident.location}</p>
                <p className="text-xs text-gray-600">{incident.timeReported}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Force Units */}
        {forces.map((force) => (
          <Circle
            key={force.id}
            center={[
              12.9716 + (Math.random() * 0.1 - 0.05),
              77.5946 + (Math.random() * 0.1 - 0.05)
            ]}
            radius={200}
            pathOptions={{
              color: force.status === 'available' ? '#059669' : '#2563EB',
              fillColor: force.status === 'available' ? '#059669' : '#2563EB',
              fillOpacity: 0.3
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold">{force.name}</h3>
                <p className="text-sm">{force.type} - {force.status}</p>
                <p className="text-xs text-gray-600">{force.personnel} personnel</p>
              </div>
            </Popup>
          </Circle>
        ))}
      </MapContainer>
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <div className="bg-slate-800/90 rounded-md shadow-lg overflow-hidden">
          <div className="p-2 border-b border-slate-700 text-xs font-medium">Map Type</div>
          <div className="p-2 flex flex-col gap-1">
            {mapTypes.map((type) => (
              <button
                key={type.id}
                className={`text-xs py-1 px-2 rounded ${
                  mapType === type.id ? 'bg-blue-900 text-white' : 'text-slate-300 hover:bg-slate-700'
                }`}
                onClick={() => setMapType(type.id)}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="bg-slate-800/90 rounded-md shadow-lg overflow-hidden">
          <div className="p-2 border-b border-slate-700 text-xs font-medium flex items-center gap-2">
            <Layers size={14} />
            <span>Layers</span>
          </div>
          <div className="p-2 flex flex-col gap-1">
            {mapLayers.map((layer) => (
              <button
                key={layer.id}
                className={`text-xs py-1 px-2 rounded flex items-center gap-2 ${
                  activeOverlays.includes(layer.id) ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-700/50'
                }`}
                onClick={() => toggleOverlay(layer.id)}
              >
                <div className={`w-2 h-2 rounded-full ${layer.color}`}></div>
                {layer.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Map Attribution */}
      <div className="absolute bottom-2 right-2 bg-slate-800/80 text-xs text-slate-300 py-1 px-2 rounded">
        Bengaluru Emergency Response System • OpenStreetMap
      </div>
    </div>
  );
};

export default MapView;