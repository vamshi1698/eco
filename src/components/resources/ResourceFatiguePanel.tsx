import React from 'react';
import { Activity, Clock, RefreshCw } from 'lucide-react';
import { useForces } from '../../contexts/ForceContext';

const ResourceFatiguePanel: React.FC = () => {
  const { divisions } = useForces();
  
  // Sort divisions by fatigue level (descending)
  const sortedDivisions = [...divisions].sort((a, b) => {
    return (b.fatigueLevel || 0) - (a.fatigueLevel || 0);
  });

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Activity size={18} />
          Resource Fatigue
        </h2>
      </div>
      
      {/* Resource Summary */}
      <div className="bg-slate-700 p-3 rounded-md mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium">Overall Force Fatigue</h3>
          <div className="text-xs bg-blue-500 px-2 py-0.5 rounded">Last 24 hours</div>
        </div>
        
        <div className="w-full bg-slate-600 h-2 rounded-full mb-2">
          <div className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 h-full rounded-full" style={{ width: '62%' }}></div>
        </div>
        
        <div className="flex justify-between text-xs text-slate-400">
          <span>Fresh</span>
          <span>Moderate</span>
          <span>Critical</span>
        </div>
        
        <div className="mt-3 py-2 px-3 bg-yellow-500/20 border border-yellow-500/30 rounded-md text-xs text-yellow-300">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>Overall fatigue at 62% - Personnel rotation recommended</span>
          </div>
        </div>
      </div>
      
      {/* Division Fatigue Levels */}
      <div className="flex-1 overflow-auto pr-2">
        <h3 className="text-sm font-medium mb-3">Division Fatigue Levels</h3>
        <div className="space-y-3">
          {sortedDivisions.map(division => {
            // Calculate color based on fatigue level
            const fatigueLevel = division.fatigueLevel || 0;
            let fatigueColor = 'bg-green-500';
            let textColor = 'text-green-400'; 
            
            if (fatigueLevel > 75) {
              fatigueColor = 'bg-red-500';
              textColor = 'text-red-400';
            } else if (fatigueLevel > 50) {
              fatigueColor = 'bg-yellow-500';
              textColor = 'text-yellow-400';
            } else if (fatigueLevel > 25) {
              fatigueColor = 'bg-blue-500';
              textColor = 'text-blue-400';
            }
            
            return (
              <div key={division.id} className="bg-slate-700 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{division.name}</h4>
                  <div className={`text-xs px-2 py-0.5 rounded-full ${textColor}`}>
                    {fatigueLevel}% Fatigue
                  </div>
                </div>
                
                <div className="w-full bg-slate-600 h-2 rounded-full">
                  <div className={`${fatigueColor} h-full rounded-full`} style={{ width: `${fatigueLevel}%` }}></div>
                </div>
                
                <div className="mt-3 flex justify-between items-center">
                  <div className="text-xs text-slate-400">
                    {division.activeTime || '12h'} active • {division.callsHandled || 15} calls
                  </div>
                  
                  {fatigueLevel > 60 && (
                    <button className="text-xs bg-blue-700 hover:bg-blue-600 px-2 py-1 rounded flex items-center gap-1">
                      <RefreshCw size={12} />
                      Rotate
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Fatigue Guidelines */}
      <div className="mt-4 bg-slate-700 p-3 rounded-md text-xs">
        <h3 className="font-medium mb-2">Fatigue Management Guidelines</h3>
        <ul className="list-disc list-inside space-y-1 text-slate-300">
          <li>Rotate personnel after 8 hours of continuous activity</li>
          <li>Ensure all personnel receive at least 6 hours of rest</li>
          <li>Prioritize critical incidents for fresh units</li>
          <li>Monitor fatigue in real-time during extended operations</li>
        </ul>
      </div>
    </div>
  );
};

export default ResourceFatiguePanel;