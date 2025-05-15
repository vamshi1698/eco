import React, { useState } from 'react';
import { Shield, Bell, ArrowDownCircle, Activity, Map, LifeBuoy, Users, Menu, X } from 'lucide-react';
import MapView from './map/MapView';
import IncidentPanel from './incidents/IncidentPanel';
import ForceDeploymentPanel from './forces/ForceDeploymentPanel';
import ResourceFatiguePanel from './resources/ResourceFatiguePanel';
import SafeZonePanel from './safezones/SafeZonePanel';
import EventDetectionPanel from './events/EventDetectionPanel';

const Dashboard: React.FC = () => {
  const [activePanel, setActivePanel] = useState('incidents');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const renderPanel = () => {
    switch (activePanel) {
      case 'incidents':
        return <IncidentPanel />;
      case 'forces':
        return <ForceDeploymentPanel />;
      case 'resources':
        return <ResourceFatiguePanel />;
      case 'events':
        return <EventDetectionPanel />;
      case 'safezones':
        return <SafeZonePanel />;
      default:
        return <IncidentPanel />;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-slate-800 px-4 py-2 flex justify-between items-center border-b border-slate-700">
        <div className="flex items-center gap-2">
          <Shield className="text-blue-500" size={24} />
          <h1 className="text-lg font-bold">Bengaluru Emergency Response</h1>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-700 px-3 py-1 rounded-full text-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span>System Active</span>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-700 px-3 py-1 rounded-full text-sm">
            <Bell size={14} />
            <span>3 New Alerts</span>
          </div>
          
          <div className="flex items-center gap-2 bg-blue-900 px-3 py-1 rounded-full text-sm">
            <Activity size={14} />
            <span>Command Center View</span>
          </div>
        </div>
        
        <button 
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav className={`${isMobileMenuOpen ? 'block absolute z-50 w-64 h-[calc(100%-3rem)]' : 'hidden'} md:block bg-slate-800 w-16 md:w-16 xl:w-64 border-r border-slate-700 flex-shrink-0`}>
          <div className="flex flex-col h-full">
            <div className="p-2 flex-1">
              <NavButton 
                icon={<Bell />} 
                label="Incidents" 
                isActive={activePanel === 'incidents'} 
                onClick={() => setActivePanel('incidents')}
                count={5}
                isUrgent={true}
              />
              
              <NavButton 
                icon={<Users />} 
                label="Force Deployment" 
                isActive={activePanel === 'forces'} 
                onClick={() => setActivePanel('forces')}
              />
              
              <NavButton 
                icon={<Activity />} 
                label="Resource Fatigue" 
                isActive={activePanel === 'resources'} 
                onClick={() => setActivePanel('resources')}
                count={2}
              />
              
              <NavButton 
                icon={<ArrowDownCircle />} 
                label="Event Detection" 
                isActive={activePanel === 'events'} 
                onClick={() => setActivePanel('events')}
                count={3}
              />
              
              <NavButton 
                icon={<LifeBuoy />} 
                label="Safe Zones" 
                isActive={activePanel === 'safezones'} 
                onClick={() => setActivePanel('safezones')}
              />
            </div>
            
            <div className="p-4 border-t border-slate-700 hidden xl:block">
              <div className="text-xs text-slate-500 mb-2">System Status</div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs">API Health</span>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs">Data Feed</span>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">Command Link</span>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left panel */}
          <div className="md:w-1/3 lg:w-1/4 bg-slate-800 p-4 md:max-h-screen md:overflow-auto">
            {renderPanel()}
          </div>
          
          {/* Map */}
          <div className="flex-1 relative">
            <MapView />
          </div>
        </div>
      </div>
    </div>
  );
};

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  count?: number;
  isUrgent?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, isActive, onClick, count, isUrgent }) => {
  return (
    <button
      className={`w-full flex items-center gap-3 mb-1 p-3 rounded-md ${
        isActive ? 'bg-blue-900 text-white' : 'text-slate-400 hover:bg-slate-700 hover:text-white'
      }`}
      onClick={onClick}
    >
      <div className="relative">
        {icon}
        {count && (
          <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs ${
            isUrgent ? 'bg-red-500 animate-pulse' : 'bg-blue-500'
          }`}>
            {count}
          </div>
        )}
      </div>
      <span className="hidden xl:block">{label}</span>
    </button>
  );
};

export default Dashboard;