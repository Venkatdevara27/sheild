import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Device, Alert, NetworkLog, SystemMetrics } from '../types';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  devices: Device[];
  alerts: Alert[];
  logs: NetworkLog[];
  metrics: SystemMetrics;
  addDevice: (device: Omit<Device, 'id'>) => void;
  updateDevice: (id: string, updates: Partial<Device>) => void;
  removeDevice: (id: string) => void;
  markAlertAsRead: (id: string) => void;
  clearAllAlerts: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data
const mockDevices: Device[] = [
  {
    id: '1',
    name: 'Main Gateway RPi',
    type: 'raspberry-pi',
    location: 'Server Room A',
    ipAddress: '192.168.1.100',
    macAddress: 'B8:27:EB:12:34:56',
    status: 'online',
    lastSeen: new Date(),
    threatLevel: 'low',
    firmwareVersion: '1.2.3',
  },
  {
    id: '2',
    name: 'Sensor Node ESP32',
    type: 'esp32',
    location: 'Building Entrance',
    ipAddress: '192.168.1.101',
    macAddress: '30:AE:A4:78:90:12',
    status: 'under_attack',
    lastSeen: new Date(Date.now() - 300000),
    threatLevel: 'critical',
    batteryLevel: 85,
    firmwareVersion: '2.1.0',
  },
  {
    id: '3',
    name: 'Security Camera Hub',
    type: 'other',
    location: 'Parking Lot',
    ipAddress: '192.168.1.102',
    macAddress: '00:11:22:33:44:55',
    status: 'offline',
    lastSeen: new Date(Date.now() - 1800000),
    threatLevel: 'medium',
    firmwareVersion: '3.0.1',
  },
];

const mockAlerts: Alert[] = [
  {
    id: '1',
    deviceId: '2',
    deviceName: 'Sensor Node ESP32',
    type: 'intrusion',
    severity: 'critical',
    title: 'DDoS Attack Detected',
    description: 'Multiple connection attempts from suspicious IP addresses',
    timestamp: new Date(Date.now() - 300000),
    isRead: false,
    sourceIp: '10.0.0.1',
    targetIp: '192.168.1.101',
    attackVector: 'Network Flooding',
  },
  {
    id: '2',
    deviceId: '1',
    deviceName: 'Main Gateway RPi',
    type: 'anomaly',
    severity: 'warning',
    title: 'Unusual Network Pattern',
    description: 'Abnormal traffic pattern detected on port 8080',
    timestamp: new Date(Date.now() - 600000),
    isRead: false,
    sourceIp: '192.168.1.50',
    targetIp: '192.168.1.100',
  },
  {
    id: '3',
    deviceId: '3',
    deviceName: 'Security Camera Hub',
    type: 'system',
    severity: 'info',
    title: 'Device Offline',
    description: 'Device has not responded for 30 minutes',
    timestamp: new Date(Date.now() - 1800000),
    isRead: true,
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [devices, setDevices] = useState<Device[]>(mockDevices);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [logs] = useState<NetworkLog[]>([]);
  const [metrics] = useState<SystemMetrics>({
    cpuUsage: 45,
    memoryUsage: 67,
    networkLatency: 12,
    deviceCount: devices.length,
    activeThreats: alerts.filter(a => a.severity === 'critical').length,
    alertsLast24h: alerts.length,
  });

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const addDevice = (device: Omit<Device, 'id'>) => {
    const newDevice: Device = {
      ...device,
      id: Date.now().toString(),
    };
    setDevices(prev => [...prev, newDevice]);
  };

  const updateDevice = (id: string, updates: Partial<Device>) => {
    setDevices(prev => prev.map(device => 
      device.id === id ? { ...device, ...updates } : device
    ));
  };

  const removeDevice = (id: string) => {
    setDevices(prev => prev.filter(device => device.id !== id));
  };

  const markAlertAsRead = (id: string) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === id ? { ...alert, isRead: true } : alert
    ));
  };

  const clearAllAlerts = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, isRead: true })));
  };

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      devices,
      alerts,
      logs,
      metrics,
      addDevice,
      updateDevice,
      removeDevice,
      markAlertAsRead,
      clearAllAlerts,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}