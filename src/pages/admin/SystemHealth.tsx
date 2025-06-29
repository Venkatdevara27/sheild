import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Monitor,
  Cpu,
  HardDrive,
  MemoryStick,
  Thermometer,
  Zap,
  Activity,
  Server,
  Database,
  Network,
  Shield,
  Clock,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Gauge,
  Power,
  Wifi,
  Cloud,
  Settings,
  Eye,
  Download,
  BarChart3,
  PieChart,
  LineChart,
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

interface SystemComponent {
  id: string;
  name: string;
  category: 'compute' | 'storage' | 'network' | 'security' | 'database' | 'application';
  status: 'optimal' | 'good' | 'warning' | 'critical' | 'offline';
  health: number;
  uptime: number;
  load: number;
  temperature?: number;
  memoryUsage?: number;
  diskUsage?: number;
  networkLatency?: number;
  lastUpdate: Date;
  metrics: Array<{
    timestamp: Date;
    value: number;
    load: number;
    temperature?: number;
  }>;
  alerts: string[];
}

const mockSystemComponents: SystemComponent[] = [
  {
    id: '1',
    name: 'AI Processing Engine',
    category: 'compute',
    status: 'optimal',
    health: 98,
    uptime: 99.9,
    load: 45,
    temperature: 42,
    memoryUsage: 67,
    lastUpdate: new Date(),
    metrics: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 3600000),
      value: 95 + Math.random() * 5,
      load: 40 + Math.random() * 20,
      temperature: 40 + Math.random() * 10,
    })),
    alerts: [],
  },
  {
    id: '2',
    name: 'Primary Database',
    category: 'database',
    status: 'good',
    health: 94,
    uptime: 99.8,
    load: 67,
    diskUsage: 78,
    memoryUsage: 82,
    lastUpdate: new Date(),
    metrics: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 3600000),
      value: 90 + Math.random() * 8,
      load: 60 + Math.random() * 20,
    })),
    alerts: ['High memory usage detected'],
  },
  {
    id: '3',
    name: 'Network Infrastructure',
    category: 'network',
    status: 'optimal',
    health: 97,
    uptime: 99.9,
    load: 34,
    networkLatency: 12,
    lastUpdate: new Date(),
    metrics: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 3600000),
      value: 95 + Math.random() * 5,
      load: 30 + Math.random() * 15,
    })),
    alerts: [],
  },
  {
    id: '4',
    name: 'Security Engine',
    category: 'security',
    status: 'optimal',
    health: 99,
    uptime: 100,
    load: 52,
    temperature: 40,
    memoryUsage: 45,
    lastUpdate: new Date(),
    metrics: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 3600000),
      value: 98 + Math.random() * 2,
      load: 45 + Math.random() * 15,
      temperature: 38 + Math.random() * 8,
    })),
    alerts: [],
  },
  {
    id: '5',
    name: 'Storage System',
    category: 'storage',
    status: 'warning',
    health: 89,
    uptime: 99.5,
    load: 78,
    diskUsage: 85,
    temperature: 45,
    lastUpdate: new Date(),
    metrics: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 3600000),
      value: 85 + Math.random() * 10,
      load: 70 + Math.random() * 20,
      temperature: 42 + Math.random() * 8,
    })),
    alerts: ['Disk usage above 80%', 'Temperature elevated'],
  },
  {
    id: '6',
    name: 'Analytics Engine',
    category: 'application',
    status: 'good',
    health: 96,
    uptime: 99.7,
    load: 61,
    memoryUsage: 73,
    lastUpdate: new Date(),
    metrics: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 3600000),
      value: 93 + Math.random() * 7,
      load: 55 + Math.random() * 20,
    })),
    alerts: [],
  },
];

const resourceUsageData = Array.from({ length: 24 }, (_, i) => ({
  time: new Date(Date.now() - (23 - i) * 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  cpu: 40 + Math.random() * 30,
  memory: 50 + Math.random() * 25,
  disk: 30 + Math.random() * 20,
  network: 20 + Math.random() * 15,
}));

const systemDistribution = [
  { name: 'Optimal', value: 3, color: '#22c55e' },
  { name: 'Good', value: 2, color: '#3b82f6' },
  { name: 'Warning', value: 1, color: '#f59e0b' },
  { name: 'Critical', value: 0, color: '#ef4444' },
];

function SystemHealth() {
  const [components, setComponents] = useState<SystemComponent[]>(mockSystemComponents);
  const [selectedComponent, setSelectedComponent] = useState<SystemComponent | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState('24h');

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'success';
      case 'good': return 'info';
      case 'warning': return 'warning';
      case 'critical': return 'error';
      case 'offline': return 'default';
      default: return 'default';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'compute': return Cpu;
      case 'storage': return HardDrive;
      case 'network': return Network;
      case 'security': return Shield;
      case 'database': return Database;
      case 'application': return Server;
      default: return Monitor;
    }
  };

  const overallStats = {
    totalComponents: components.length,
    optimalComponents: components.filter(c => c.status === 'optimal').length,
    warningComponents: components.filter(c => c.status === 'warning').length,
    criticalComponents: components.filter(c => c.status === 'critical').length,
    avgHealth: Math.round(components.reduce((sum, c) => sum + c.health, 0) / components.length),
    avgUptime: Math.round(components.reduce((sum, c) => sum + c.uptime, 0) / components.length * 10) / 10,
    totalAlerts: components.reduce((sum, c) => sum + c.alerts.length, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
            System Health Monitor
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Real-time monitoring of all system components and infrastructure
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
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-6">
        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Components
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {overallStats.totalComponents}
              </p>
            </div>
            <Monitor className="w-8 h-8 text-primary-600" />
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Optimal
              </p>
              <p className="text-2xl font-bold text-success-600">
                {overallStats.optimalComponents}
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
                {overallStats.warningComponents}
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
                {overallStats.criticalComponents}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-error-600" />
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Avg Health
              </p>
              <p className={`text-2xl font-bold ${
                overallStats.avgHealth >= 95 ? 'text-success-600' :
                overallStats.avgHealth >= 80 ? 'text-warning-600' : 'text-error-600'
              }`}>
                {overallStats.avgHealth}%
              </p>
            </div>
            <Gauge className="w-8 h-8 text-primary-600" />
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Avg Uptime
              </p>
              <p className="text-2xl font-bold text-success-600">
                {overallStats.avgUptime}%
              </p>
            </div>
            <Clock className="w-8 h-8 text-success-600" />
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Active Alerts
              </p>
              <p className="text-2xl font-bold text-accent-600">
                {overallStats.totalAlerts}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-accent-600" />
          </div>
        </Card>
      </div>

      {/* Resource Usage Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card variant="glass" className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
              Resource Usage (24h)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={resourceUsageData}>
                <defs>
                  <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="memoryGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="diskGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="cpu"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="url(#cpuGradient)"
                  name="CPU %"
                />
                <Area
                  type="monotone"
                  dataKey="memory"
                  stackId="1"
                  stroke="#10b981"
                  fill="url(#memoryGradient)"
                  name="Memory %"
                />
                <Area
                  type="monotone"
                  dataKey="disk"
                  stackId="1"
                  stroke="#f59e0b"
                  fill="url(#diskGradient)"
                  name="Disk %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card variant="glass" className="p-6">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            System Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={systemDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {systemDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {systemDistribution.map((entry) => (
              <div key={entry.name} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {entry.name}: {entry.value}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* System Components */}
      <Card variant="glass" className="p-6">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
          System Components
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((component, index) => {
            const Icon = getCategoryIcon(component.category);
            return (
              <motion.div
                key={component.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card 
                  variant="glass" 
                  hover 
                  className="p-6 cursor-pointer"
                  onClick={() => setSelectedComponent(component)}
                >
                  {/* Component Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${
                        component.status === 'optimal' ? 'from-success-500 to-success-600' :
                        component.status === 'good' ? 'from-info-500 to-info-600' :
                        component.status === 'warning' ? 'from-warning-500 to-warning-600' :
                        'from-error-500 to-error-600'
                      } rounded-lg flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-white">
                          {component.name}
                        </h4>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 capitalize">
                          {component.category}
                        </p>
                      </div>
                    </div>
                    <Badge variant={getStatusColor(component.status)} size="sm">
                      {component.status}
                    </Badge>
                  </div>

                  {/* Health Score */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                        Health Score
                      </span>
                      <span className={`text-lg font-bold ${
                        component.health >= 95 ? 'text-success-600' :
                        component.health >= 80 ? 'text-warning-600' : 'text-error-600'
                      }`}>
                        {component.health}%
                      </span>
                    </div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          component.health >= 95 ? 'bg-success-500' :
                          component.health >= 80 ? 'bg-warning-500' : 'bg-error-500'
                        }`}
                        style={{ width: `${component.health}%` }}
                      />
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-neutral-500">Uptime</p>
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">
                        {component.uptime}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500">Load</p>
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">
                        {component.load}%
                      </p>
                    </div>
                    {component.temperature && (
                      <div>
                        <p className="text-xs text-neutral-500">Temperature</p>
                        <p className="text-sm font-medium text-neutral-900 dark:text-white">
                          {component.temperature}°C
                        </p>
                      </div>
                    )}
                    {component.memoryUsage && (
                      <div>
                        <p className="text-xs text-neutral-500">Memory</p>
                        <p className="text-sm font-medium text-neutral-900 dark:text-white">
                          {component.memoryUsage}%
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Alerts */}
                  {component.alerts.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-neutral-900 dark:text-white mb-2">
                        Alerts ({component.alerts.length})
                      </p>
                      <div className="space-y-1">
                        {component.alerts.slice(0, 2).map((alert, idx) => (
                          <p key={idx} className="text-xs text-warning-600 bg-warning-50 dark:bg-warning-900/20 px-2 py-1 rounded">
                            {alert}
                          </p>
                        ))}
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
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Component Details Modal */}
      {selectedComponent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedComponent(null)}
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
                    {selectedComponent.name}
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400 capitalize">
                    {selectedComponent.category} Component
                  </p>
                </div>
                <Button variant="ghost" onClick={() => setSelectedComponent(null)}>
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
                    <RechartsLineChart data={selectedComponent.metrics}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis 
                        dataKey="timestamp" 
                        tickFormatter={(value) => new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleString()}
                      />
                      <Line type="monotone" dataKey="value" stroke="#3b82f6" name="Health %" />
                      <Line type="monotone" dataKey="load" stroke="#10b981" name="Load %" />
                      {selectedComponent.metrics[0]?.temperature && (
                        <Line type="monotone" dataKey="temperature" stroke="#f59e0b" name="Temperature °C" />
                      )}
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>

                {/* Detailed Status */}
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                    Current Status
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Gauge className="w-5 h-5 text-primary-600" />
                          <span className="font-medium">Health</span>
                        </div>
                        <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                          {selectedComponent.health}%
                        </p>
                      </div>
                      <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="w-5 h-5 text-success-600" />
                          <span className="font-medium">Uptime</span>
                        </div>
                        <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                          {selectedComponent.uptime}%
                        </p>
                      </div>
                      <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Activity className="w-5 h-5 text-warning-600" />
                          <span className="font-medium">Load</span>
                        </div>
                        <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                          {selectedComponent.load}%
                        </p>
                      </div>
                      <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <RefreshCw className="w-5 h-5 text-info-600" />
                          <span className="font-medium">Last Update</span>
                        </div>
                        <p className="text-sm font-bold text-neutral-900 dark:text-white">
                          {selectedComponent.lastUpdate.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    {/* Additional Metrics */}
                    {(selectedComponent.temperature || selectedComponent.memoryUsage || selectedComponent.diskUsage) && (
                      <div className="grid grid-cols-1 gap-4">
                        {selectedComponent.temperature && (
                          <div className="flex justify-between items-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <Thermometer className="w-4 h-4 text-warning-600" />
                              <span className="text-sm font-medium">Temperature</span>
                            </div>
                            <span className="text-lg font-bold">{selectedComponent.temperature}°C</span>
                          </div>
                        )}
                        {selectedComponent.memoryUsage && (
                          <div className="flex justify-between items-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <MemoryStick className="w-4 h-4 text-info-600" />
                              <span className="text-sm font-medium">Memory Usage</span>
                            </div>
                            <span className="text-lg font-bold">{selectedComponent.memoryUsage}%</span>
                          </div>
                        )}
                        {selectedComponent.diskUsage && (
                          <div className="flex justify-between items-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <HardDrive className="w-4 h-4 text-secondary-600" />
                              <span className="text-sm font-medium">Disk Usage</span>
                            </div>
                            <span className="text-lg font-bold">{selectedComponent.diskUsage}%</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Active Alerts */}
                    {selectedComponent.alerts.length > 0 && (
                      <div>
                        <h4 className="font-medium text-neutral-900 dark:text-white mb-2">
                          Active Alerts
                        </h4>
                        <div className="space-y-2">
                          {selectedComponent.alerts.map((alert, idx) => (
                            <div key={idx} className="flex items-center space-x-2 p-2 bg-warning-50 dark:bg-warning-900/20 rounded">
                              <AlertTriangle className="w-4 h-4 text-warning-600" />
                              <span className="text-sm text-warning-700 dark:text-warning-300">
                                {alert}
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

export default SystemHealth;