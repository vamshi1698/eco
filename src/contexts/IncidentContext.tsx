import React, { createContext, useContext, useState, useEffect } from 'react';
import { Incident } from '../types/incidents';
import { generateMockIncidents } from '../data/mockIncidents';
import toast from 'react-hot-toast';

interface IncidentContextType {
  incidents: Incident[];
  addIncident: (incident: Incident) => void;
  updateIncident: (id: string, updates: Partial<Incident>) => void;
  closeIncident: (id: string) => void;
}

const IncidentContext = createContext<IncidentContextType | undefined>(undefined);

export const IncidentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  
  useEffect(() => {
    // Initialize with mock data
    setIncidents(generateMockIncidents());
    
    // Simulate new incidents coming in periodically
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const mockIncidents = generateMockIncidents(1);
        if (mockIncidents.length > 0) {
          const newIncident = mockIncidents[0];
          setIncidents(prev => [newIncident, ...prev]);
          
          if (newIncident.severity === 'high') {
            toast.error(`High Priority: ${newIncident.type} at ${newIncident.location}`, {
              duration: 5000,
              icon: '🚨',
            });
          }
        }
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  const addIncident = (incident: Incident) => {
    setIncidents(prev => [incident, ...prev]);
    toast.success(`New incident created: ${incident.type}`, {
      duration: 3000,
    });
  };
  
  const updateIncident = (id: string, updates: Partial<Incident>) => {
    setIncidents(prev => 
      prev.map(incident => 
        incident.id === id ? { ...incident, ...updates } : incident
      )
    );
  };
  
  const closeIncident = (id: string) => {
    setIncidents(prev => 
      prev.map(incident => 
        incident.id === id ? { ...incident, status: 'closed' } : incident
      )
    );
    toast.success('Incident marked as resolved');
  };
  
  return (
    <IncidentContext.Provider value={{ incidents, addIncident, updateIncident, closeIncident }}>
      {children}
    </IncidentContext.Provider>
  );
};

export const useIncidents = (): IncidentContextType => {
  const context = useContext(IncidentContext);
  if (context === undefined) {
    throw new Error('useIncidents must be used within an IncidentProvider');
  }
  return context;
};