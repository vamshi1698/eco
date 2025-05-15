import React from 'react';
import { Toaster } from 'react-hot-toast';
import Dashboard from './components/Dashboard';
import { IncidentProvider } from './contexts/IncidentContext';
import { ForceProvider } from './contexts/ForceContext';
import { MapProvider } from './contexts/MapContext';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <IncidentProvider>
        <ForceProvider>
          <MapProvider>
            <Dashboard />
            <Toaster position="top-right" />
          </MapProvider>
        </ForceProvider>
      </IncidentProvider>
    </div>
  );
}

export default App;