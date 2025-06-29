import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Search,
  Filter,
  Download,
  RefreshCw,
  Shield,
  ShieldAlert,
  Clock,
  Globe,
  Server,
  Zap,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useApp } from '../contexts/AppContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';

// Mock network log data
const mockNetworkLogs = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 300000),
    sourceIp: '192.168.1.50',
    targetIp: '192.168.1.101',
    protocol: 'TCP',
    port: 80,
    classification: 'normal' as const,
    confidence: 0.95,
    packetSize: 1024,
    deviceId: '2',
    deviceName: 'Sensor Node ESP32',
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 240000),
    sourceIp: '10.0.0.1',
    targetIp: '192.168.1.101',
    protocol: 'UDP',
    port: 53,
    classification: 'malicious' as const,
    confidence: 0.87,
    packetSize: 512,
    deviceId: '2',
    deviceName: 'Sensor Node ESP32',
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 180000),
    sourceIp: '192.168.1.100',
    targetIp: '8.8.8.8',
    protocol: 'HTTPS',
    port: 443,
    classification: 'normal' as const,
    confidence: 0.98,
    packetSize: 2048,
    deviceId: '1',
    deviceName: 'Main Gateway RPi',
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 120000),
    sourceIp: '203.0.113.1',
    targetIp: '192.168.1.102',
    protocol: 'TCP',
    port: 22,
    classification: 'malicious' as const,
    confidence: 0.92,
    packetSize: 256,
    deviceId: '3',
    deviceName: 'Security Camera Hub',
  },
];

// Mock traffic data for charts
const trafficData = [
  { time: '00:00', normal: 156, malicious: 4 },
  { time: '04:00', normal: 142, malicious: 2 },
  { time: '08:00', normal: 298, malicious: 8 },
  { time: '12:00', normal: 387, malicious: 15 },
  { time: '16:00', normal: 425, malicious: 22 },
  { time: '20:00', normal: 356, malicious: 18 },
];

const protocolData = [
  { protocol: 'HTTP', count: 245 },
  { protocol: 'HTTPS', count: 189 },
  { protocol: 'TCP', count: 156 },
  { protocol: 'UDP', count: 98 },
  { protocol: 'SSH', count: 34 },
];

function NetworkLogs() {
  const [logs] = useState(mockNetworkLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [classificationFilter, setClassificationFilter] = useState<string>('all');
  const [protocolFilter, setProtocolFilter] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.sourceIp.includes(searchTerm) ||
                         log.targetIp.includes(searchTerm) ||
                         log.deviceName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClassification = classificationFilter === 'all' || log.classification === classificationFilter;
    const matchesProtocol = protocolFilter === 'all' || log.protocol === protocolFilter;
    return matchesSearch && matchesClassification && matchesProtocol;
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const exportLogs = () => {
    const csvContent = [
      ['Timestamp', 'Source IP', 'Target IP', 'Protocol', 'Port', 'Classification', 'Confidence', 'Packet Size', 'Device'],
      ...filteredLogs.map(log => [
        log.timestamp.toISOString(),
        log.sourceIp,
        log.targetIp,
        log.protocol,
        log.port.toString(),
        log.classification,
        log.confidence.toString(),
        log.packetSize.toString(),
        log.deviceName,
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `network-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const maliciousCount = logs.filter(log => log.classification === 'malicious').length;
  const normalCount = logs.filter(log => log.classification === 'normal').length;
  const totalTraffic = logs.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
            Network Traffic Logs
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Real-time network activity monitoring and analysis
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" onClick={exportLogs}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Total Traffic
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {totalTraffic.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Normal Traffic
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {normalCount}
              </p>
              <div className="flex items-center text-sm text-success-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                {((normalCount / totalTraffic) * 100).toFixed(1)}%
              </div>
            </div>
            <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Malicious Traffic
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {maliciousCount}
              </p>
              <div className="flex items-center text-sm text-error-600">
                <TrendingDown className="w-4 h-4 mr-1" />
                {((maliciousCount / totalTraffic) * 100).toFixed(1)}%
              </div>
            </div>
            <div className="w-12 h-12 bg-error-100 dark:bg-error-900/30 rounded-lg flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-error-600" />
            </div>
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Detection Rate
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                98.5%
              </p>
              <div className="flex items-center text-sm text-success-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                2.1%
              </div>
            </div>
            <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-secondary-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="glass" className="p-6">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
            Traffic Analysis (24h)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Line
                type="monotone"
                dataKey="normal"
                stroke="#22c55e"
                strokeWidth={2}
                name="Normal Traffic"
              />
              <Line
                type="monotone"
                dataKey="malicious"
                stroke="#ef4444"
                strokeWidth={2}
                name="Malicious Traffic"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card variant="glass" className="p-6">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
            Protocol Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={protocolData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="protocol" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Filters */}
      <Card variant="glass" className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Search by IP address or device..."
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
                value={classificationFilter}
                onChange={(e) => setClassificationFilter(e.target.value)}
                className="px-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Traffic</option>
                <option value="normal">Normal</option>
                <option value="malicious">Malicious</option>
              </select>
            </div>
            <select
              value={protocolFilter}
              onChange={(e) => setProtocolFilter(e.target.value)}
              className="px-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Protocols</option>
              <option value="HTTP">HTTP</option>
              <option value="HTTPS">HTTPS</option>
              <option value="TCP">TCP</option>
              <option value="UDP">UDP</option>
              <option value="SSH">SSH</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Logs Table */}
      <Card variant="glass" className="overflow-hidden">
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
            Recent Network Activity
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 dark:bg-neutral-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Source → Target
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Protocol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Classification
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Confidence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Device
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {filteredLogs.map((log, index) => (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-neutral-400" />
                      <span>{log.timestamp.toLocaleTimeString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-neutral-400" />
                      <span className="font-mono text-neutral-900 dark:text-white">
                        {log.sourceIp}
                      </span>
                      <span className="text-neutral-400">→</span>
                      <span className="font-mono text-neutral-900 dark:text-white">
                        {log.targetIp}:{log.port}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="default" size="sm">
                      {log.protocol}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge 
                      variant={log.classification === 'malicious' ? 'error' : 'success'} 
                      size="sm"
                    >
                      {log.classification}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            log.confidence > 0.9 ? 'bg-success-500' :
                            log.confidence > 0.7 ? 'bg-warning-500' : 'bg-error-500'
                          }`}
                          style={{ width: `${log.confidence * 100}%` }}
                        />
                      </div>
                      <span className="text-xs">{(log.confidence * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                    <div className="flex items-center space-x-2">
                      <Server className="w-4 h-4 text-neutral-400" />
                      <span>{log.deviceName}</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredLogs.length === 0 && (
        <Card variant="glass" className="p-12 text-center">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
            No network logs found
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            {searchTerm || classificationFilter !== 'all' || protocolFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Network monitoring is active - logs will appear here'
            }
          </p>
        </Card>
      )}
    </div>
  );
}

export default NetworkLogs;