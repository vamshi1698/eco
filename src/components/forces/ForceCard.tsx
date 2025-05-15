import React from 'react';
import { Clock, MapPin, Users, Shield, AlertTriangle } from 'lucide-react';
import { Force } from '../../types/forces';
import { useMap } from '../../contexts/MapContext';

interface ForceCardProps {
  force: Force;
}

const ForceCard: React.FC<ForceCardProps> = ({ force }) => {
  const { setMapCenter } = useMap();
  
  const handleViewOnMap = () => {
    // In a real app, we would set the actual coordinates
    setMapCenter({ 
      lat: 12.9716 + (Math.random() * 0.1 - 0.05), 
      lng: 77.5946 + (Math.random() * 0.1 - 0.05)
    });
  };
  
  // Get icon based on force type
  const getForceIcon = (type: string) => {
    switch (type) {
      case 'police':
        return <Shield size={14} />;
      case 'fire':
        return <AlertTriangle size={14} />;
      default:
        return <Users size={14} />;
    }
  };
  
  return (
    <div className={`bg-slate-800 rounded p-2 text-xs ${
      force.status === 'deployed' ? 'border-l-2 border-blue-500' : ''
    }`}>
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-1">
          <div className={`p-1 rounded ${
            force.type === 'police' ? 'bg-blue-500/20 text-blue-400' : 
            force.type === 'fire' ? 'bg-red-500/20 text-red-400' : 
            'bg-green-500/20 text-green-400'
          }`}>
            {getForceIcon(force.type)}
          </div>
          <div>
            <div className="font-medium">{force.name}</div>
            <div className="text-slate-400 flex items-center mt-0.5">
              <Users size={10} className="mr-1" />
              {force.personnel} personnel
            </div>
          </div>
        </div>
        
        <div className={`px-1.5 py-0.5 rounded text-xs ${
          force.status === 'available' 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-blue-500/20 text-blue-400'
        }`}>
          {force.status}
        </div>
      </div>
      
      {force.location && (
        <div className="mt-2 flex items-center text-slate-400">
          <MapPin size={10} className="mr-1" />
          {force.location}
          <button 
            className="ml-auto text-blue-400 hover:text-blue-300"
            onClick={handleViewOnMap}
          >
            View
          </button>
        </div>
      )}
      
      {force.incident && (
        <div className="mt-1 flex items-center text-slate-400">
          <Clock size={10} className="mr-1" />
          Deployed {force.deployedTime}
        </div>
      )}
      
      {force.status === 'available' && (
        <button className="mt-2 w-full bg-blue-700 hover:bg-blue-600 py-1 rounded">
          Deploy Unit
        </button>
      )}
    </div>
  );
};

export default ForceCard;