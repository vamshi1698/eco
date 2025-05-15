import { Force, Division } from '../types/forces';

// Generate mock force units
export const generateMockForces = (count = 15): Force[] => {
  const forces: Force[] = [];
  
  // Force types
  const forceTypes = ['police', 'fire', 'medical', 'disaster'];
  
  // Division IDs (will match with divisions generated below)
  const divisionIds = ['north', 'south', 'east', 'west', 'central'];
  
  // Bengaluru police station names for realism
  const stationPrefixes = [
    'Koramangala', 'Indiranagar', 'Whitefield', 'MG Road', 'Jayanagar',
    'JP Nagar', 'HSR Layout', 'Banashankari', 'Electronic City', 'Hebbal',
    'Yeshwanthpur', 'Marathahalli', 'Vijayanagar', 'Malleswaram', 'RT Nagar'
  ];
  
  for (let i = 0; i < count; i++) {
    const forceType = forceTypes[Math.floor(Math.random() * forceTypes.length)];
    const divisionId = divisionIds[Math.floor(Math.random() * divisionIds.length)];
    const stationPrefix = stationPrefixes[Math.floor(Math.random() * stationPrefixes.length)];
    
    // Generate name based on type
    let name = '';
    if (forceType === 'police') {
      name = `${stationPrefix} Police Unit ${Math.floor(Math.random() * 10) + 1}`;
    } else if (forceType === 'fire') {
      name = `${stationPrefix} Fire Brigade ${String.fromCharCode(65 + Math.floor(Math.random() * 6))}`;
    } else if (forceType === 'medical') {
      name = `Emergency Medical Team ${Math.floor(Math.random() * 10) + 1}`;
    } else {
      name = `NDRF Team ${String.fromCharCode(65 + Math.floor(Math.random() * 6))}`;
    }
    
    // Generate force data
    const force: Force = {
      id: `force-${Math.random().toString(36).substr(2, 9)}`,
      name,
      type: forceType,
      divisionId,
      personnel: Math.floor(Math.random() * 10) + 3, // 3-12 personnel per unit
      status: Math.random() > 0.3 ? 'available' : 'deployed', // 70% available, 30% deployed
      homeBase: `${stationPrefix} Station`,
      location: Math.random() > 0.3 ? `${stationPrefix} Station` : 'Deployed', // Most at home base
    };
    
    // If deployed, add incident info
    if (force.status === 'deployed') {
      force.incident = `inc-${Math.random().toString(36).substr(2, 9)}`;
      
      // Random deployed time
      const times = ['10 mins ago', '25 mins ago', '1 hour ago', '3 hours ago'];
      force.deployedTime = times[Math.floor(Math.random() * times.length)];
    }
    
    forces.push(force);
  }
  
  return forces;
};

// Generate mock divisions (zones)
export const generateMockDivisions = (): Division[] => {
  // Bengaluru's actual police divisions
  return [
    {
      id: 'north',
      name: 'North Division',
      commandCenter: 'Hebbal Command Center',
      capacity: 800,
      fatigueLevel: Math.floor(Math.random() * 100),
      activeTime: `${Math.floor(Math.random() * 12) + 1}h`,
      callsHandled: Math.floor(Math.random() * 50) + 10,
      urgentNeed: Math.random() > 0.8
    },
    {
      id: 'south',
      name: 'South Division',
      commandCenter: 'Jayanagar Command Center',
      capacity: 750,
      fatigueLevel: Math.floor(Math.random() * 100),
      activeTime: `${Math.floor(Math.random() * 12) + 1}h`,
      callsHandled: Math.floor(Math.random() * 50) + 10,
      urgentNeed: Math.random() > 0.8
    },
    {
      id: 'east',
      name: 'East Division',
      commandCenter: 'Whitefield Command Center',
      capacity: 720,
      fatigueLevel: Math.floor(Math.random() * 100),
      activeTime: `${Math.floor(Math.random() * 12) + 1}h`,
      callsHandled: Math.floor(Math.random() * 50) + 10,
      urgentNeed: Math.random() > 0.8
    },
    {
      id: 'west',
      name: 'West Division',
      commandCenter: 'Vijayanagar Command Center',
      capacity: 680,
      fatigueLevel: Math.floor(Math.random() * 100),
      activeTime: `${Math.floor(Math.random() * 12) + 1}h`,
      callsHandled: Math.floor(Math.random() * 50) + 10,
      urgentNeed: Math.random() > 0.8
    },
    {
      id: 'central',
      name: 'Central Division',
      commandCenter: 'MG Road Command Center',
      capacity: 900,
      fatigueLevel: Math.floor(Math.random() * 100),
      activeTime: `${Math.floor(Math.random() * 12) + 1}h`,
      callsHandled: Math.floor(Math.random() * 50) + 10,
      urgentNeed: Math.random() > 0.8
    }
  ];
};