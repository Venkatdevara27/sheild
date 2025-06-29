export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  avatar?: string;
  lastLogin?: Date;
  isActive: boolean;
}

export interface Device {
  id: string;
  name: string;
  type: 'raspberry-pi' | 'esp32' | 'other';
  location: string;
  ipAddress: string;
  macAddress: string;
  status: 'online' | 'offline' | 'under_attack' | 'maintenance';
  lastSeen: Date;
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  batteryLevel?: number;
  firmwareVersion: string;
}

export interface Alert {
  id: string;
  deviceId: string;
  deviceName: string;
  type: 'intrusion' | 'anomaly' | 'system' | 'network';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  description: string;
  timestamp: Date;
  isRead: boolean;
  sourceIp?: string;
  targetIp?: string;
  attackVector?: string;
}

export interface NetworkLog {
  id: string;
  deviceId: string;
  timestamp: Date;
  sourceIp: string;
  targetIp: string;
  protocol: string;
  port: number;
  classification: 'normal' | 'malicious';
  confidence: number;
  packetSize: number;
}

export interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: number;
  networkLatency: number;
  deviceCount: number;
  activeThreats: number;
  alertsLast24h: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}