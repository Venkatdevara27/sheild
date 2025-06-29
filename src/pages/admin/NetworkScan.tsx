import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Radar,
  Play,
  Pause,
  RefreshCw,
  MapPin,
  Wifi,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Network,
  Server,
  Smartphone,
  Router,
  Monitor,
  Printer,
  Camera,
  Speaker,
  Lightbulb,
  Thermometer,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Download,
  Filter,
  Search,
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';

interface DiscoveredDevice {
  id: string;
  ip: string;
  mac: string;
  hostname: string;
  deviceType: string;
  manufacturer: string;
  status: 'new' | 'known' | 'suspicious';
  lastSeen: Date;
  ports: number[];
  services: string[];
  vulnerabilities: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

const mockDiscoveredDevices: DiscoveredDevice[] = [
  {
    id: '1',
    ip: '192.168.1.105',
    mac: 'AA:BB:CC:DD:EE:FF',
    hostname: 'smart-thermostat-01',
    deviceType: 'IoT Thermostat',
    manufacturer: 'Nest',
    status: 'new',
    lastSeen: new Date(),
    ports: [80, 443, 8080],
    services: ['HTTP', 'HTTPS', 'WebUI'],
    vulnerabilities: 0,
    riskLevel: 'low',
  },
  {
    id: '2',
    ip: '192.168.1.106',
    mac: 'BB:CC:DD:EE:FF:AA',
    hostname: 'security-cam-02',
    deviceType: 'IP Camera',
    manufacturer: 'Hikvision',
    status: 'suspicious',
    lastSeen: new Date(Date.now() - 300000),
    ports: [80, 554, 8000],
    services: ['HTTP', 'RTSP', 'WebUI'],
    vulnerabilities: 3,
    riskLevel: 'high',
  },
  {
    id: '3',
    ip: '192.168.1.107',
    mac: 'CC:DD:EE:FF:AA:BB',
    hostname: 'smart-speaker-03',
    deviceType: 'Smart Speaker',
    manufacturer: 'Amazon',
    status: 'known',
    lastSeen: new Date(Date.now() - 600000),
    ports: [443, 4070],
    services: ['HTTPS', 'Alexa'],
    vulnerabilities: 1,
    riskLevel: 'medium',
  },
];

function NetworkScan() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [discoveredDevices, setDiscoveredDevices] = useState<DiscoveredDevice[]>([]);
  const [scanResults, setScanResults] = useState({
    totalDevices: 0,
    newDevices: 0,
    suspiciousDevices: 0,
    vulnerabilities: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');

  const startScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    setDiscoveredDevices([]);

    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setDiscoveredDevices(mockDiscoveredDevices);
          setScanResults({
            totalDevices: mockDiscoveredDevices.length,
            newDevices: mockDiscoveredDevices.filter(d => d.status === 'new').length,
            suspiciousDevices: mockDiscoveredDevices.filter(d => d.status === 'suspicious').length,
            vulnerabilities: mockDiscoveredDevices.reduce((sum, d) => sum + d.vulnerabilities, 0),
          });
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 200);
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType.toLowerCase()) {
      case 'iot thermostat': return Thermometer;
      case 'ip camera': return Camera;
      case 'smart speaker': return Speaker;
      case 'router': return Router;
      case 'smartphone': return Smartphone;
      case 'computer': return Monitor;
      case 'printer': return Printer;
      case 'smart light': return Lightbulb;
      default: return Server;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'info';
      case 'known': return 'success';
      case 'suspicious': return 'error';
      default: return 'default';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      case 'critical': return 'error';
      default: return 'default';
    }
  };

  const filteredDevices = discoveredDevices.filter(device => {
    const matchesSearch = device.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.ip.includes(searchTerm) ||
                         device.deviceType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || device.status === statusFilter;
    const matchesRisk = riskFilter === 'all' || device.riskLevel === riskFilter;
    return matchesSearch && matchesStatus && matchesRisk;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
            Network Discovery Scan
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Discover and analyze devices on your network
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <Button variant="outline" disabled={isScanning}>
            <Download className="w-4 h-4 mr-2" />
            Export Results
          </Button>
          <Button onClick={startScan} disabled={isScanning}>
            {isScanning ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Scanning...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Scan
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Scan Progress */}
      {isScanning && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card variant="glass" className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                <Radar className="w-6 h-6 text-primary-600 animate-spin" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Network Scan in Progress
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Discovering devices on network range 192.168.1.0/24
                </p>
              </div>
            </div>
            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-3 mb-2">
              <div
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {Math.round(scanProgress)}% complete
            </p>
          </Card>
        </motion.div>
      )}

      {/* Scan Results Summary */}
      {discoveredDevices.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Total Devices
                </p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {scanResults.totalDevices}
                </p>
              </div>
              <Network className="w-8 h-8 text-primary-600" />
            </div>
          </Card>

          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  New Devices
                </p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {scanResults.newDevices}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-info-600" />
            </div>
          </Card>

          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Suspicious
                </p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {scanResults.suspiciousDevices}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-error-600" />
            </div>
          </Card>

          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Vulnerabilities
                </p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {scanResults.vulnerabilities}
                </p>
              </div>
              <Shield className="w-8 h-8 text-warning-600" />
            </div>
          </Card>
        </div>
      )}

      {/* Filters */}
      {discoveredDevices.length > 0 && (
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
                  <option value="new">New</option>
                  <option value="known">Known</option>
                  <option value="suspicious">Suspicious</option>
                </select>
              </div>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="px-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
                <option value="critical">Critical Risk</option>
              </select>
            </div>
          </div>
        </Card>
      )}

      {/* Discovered Devices */}
      {filteredDevices.length > 0 && (
        <Card variant="glass" className="overflow-hidden">
          <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
              Discovered Devices
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 dark:bg-neutral-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Device
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Network Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Risk Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Services
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {filteredDevices.map((device, index) => {
                  const DeviceIcon = getDeviceIcon(device.deviceType);
                  return (
                    <motion.tr
                      key={device.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex items-center justify-center">
                            <DeviceIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-neutral-900 dark:text-white">
                              {device.hostname}
                            </p>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                              {device.deviceType}
                            </p>
                            <p className="text-xs text-neutral-400">
                              {device.manufacturer}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <p className="font-mono text-neutral-900 dark:text-white">
                            {device.ip}
                          </p>
                          <p className="font-mono text-neutral-500 dark:text-neutral-400">
                            {device.mac}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={getStatusColor(device.status)} size="sm">
                          {device.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Badge variant={getRiskColor(device.riskLevel)} size="sm">
                            {device.riskLevel}
                          </Badge>
                          {device.vulnerabilities > 0 && (
                            <span className="text-xs text-error-600">
                              {device.vulnerabilities} vuln{device.vulnerabilities !== 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {device.services.slice(0, 2).map((service) => (
                            <span
                              key={service}
                              className="inline-flex items-center px-2 py-1 rounded text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                            >
                              {service}
                            </span>
                          ))}
                          {device.services.length > 2 && (
                            <span className="text-xs text-neutral-500">
                              +{device.services.length - 2} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            Add to Fleet
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Empty State */}
      {!isScanning && discoveredDevices.length === 0 && (
        <Card variant="glass" className="p-12 text-center">
          <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Radar className="w-8 h-8 text-primary-600" />
          </div>
          <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
            Ready to Scan Network
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Start a network scan to discover devices on your network
          </p>
          <Button onClick={startScan}>
            <Play className="w-4 h-4 mr-2" />
            Start Network Scan
          </Button>
        </Card>
      )}
    </div>
  );
}

export default NetworkScan;