import React, { useState } from 'react';
import { ArrowDownCircle, Filter, MapPin, AlertTriangle, MessageSquare, Search } from 'lucide-react';
import { useIncidents } from '../../contexts/IncidentContext';

const EventDetectionPanel: React.FC = () => {
  const { addIncident } = useIncidents();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock social media events
  const socialEvents = [
    {
      id: 's1',
      source: 'Twitter',
      text: '#BangaloreFlood Water logging on Outer Ring Road near Bellandur. Traffic at standstill. @blrcitytraffic',
      timestamp: '12 mins ago',
      verified: true,
      location: 'Bellandur',
      coordinates: { lat: 12.9257, lng: 77.6681 },
      severity: 'medium',
    },
    {
      id: 's2',
      source: 'WhatsApp',
      text: 'Fire spotted at commercial building in Indranagar 100ft road. Smoke visible from CMH Road.',
      timestamp: '5 mins ago',
      verified: false,
      location: 'Indiranagar',
      coordinates: { lat: 12.9784, lng: 77.6408 },
      severity: 'high',
    },
    {
      id: 's3',
      source: 'Twitter',
      text: 'Protests building at Town Hall. Around 200 people gathered. Police presence requested. #BengaluruProtests',
      timestamp: '28 mins ago',
      verified: true,
      location: 'Town Hall',
      coordinates: { lat: 12.9667, lng: 77.5667 },
      severity: 'medium',
    },
    {
      id: 's4',
      source: 'Emergency Line',
      text: 'Multiple cars collided on Nice Road near entrance. Traffic backing up. Request immediate assistance.',
      timestamp: '3 mins ago',
      verified: true,
      location: 'Nice Road',
      coordinates: { lat: 12.9150, lng: 77.4751 },
      severity: 'high',
    },
    {
      id: 's5',
      source: 'Twitter',
      text: 'Metro service interrupted at MG Road station. Large crowd gathering. #NammaMetro @OfficialBMRCL',
      timestamp: '17 mins ago',
      verified: false,
      location: 'MG Road',
      coordinates: { lat: 12.9757, lng: 77.6194 },
      severity: 'low',
    },
  ];
  
  // Filter events based on search query
  const filteredEvents = socialEvents.filter(event => 
    event.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.source.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleCreateIncident = (event: any) => {
    addIncident({
      id: `gen-${Math.random().toString(36).substr(2, 9)}`,
      type: event.text.length > 30 ? `${event.text.substring(0, 30)}...` : event.text,
      severity: event.severity,
      location: event.location,
      coordinates: event.coordinates,
      timeReported: 'Just now',
      status: 'new',
      description: event.text,
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <ArrowDownCircle size={18} />
          Event Detection
        </h2>
      </div>
      
      {/* Search */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search events, locations, sources..."
          className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 pl-9 pr-4 text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-slate-700 rounded p-2 text-center">
          <div className="text-lg font-bold">{socialEvents.length}</div>
          <div className="text-xs text-slate-400">New Events</div>
        </div>
        <div className="bg-slate-700 rounded p-2 text-center">
          <div className="text-lg font-bold">3</div>
          <div className="text-xs text-slate-400">Verified</div>
        </div>
        <div className="bg-slate-700 rounded p-2 text-center">
          <div className="text-lg font-bold">2</div>
          <div className="text-xs text-slate-400">High Priority</div>
        </div>
      </div>
      
      {/* Event List */}
      <div className="flex-1 overflow-auto pr-2">
        <div className="space-y-3">
          {filteredEvents.length === 0 ? (
            <div className="text-center text-slate-400 py-6">
              <MessageSquare size={24} className="mx-auto mb-2 opacity-60" />
              <p>No events match your search</p>
            </div>
          ) : (
            filteredEvents.map(event => (
              <div key={event.id} className={`bg-slate-700 rounded-lg p-3 ${
                event.severity === 'high' ? 'border-l-4 border-red-500' : 
                event.severity === 'medium' ? 'border-l-4 border-yellow-500' : ''
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`text-xs px-2 py-0.5 rounded-full ${
                      event.source === 'Twitter' ? 'bg-blue-500/20 text-blue-300' :
                      event.source === 'WhatsApp' ? 'bg-green-500/20 text-green-300' :
                      'bg-purple-500/20 text-purple-300'
                    }`}>
                      {event.source}
                    </div>
                    {event.verified && (
                      <div className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">
                        Verified
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-slate-400">
                    {event.timestamp}
                  </div>
                </div>
                
                <div className="text-sm mb-2">{event.text}</div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-slate-400">
                    <MapPin size={12} className="mr-1" />
                    {event.location}
                  </div>
                  
                  <button
                    className="text-xs bg-blue-700 hover:bg-blue-600 px-2 py-1 rounded"
                    onClick={() => handleCreateIncident(event)}
                  >
                    Create Incident
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Sources Info */}
      <div className="mt-4 border-t border-slate-700 pt-3 text-xs text-slate-400">
        <div className="flex justify-between items-center">
          <span>Sources: Twitter, WhatsApp, Emergency Lines</span>
          <button className="text-blue-400 hover:text-blue-300">Refresh</button>
        </div>
      </div>
    </div>
  );
};

export default EventDetectionPanel;