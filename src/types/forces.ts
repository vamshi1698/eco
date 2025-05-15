export interface Force {
  id: string;
  name: string;
  type: 'police' | 'fire' | 'medical' | 'disaster';
  divisionId: string;
  personnel: number;
  status: 'available' | 'deployed' | 'maintenance';
  homeBase: string;
  location: string;
  incident?: string;
  deployedTime?: string;
}

export interface Division {
  id: string;
  name: string;
  commandCenter: string;
  capacity: number;
  fatigueLevel?: number;
  activeTime?: string;
  callsHandled?: number;
  urgentNeed?: boolean;
}