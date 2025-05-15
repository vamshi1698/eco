import { Incident } from '../types/incidents';

// Bengaluru-specific locations
const bengaluruLocations = [
  'Koramangala', 'Indiranagar', 'MG Road', 'Whitefield', 'Electronic City',
  'JP Nagar', 'Jayanagar', 'BTM Layout', 'HSR Layout', 'Bannerghatta Road',
  'Hebbal', 'Yeshwanthpur', 'Marathahalli', 'Bellandur', 'Richmond Road',
  'Malleshwaram', 'Basavanagudi', 'Rajajinagar', 'Shivajinagar', 'Ulsoor'
];

// Bengaluru-specific incident types
const incidentTypes = [
  'Traffic Accident', 'Road Blockage', 'Protest Gathering', 'Fire Incident',
  'Flooding', 'Building Collapse', 'Medical Emergency', 'Power Outage',
  'Public Disturbance', 'VIP Movement', 'Civil Unrest', 'Terrorist Threat',
  'Water Shortage', 'Metro Disruption', 'Gas Leak', 'Tree Fall',
  'Marathon Event', 'Tech Conference', 'Election Rally', 'Religious Procession'
];

// Severity levels
const severityLevels = ['low', 'medium', 'high'];

// Status options
const statusOptions = ['new', 'in-progress', 'resolved', 'closed'];

// Generate random incidents
export const generateMockIncidents = (count = 8): Incident[] => {
  const incidents: Incident[] = [];
  
  for (let i = 0; i < count; i++) {
    const severity = severityLevels[Math.floor(Math.random() * severityLevels.length)];
    const location = bengaluruLocations[Math.floor(Math.random() * bengaluruLocations.length)];
    const type = incidentTypes[Math.floor(Math.random() * incidentTypes.length)];
    
    // More realistic time reporting
    const times = ['2 mins ago', '5 mins ago', '12 mins ago', '25 mins ago', '1 hour ago'];
    const timeReported = times[Math.floor(Math.random() * times.length)];
    
    // Weighted status based on time (newer incidents more likely to be new)
    let status;
    const statusRandom = Math.random();
    if (timeReported.includes('mins')) {
      status = statusRandom < 0.7 ? 'new' : (statusRandom < 0.9 ? 'in-progress' : 'resolved');
    } else {
      status = statusRandom < 0.3 ? 'new' : (statusRandom < 0.8 ? 'in-progress' : 'resolved');
    }
    
    // Generate description based on incident type
    let description = '';
    if (type === 'Traffic Accident') {
      description = `Multiple vehicle collision reported on ${location} main road. ${Math.floor(Math.random() * 5) + 2} vehicles involved. Traffic backing up rapidly.`;
    } else if (type === 'Protest Gathering') {
      description = `Approximately ${Math.floor(Math.random() * 200) + 50} protesters gathered at ${location}. Peaceful demonstration but growing in numbers.`;
    } else if (type === 'Fire Incident') {
      description = `Fire reported in commercial building at ${location}. ${Math.floor(Math.random() * 3) + 1} fire engines dispatched. Evacuation in progress.`;
    } else if (type === 'Flooding') {
      description = `Flash flooding reported in ${location} following heavy rainfall. Roads submerged to approximately ${Math.floor(Math.random() * 2) + 1} feet. Vehicle movement restricted.`;
    } else {
      description = `Incident reported at ${location}. Units dispatched to assess the situation.`;
    }
    
    incidents.push({
      id: `inc-${Math.random().toString(36).substr(2, 9)}`,
      type,
      severity,
      location,
      coordinates: {
        lat: 12.9716 + (Math.random() * 0.1 - 0.05),
        lng: 77.5946 + (Math.random() * 0.1 - 0.05)
      },
      timeReported,
      status,
      description
    });
  }
  
  return incidents;
};