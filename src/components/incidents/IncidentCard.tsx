import React, { useState } from 'react';
import { AlertTriangle, MapPin, Clock, ChevronDown, ChevronUp, Users } from 'lucide-react';
import { Incident } from '../../types/incidents';
import { useForces } from '../../contexts/ForceContext';
import { useMap } from '../../contexts/MapContext';

interface IncidentCardProps {
  incident: Incident;
}

const IncidentCard: React.FC<IncidentCardProps> = ({ incident }) => {
  const [expanded, setExpanded] = useState(false);
  const { deployForce } = useForces();
  const { setMapCenter } = useMap();
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  };
  
  const handleViewOnMap = () => {
    // In a real app, we would set the actual coordinates
    setMapCenter({ 
      lat: 12.9716 + (Math.random() * 0.1 - 0.05), 
      lng: 77.5946 + (Math.random() * 0.1 - 0.05)
    });
  };
  
  const handleDeployForces = () => {
    // Simulated deployment (would be more sophisticated in a real app)
    deployForce(incident.id);
  };

  return (
    <div className={`bg-slate-700 rounded-lg overflow-hidden border-l-4 ${
      getSeverityColor(incident.severity)
    }`}>
      <div className="p-3">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-start gap-2">
            <div className={`p-1 rounded ${
              incident.severity === 'high' ? 'bg-red-500/20' : 
              incident.severity === 'medium' ? 'bg-yellow-500/20' : 
              'bg-blue-500/20'
            }`}>
              {incident.severity === 'high' ? (
                <AlertTriangle size={16} className="text-red-500" />
              ) : (
                <AlertTriangle size={16} className={
                  incident.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                } />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-sm leading-tight">{incident.type}</h3>
              <div className="flex items-center text-xs text-slate-400 mt-0.5">
                <MapPin size={10} className="mr-1" />
                {incident.location}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className={`text-xs px-2 py-0.5 rounded-full ${
              incident.status === 'new' 
                ? 'bg-blue-500/20 text-blue-300' 
                : incident.status === 'in-progress' 
                  ? 'bg-yellow-500/20 text-yellow-300' 
                  : 'bg-green-500/20 text-green-300'
            }`}>
              {incident.status}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-xs text-slate-400 mt-2">
          <div className="flex items-center">
            <Clock size={12} className="mr-1" /> {incident.timeReported}
          </div>
          <button
            className="flex items-center gap-1 text-slate-300 hover:text-white"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                <span>Less</span>
                <ChevronUp size={14} />
              </>
            ) : (
              <>
                <span>More</span>
                <ChevronDown size={14} />
              </>
            )}
          </button>
        </div>
        
        {expanded && (
          <div className="mt-3 pt-3 border-t border-slate-600 space-y-3">
            {incident.description && (
              <div className="text-xs text-slate-300">
                <p>{incident.description}</p>
              </div>
            )}
            
            {incident.status !== 'closed' && (
              <div className="flex flex-wrap gap-2">
                <button
                  className="text-xs bg-blue-900 hover:bg-blue-800 px-3 py-1.5 rounded-md flex items-center gap-1"
                  onClick={handleViewOnMap}
                >
                  <MapPin size={12} />
                  View on Map
                </button>
                <button
                  className="text-xs bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-md flex items-center gap-1"
                  onClick={handleDeployForces}
                >
                  <Users size={12} />
                  Deploy Forces
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IncidentCard;