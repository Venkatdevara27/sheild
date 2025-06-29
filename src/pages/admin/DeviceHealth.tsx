import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Battery, Cpu, HardDrive, Thermometer, Wifi, WifiOff, Shield, ShieldAlert, AlertTriangle, CheckCircle, Clock, RefreshCw, Download, Filter, Search, TrendingUp, TrendingDown, Zap, Power, Settings, PenTool as Tool, Heart, Eye, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';

interface DeviceHealthData {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'healthy' | 'warning' | 'critical' | 'offline';
  uptime: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  temperature: number;
  batteryLevel?: number;
  networkLatency: number;
  lastUpdate: Date;
  healthScore: number;
  issues: string[];
  metrics: Array<{
    timestamp: Date;
    cpu: number;
    memory: number;
    temperature: number;
  }>;
}

const mockHealthData: DeviceHealthData[] = [
  {
    id: '1',
    name: 'Main Gateway RPi',
    type: 'Raspberry Pi',
    location: 'Server Room A',
    status: 'healthy',
    uptime: 99.8,
    cpuUsage: 45,
    memoryUsage: 67,
    diskUsage: 34,
    temperature: 42,
    networkLatency: 12,
    lastUpdate: new Date(),
    healthScore: 95,
    issues: [],
    metrics: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 3600000),
      cpu: 40 + Math.random() * 20,
      memory: 60 + Math.random() * 15,
      temperature: 40 + Math.random() * 10,
    })),
  },
  {
    id: '2',
    name: 'Sensor Node ESP32',
    type: 'ESP32',
    location: 'Building Entrance',
    status: 'warning',
    uptime: 97.2,
    cpuUsage: 78,
    memoryUsage: 89,
    diskUsage: 45,
    temperature: 65,
    batteryLevel: 23,
    networkLatency: 45,
    lastUpdate: new Date(Date.now() - 300000),
    healthScore: 72,
    issues: ['High CPU usage', 'Low battery', 'High temperature'],
    metrics: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 3600000),
      cpu: 70 + Math.random() * 20,
      memory: 80 + Math.random() * 15,
      temperature: 60 + Math.random() * 15,
    })),
  },
  {
    id: '3',
    name: 'Security Camera Hub',
    type: 'IP Camera',
    location: 'Parking Lot',
    status: 'critical',
    uptime: 85.4,
    cpuUsage: 95,
    memoryUsage: 98,
    diskUsage: 92,
    temperature: 78,
    networkLatency: 120,
    lastUpdate: new Date(Date.now() - 1800000),
    healthScore: 35,
    issues: ['Critical CPU usage', 'Memory exhausted', 'Disk almost full', 'Overheating'],
    metrics: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 3600000),
      cpu: 90 + Math.random() * 10,
      memory: 95 + Math.random() * 5,
      temperature: 75 + Math.random() * 10,
    })),
  },
];

function DeviceHealth() {
  const [devices, setDevices] = useState<DeviceHealthData[]>(mockHealthData);
  const [selectedDevice, setSelectedDevice] = useState<DeviceHealthData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [timeRange, setTimeRange] = useState('24h');

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'success';
      case 'warning': return 'warning';
      case 'critical': return 'error';
      case 'offline': return 'default';
      default: return 'default';
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return 'success';
    if (score >= 70) return 'warning';
    return 'error';
  };

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || device.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const overallStats = {
    totalDevices: devices.length,
    healthyDevices: devices.filter(d => d.status === 'healthy').length,
    warningDevices: devices.filter(d => d.status === 'warning').length,
    criticalDevices: devices.filter(d => d.status === 'critical').length,
    offlineDevices: devices.filter(d => d.status === 'offline').length,
    avgHealthScore: Math.round(devices.reduce((sum, d) => sum + d.healthScore, 0) / devices.length),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
            Device Health Monitor
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Real-time health monitoring and diagnostics for all devices
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
          </select>
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overall Health Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Total Devices
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {overallStats.totalDevices}
              </p>
            </div>
            <Activity className="w-8 h-8 text-primary-600" />
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Healthy
              </p>
              <p className="text-2xl font-bold text-success-600">
                {overallStats.healthyDevices}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-success-600" />
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Warning
              </p>
              <p className="text-2xl font-bold text-warning-600">
                {overallStats.warningDevices}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-warning-600" />
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Critical
              </p>
              <p className="text-2xl font-bold text-error-600">
                {overallStats.criticalDevices}
              </p>
            </div>
            <ShieldAlert className="w-8 h-8 text-error-600" />
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Offline
              </p>
              <p className="text-2xl font-bold text-neutral-500">
                {overallStats.offlineDevices}
              </p>
            </div>
            <WifiOff className="w-8 h-8 text-neutral-500" />
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Avg Health
              </p>
              <p className={`text-2xl font-bold ${
                overallStats.avgHealthScore >= 90 ? 'text-success-600' :
                overallStats.avgHealthScore >= 70 ? 'text-warning-600' : 'text-error-600'
              }`}>
                {overallStats.avgHealthScore}%
              </p>
            </div>
            <Heart className="w-8 h-8 text-primary-600" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card variant="glass" className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Search devices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-neutral-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Status</option>
                <option value="healthy">Healthy</option>
                <option value="warning">Warning</option>
                <option value="critical">Critical</option>
                <option value="offline">Offline</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Device Health Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDevices.map((device, index) => (
          <motion.div
            key={device.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card 
              variant="glass" 
              hover 
              className="p-6 cursor-pointer"
              onClick={() => setSelectedDevice(device)}
            >
              {/* Device Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white">
                    {device.name}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {device.type} • {device.location}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getStatusColor(device.status)} size="sm">
                    {device.status}
                  </Badge>
                </div>
              </div>

              {/* Health Score */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    Health Score
                  </span>
                  <span className={`text-lg font-bold ${
                    device.healthScore >= 90 ? 'text-success-600' :
                    device.healthScore >= 70 ? 'text-warning-600' : 'text-error-600'
                  }`}>
                    {device.healthScore}%
                  </span>
                </div>
                <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      device.healthScore >= 90 ? 'bg-success-500' :
                      device.healthScore >= 70 ? 'bg-warning-500' : 'bg-error-500'
                    }`}
                    style={{ width: `${device.healthScore}%` }}
                  />
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-neutral-500" />
                  <div>
                    <p className="text-xs text-neutral-500">CPU</p>
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">
                      {device.cpuUsage}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <HardDrive className="w-4 h-4 text-neutral-500" />
                  <div>
                    <p className="text-xs text-neutral-500">Memory</p>
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">
                      {device.memoryUsage}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Thermometer className="w-4 h-4 text-neutral-500" />
                  <div>
                    <p className="text-xs text-neutral-500">Temp</p>
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">
                      {device.temperature}°C
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Wifi className="w-4 h-4 text-neutral-500" />
                  <div>
                    <p className="text-xs text-neutral-500">Latency</p>
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">
                      {device.networkLatency}ms
                    </p>
                  </div>
                </div>
              </div>

              {/* Battery Level (if applicable) */}
              {device.batteryLevel !== undefined && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Battery className="w-4 h-4 text-neutral-500" />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        Battery
                      </span>
                    </div>
                    <span className={`text-sm font-medium ${
                      device.batteryLevel > 50 ? 'text-success-600' :
                      device.batteryLevel > 20 ? 'text-warning-600' : 'text-error-600'
                    }`}>
                      {device.batteryLevel}%
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        device.batteryLevel > 50 ? 'bg-success-500' :
                        device.batteryLevel > 20 ? 'bg-warning-500' : 'bg-error-500'
                      }`}
                      style={{ width: `${device.batteryLevel}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Issues */}
              {device.issues.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-neutral-900 dark:text-white mb-2">
                    Issues ({device.issues.length})
                  </p>
                  <div className="space-y-1">
                    {device.issues.slice(0, 2).map((issue, idx) => (
                      <p key={idx} className="text-xs text-error-600 bg-error-50 dark:bg-error-900/20 px-2 py-1 rounded">
                        {issue}
                      </p>
                    ))}
                    {device.issues.length > 2 && (
                      <p className="text-xs text-neutral-500">
                        +{device.issues.length - 2} more issues
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  Details
                </Button>
                <Button variant="outline" size="sm">
                  <Tool className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Device Details Modal */}
      {selectedDevice && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedDevice(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-neutral-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          >
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                    {selectedDevice.name}
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {selectedDevice.type} • {selectedDevice.location}
                  </p>
                </div>
                <Button variant="ghost" onClick={() => setSelectedDevice(null)}>
                  ×
                </Button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Metrics Chart */}
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                    Performance Metrics (24h)
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={selectedDevice.metrics}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis 
                        dataKey="timestamp" 
                        tickFormatter={(value) => new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleString()}
                      />
                      <Line type="monotone" dataKey="cpu" stroke="#3b82f6" name="CPU %" />
                      <Line type="monotone" dataKey="memory" stroke="#10b981" name="Memory %" />
                      <Line type="monotone" dataKey="temperature" stroke="#f59e0b" name="Temperature °C" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Detailed Metrics */}
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                    Current Status
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Cpu className="w-5 h-5 text-primary-600" />
                          <span className="font-medium">CPU Usage</span>
                        </div>
                        <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                          {selectedDevice.cpuUsage}%
                        </p>
                      </div>
                      <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <HardDrive className="w-5 h-5 text-success-600" />
                          <span className="font-medium">Memory</span>
                        </div>
                        <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                          {selectedDevice.memoryUsage}%
                        </p>
                      </div>
                      <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Thermometer className="w-5 h-5 text-warning-600" />
                          <span className="font-medium">Temperature</span>
                        </div>
                        <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                          {selectedDevice.temperature}°C
                        </p>
                      </div>
                      <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="w-5 h-5 text-info-600" />
                          <span className="font-medium">Uptime</span>
                        </div>
                        <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                          {selectedDevice.uptime}%
                        </p>
                      </div>
                    </div>

                    {/* Issues */}
                    {selectedDevice.issues.length > 0 && (
                      <div>
                        <h4 className="font-medium text-neutral-900 dark:text-white mb-2">
                          Active Issues
                        </h4>
                        <div className="space-y-2">
                          {selectedDevice.issues.map((issue, idx) => (
                            <div key={idx} className="flex items-center space-x-2 p-2 bg-error-50 dark:bg-error-900/20 rounded">
                              <AlertTriangle className="w-4 h-4 text-error-600" />
                              <span className="text-sm text-error-700 dark:text-error-300">
                                {issue}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default DeviceHealth;