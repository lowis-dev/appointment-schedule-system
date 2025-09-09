export interface Appointment {
  id: string;
  name: string;
  service: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface CalendarDay {
  date: Date;
  isToday: boolean;
  isAvailable: boolean;
  appointmentCount: number;
}

export type ServiceType = 
  | 'Adjustment'
  | 'Cleaning' 
  | 'Consultation'
  | 'Follow-up'
  | 'Emergency';