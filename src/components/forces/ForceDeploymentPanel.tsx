import React, { useState } from 'react';
import { Users, Filter, MapPin, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { useForces } from '../../contexts/ForceContext';
import ForceCard from './ForceCard';

const ForceDeploymentPanel: React.FC = () => {
  const { forces, divisions } = useForces();
  const [expandedDivision, setExpandedDivision] = useState<string | null>(null);
  
  const toggleDivision = (divisionId: string) => {
    if (expandedDivision === divisionId) {
      setExpandedDivision(null);
    } else {
      setExpandedDivision(divisionId);
    }
  };
  
  const getAvailableForceCount = (divisionId: string) => {
    return forces.filter(force => 
      force.divisionId === divisionId && 
      force.status === 'available'
    ).length;
  };
  
  const getDeployedForceCount = (divisionId: string) => {
    return forces.filter(force => 
      force.divisionId === divisionId && 
      force.status === 'deployed'
    ).length;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Users size={18} />
          Force Deployment
        </h2>
      </div>
      
      {/* Force Stats */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-blue-900/50 rounded-md p-3">
          <div className="text-3xl font-bold">
            {forces.filter(f => f.status === 'available').length}
          </div>
          <div className="text-sm text-blue-300">Available Units</div>
        </div>
        <div className="bg-slate-700 rounded-md p-3">
          <div className="text-3xl font-bold">
            {forces.filter(f => f.status === 'deployed').length}
          </div>
          <div className="text-sm text-slate-400">Deployed Units</div>
        </div>
      </div>
      
      {/* Division List */}
      <div className="flex-1 overflow-auto pr-2">
        <div className="space-y-3">
          {divisions.map(division => (
            <div key={division.id} className="bg-slate-700 rounded-lg overflow-hidden">
              <button 
                className="w-full px-4 py-3 flex items-center justify-between"
                onClick={() => toggleDivision(division.id)}
              >
                <div>
                  <h3 className="font-medium text-sm">{division.name}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs">
                    <div className="text-green-400">
                      {getAvailableForceCount(division.id)} Available
                    </div>
                    <div className="text-blue-400">
                      {getDeployedForceCount(division.id)} Deployed
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {division.urgentNeed && (
                    <div className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                      Needs Backup
                    </div>
                  )}
                  {expandedDivision === division.id ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>
              </button>
              
              {expandedDivision === division.id && (
                <div className="border-t border-slate-600 p-3 space-y-2">
                  <div className="text-xs font-medium text-slate-400 mb-2">Available Force Units</div>
                  
                  {forces.filter(f => f.divisionId === division.id && f.status === 'available').map(force => (
                    <ForceCard key={force.id} force={force} />
                  ))}
                  
                  {forces.filter(f => f.divisionId === division.id && f.status === 'available').length === 0 && (
                    <div className="text-center text-slate-400 text-xs py-2">
                      No available units in this division
                    </div>
                  )}
                  
                  <div className="text-xs font-medium text-slate-400 mt-4 mb-2">Deployed Force Units</div>
                  
                  {forces.filter(f => f.divisionId === division.id && f.status === 'deployed').map(force => (
                    <ForceCard key={force.id} force={force} />
                  ))}
                  
                  {forces.filter(f => f.divisionId === division.id && f.status === 'deployed').length === 0 && (
                    <div className="text-center text-slate-400 text-xs py-2">
                      No deployed units from this division
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* AI Recommendation */}
      <div className="mt-4 bg-gradient-to-r from-blue-900/50 to-indigo-900/50 p-3 rounded-md">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-medium">AI Recommendation</h3>
          <div className="bg-blue-500 text-xs px-2 py-0.5 rounded text-white">Smart Deploy</div>
        </div>
        <p className="text-xs mt-2 text-slate-300">
          Recommend redeploying 3 units from North Division to support ongoing protests at Town Hall. Estimated response time: 12 minutes.
        </p>
        <button className="w-full mt-2 bg-blue-700 hover:bg-blue-600 text-xs py-1.5 rounded flex items-center justify-center gap-1">
          <span>Accept Recommendation</span>
          <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
};

export default ForceDeploymentPanel;