export interface RsvpResponse {
  id: string;
  status: string | null;
  guest_name: string;
  email: string | null;
  phone_number: string | null;
  drink_preference: string | null;
  relationship: string | null;
  attending: boolean;
  message: string | null;
  created_at: string;
  updated_at: string;
}

export interface RsvpFormData {
  status: string;
  guest_name: string;
  email: string;
  phone_number: string;
  drink_preference: string;
  relationship: string;
  attending: boolean | null;
  message?: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface ProgramEvent {
  time: string;
  title: string;
  description: string;
  icon: string;
}
