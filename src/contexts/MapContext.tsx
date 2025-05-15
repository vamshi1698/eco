import React, { createContext, useContext, useState } from 'react';

interface Coordinates {
  lat: number;
  lng: number;
}

interface MapContextType {
  mapCenter: Coordinates;
  setMapCenter: (coords: Coordinates) => void;
  mapType: string;
  setMapType: (type: string) => void;
  activeOverlays: string[];
  toggleOverlay: (overlay: string) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mapCenter, setMapCenter] = useState<Coordinates>({ lat: 12.9716, lng: 77.5946 }); // Bengaluru
  const [mapType, setMapType] = useState<string>('standard');
  const [activeOverlays, setActiveOverlays] = useState<string[]>(['heatmap']);
  
  const toggleOverlay = (overlay: string) => {
    setActiveOverlays(prev => 
      prev.includes(overlay)
        ? prev.filter(item => item !== overlay)
        : [...prev, overlay]
    );
  };
  
  return (
    <MapContext.Provider value={{ 
      mapCenter, 
      setMapCenter, 
      mapType, 
      setMapType, 
      activeOverlays, 
      toggleOverlay 
    }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = (): MapContextType => {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
};