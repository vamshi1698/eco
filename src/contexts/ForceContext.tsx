import React, { createContext, useContext, useState, useEffect } from 'react';
import { Force, Division } from '../types/forces';
import { generateMockForces, generateMockDivisions } from '../data/mockForces';
import toast from 'react-hot-toast';

interface ForceContextType {
  forces: Force[];
  divisions: Division[];
  deployForce: (incidentId: string) => void;
  returnForce: (forceId: string) => void;
}

const ForceContext = createContext<ForceContextType | undefined>(undefined);

export const ForceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [forces, setForces] = useState<Force[]>([]);
  const [divisions, setDivisions] = useState<Division[]>([]);
  
  useEffect(() => {
    // Initialize with mock data
    setForces(generateMockForces());
    setDivisions(generateMockDivisions());
  }, []);
  
  const deployForce = (incidentId: string) => {
    // Find an available force
    const availableForce = forces.find(force => force.status === 'available');
    
    if (availableForce) {
      setForces(prev => 
        prev.map(force => 
          force.id === availableForce.id 
            ? { 
                ...force, 
                status: 'deployed', 
                incident: incidentId,
                deployedTime: 'Just now',
                location: 'En route' // This would be more specific in a real app
              } 
            : force
        )
      );
      
      toast.success(`${availableForce.name} deployed successfully`, {
        duration: 3000,
      });
    } else {
      toast.error('No available forces to deploy', {
        duration: 3000,
      });
    }
  };
  
  const returnForce = (forceId: string) => {
    setForces(prev => 
      prev.map(force => 
        force.id === forceId 
          ? { 
              ...force, 
              status: 'available', 
              incident: undefined,
              deployedTime: undefined,
              location: force.homeBase // Return to home base
            } 
          : force
      )
    );
    
    toast('Force unit returned to base', {
      icon: '🔄',
      duration: 3000,
    });
  };
  
  return (
    <ForceContext.Provider value={{ forces, divisions, deployForce, returnForce }}>
      {children}
    </ForceContext.Provider>
  );
};

export const useForces = (): ForceContextType => {
  const context = useContext(ForceContext);
  if (context === undefined) {
    throw new Error('useForces must be used within a ForceProvider');
  }
  return context;
};