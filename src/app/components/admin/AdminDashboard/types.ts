// Shared types for Admin Dashboard modules

export interface SectionProps {
  showAnnotations: boolean;
}

export interface Destination {
  id: number;
  name: string;
  category: string;
  price: string;
  status: 'active' | 'draft' | 'archived';
  image: string;
}

export interface StatCard {
  label: string;
  value: string;
  change: string;
  icon: any;
  color: string;
}

export interface CategoryDescription {
  id: string;
  category: string;
  description: string;
  icon: string;
}

export interface FilterLabel {
  id: string;
  key: string;
  label: string;
  category: string;
}

export interface DealMessage {
  id: string;
  type: string;
  message: string;
  active: boolean;
}

export interface TrendData {
  month: string;
  interests: number;
  saves: number;
  bookings: number;
}

export interface PopularDestination {
  name: string;
  interests: number;
  color: string;
}

export interface DealTrigger {
  id: string;
  type: string;
  threshold: number;
  discount: string;
  active: boolean;
}

export interface NotificationSchedule {
  id: string;
  type: string;
  time: string;
  frequency: string;
  active: boolean;
}
