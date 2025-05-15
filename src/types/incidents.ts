export interface Incident {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high';
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  timeReported: string;
  status: 'new' | 'in-progress' | 'resolved' | 'closed';
  description?: string;
}