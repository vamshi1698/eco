import React, { useState } from 'react';
import { Bell, AlertTriangle, Clock, Filter, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { useIncidents } from '../../contexts/IncidentContext';
import IncidentCard from './IncidentCard';

const IncidentPanel: React.FC = () => {
  const { incidents, addIncident } = useIncidents();
  const [filterExpanded, setFilterExpanded] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  
  const highPriorityCount = incidents.filter(inc => inc.severity === 'high').length;
  
  const filteredIncidents = incidents.filter(incident => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'high') return incident.severity === 'high';
    if (selectedFilter === 'medium') return incident.severity === 'medium';
    if (selectedFilter === 'low') return incident.severity === 'low';
    return true;
  });

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Bell size={18} />
          Active Incidents
          {highPriorityCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
              {highPriorityCount} High Priority
            </span>
          )}
        </h2>
      </div>
      
      {/* Filters */}
      <div className="mb-4 bg-slate-700 rounded-md overflow-hidden">
        <button 
          className="w-full px-4 py-2 flex items-center justify-between text-sm"
          onClick={() => setFilterExpanded(!filterExpanded)}
        >
          <div className="flex items-center gap-2">
            <Filter size={16} />
            <span>Filter Incidents</span>
          </div>
          {filterExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        
        {filterExpanded && (
          <div className="p-3 border-t border-slate-600 grid grid-cols-2 gap-2">
            <FilterButton 
              label="All Incidents" 
              count={incidents.length}
              isActive={selectedFilter === 'all'}
              onClick={() => setSelectedFilter('all')}
            />
            <FilterButton 
              label="High Priority" 
              count={incidents.filter(i => i.severity === 'high').length}
              color="bg-red-500"
              isActive={selectedFilter === 'high'}
              onClick={() => setSelectedFilter('high')}
            />
            <FilterButton 
              label="Medium Priority" 
              count={incidents.filter(i => i.severity === 'medium').length}
              color="bg-yellow-500"
              isActive={selectedFilter === 'medium'}
              onClick={() => setSelectedFilter('medium')}
            />
            <FilterButton 
              label="Low Priority" 
              count={incidents.filter(i => i.severity === 'low').length}
              color="bg-blue-500"
              isActive={selectedFilter === 'low'}
              onClick={() => setSelectedFilter('low')}
            />
          </div>
        )}
      </div>
      
      {/* Incident List */}
      <div className="flex-1 overflow-auto pr-2">
        {filteredIncidents.length === 0 ? (
          <div className="text-center text-slate-400 py-10">
            <Bell size={32} className="mx-auto mb-2 opacity-50" />
            <p>No incidents match your filter</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredIncidents.map(incident => (
              <IncidentCard key={incident.id} incident={incident} />
            ))}
          </div>
        )}
      </div>
      
      {/* Summary Footer */}
      <div className="mt-4 pt-3 border-t border-slate-700 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1">
          <Clock size={12} />
          <span>Last update: 2 mins ago</span>
        </div>
        <div>Total: {incidents.length} incidents</div>
      </div>
    </div>
  );
};

interface FilterButtonProps {
  label: string;
  count: number;
  color?: string;
  isActive: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, count, color = 'bg-blue-500', isActive, onClick }) => {
  return (
    <button 
      className={`px-3 py-2 rounded-md flex items-center justify-between text-sm ${
        isActive ? 'bg-slate-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
      }`}
      onClick={onClick}
    >
      <span>{label}</span>
      <div className={`${color} rounded-full w-5 h-5 flex items-center justify-center text-xs`}>
        {count}
      </div>
    </button>
  );
};

export default IncidentPanel;