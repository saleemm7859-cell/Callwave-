export enum UserRole {
  OPERATOR = 'OPERATOR',
  ADMIN = 'ADMIN'
}

export type ViewState = 'LOGIN' | 'DASHBOARD' | 'ADMIN' | 'HISTORY' | 'SETTINGS';

export interface Operator {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'ON DUTY' | 'OFF DUTY';
  avatar?: string;
}

export interface ShiftEntry {
  id: string;
  operatorId: string;
  operatorName: string;
  date: string;
  clockIn: string;
  clockOut: string | 'ACTIVE';
  breakTotal: string;
  netHours: string;
}

export interface HistoryEntry {
  date: string;
  timeframe: string;
  netHours: string;
  status: 'Approved' | 'Pending' | 'Flagged';
}

export interface ClockSettings {
  clock1Zone: string;
  clock1Label: string;
  clock2Zone: string;
  clock2Label: string;
}
