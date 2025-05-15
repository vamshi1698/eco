import React, { useState } from 'react';
import { LifeBuoy, MapPin, Filter, AlertTriangle, ArrowDownCircle } from 'lucide-react';
import { useMap } from '../../contexts/MapContext';

const SafeZonePanel: React.FC = () => {
  const { toggleOverlay, setMapCenter } = useMap();
  const [activeTab, setActiveTab] = useState('safezones');
  
  // Mock safe zones
  const safeZones = [
    {
      id: 'sz1',
      name: 'Cubbon Park',
      type: 'evacuation',
      capacity: 5000,
      status: 'ready',
      coordinates: { lat: 12.9763, lng: 77.5929 },
    },
    {
      id: 'sz2',
      name: 'National College Grounds',
      type: 'evacuation',
      capacity: 3000,
      status: 'ready',
      coordinates: { lat: 12.9425, lng: 77.5714 },
    },
    {
      id: 'sz3',
      name: 'Shivaji Nagar Bus Station',
      type: 'transport',
      capacity: 2000,
      status: 'active',
      coordinates: { lat: 12.9820, lng: 77.6094 },
    },
    {
      id: 'sz4',
      name: 'Freedom Park',
      type: 'evacuation',
      capacity: 4000,
      status: 'ready',
      coordinates: { lat: 12.9724, lng: 77.5808 },
    },
  ];
  
  // Mock evacuation routes
  const evacuationRoutes = [
    {
      id: 'er1',
      name: 'Koramangala to HSR',
      fromLocation: 'Koramangala',
      toLocation: 'HSR Layout',
      status: 'clear',
      congestion: 'low',
    },
    {
      id: 'er2',
      name: 'MG Road to Cubbon Park',
      fromLocation: 'MG Road',
      toLocation: 'Cubbon Park',
      status: 'blocked',
      congestion: 'high',
    },
    {
      id: 'er3',
      name: 'Indiranagar to Old Airport Road',
      fromLocation: 'Indiranagar',
      toLocation: 'Old Airport Road',
      status: 'partial',
      congestion: 'medium',
    },
  ];
  
  const handleViewOnMap = (coordinates: { lat: number, lng: number }) => {
    setMapCenter(coordinates);
    toggleOverlay('safezones');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <LifeBuoy size={18} />
          Safe Zones
        </h2>
      </div>
      
      {/* Tabs */}
      <div className="flex bg-slate-700 rounded-md mb-4">
        <button 
          className={`flex-1 py-2 text-sm font-medium rounded-md ${
            activeTab === 'safezones' ? 'bg-blue-700 text-white' : 'text-slate-300'
          }`}
          onClick={() => setActiveTab('safezones')}
        >
          Safe Zones
        </button>
        <button 
          className={`flex-1 py-2 text-sm font-medium rounded-md ${
            activeTab === 'routes' ? 'bg-blue-700 text-white' : 'text-slate-300'
          }`}
          onClick={() => setActiveTab('routes')}
        >
          Evacuation Routes
        </button>
      </div>
      
      {/* Content based on tab */}
      <div className="flex-1 overflow-auto pr-2">
        {activeTab === 'safezones' ? (
          <div className="space-y-3">
            {safeZones.map(zone => (
              <div key={zone.id} className="bg-slate-700 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-sm">{zone.name}</h3>
                  <div className={`text-xs px-2 py-0.5 rounded-full ${
                    zone.status === 'ready' ? 'bg-green-500/20 text-green-300' : 'bg-blue-500/20 text-blue-300'
                  }`}>
                    {zone.status}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-2 text-xs text-slate-300">
                  <div className="flex items-center">
                    <span className="text-slate-400 mr-2">Type:</span>
                    {zone.type}
                  </div>
                  <div className="flex items-center">
                    <span className="text-slate-400 mr-2">Capacity:</span>
                    {zone.capacity}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center text-slate-400">
                    <MapPin size={12} className="mr-1" />
                    Location registered
                  </div>
                  
                  <button
                    className="text-blue-400 hover:text-blue-300"
                    onClick={() => handleViewOnMap(zone.coordinates)}
                  >
                    View on Map
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {evacuationRoutes.map(route => (
              <div key={route.id} className="bg-slate-700 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-sm">{route.name}</h3>
                  <div className={`text-xs px-2 py-0.5 rounded-full ${
                    route.status === 'clear' ? 'bg-green-500/20 text-green-300' : 
                    route.status === 'partial' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {route.status}
                  </div>
                </div>
                
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <div className="text-xs">{route.fromLocation}</div>
                  <div className="mx-2 flex-1 h-0.5 bg-slate-600 relative">
                    <ArrowDownCircle size={12} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90 text-slate-400" />
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <div className="text-xs">{route.toLocation}</div>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <div className={`flex items-center ${
                    route.congestion === 'low' ? 'text-green-300' : 
                    route.congestion === 'medium' ? 'text-yellow-300' : 
                    'text-red-300'
                  }`}>
                    <AlertTriangle size={12} className="mr-1" />
                    {route.congestion} congestion
                  </div>
                  
                  <button
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Show Route
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Emergency Notice */}
      <div className="mt-4 bg-gradient-to-r from-red-900/50 to-pink-900/50 p-3 rounded-md">
        <div className="flex items-start gap-2">
          <AlertTriangle className="text-red-500 shrink-0" size={18} />
          <div>
            <h3 className="text-sm font-medium text-red-300">Flash Flooding Alert</h3>
            <p className="text-xs mt-1 text-slate-300">
              Potential flash flooding in low-lying areas of Koramangala, HSR Layout and Bellandur. Safe zone activation may be required.
            </p>
          </div>
        </div>
        <button className="w-full mt-2 bg-red-700 hover:bg-red-600 text-xs py-1.5 rounded">
          Activate Emergency Evacuation Plan
        </button>
      </div>
    </div>
  );
};

export default SafeZonePanel;