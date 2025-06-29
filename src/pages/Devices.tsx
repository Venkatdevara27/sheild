import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Wifi,
  WifiOff,
  Shield,
  ShieldAlert,
  Battery,
  MapPin,
  Calendar,
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';

function Devices() {
  const { devices, updateDevice } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddDevice, setShowAddDevice] = useState(false);

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || device.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'success';
      case 'offline': return 'error';
      case 'under_attack': return 'warning';
      case 'maintenance': return 'info';
      default: return 'default';
    }
  };

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      case 'critical': return 'error';
      default: return 'default';
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'raspberry-pi': return '🥧';
      case 'esp32': return '📟';
      default: return '📱';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
            Device Management
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Monitor and manage your IoT devices
          </p>
        </div>
        <Button onClick={() => setShowAddDevice(true)} className="mt-4 sm:mt-0">
          <Plus className="w-4 h-4 mr-2" />
          Add Device
        </Button>
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
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="under_attack">Under Attack</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Device Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDevices.map((device, index) => (
          <motion.div
            key={device.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card variant="glass" hover className="p-6">
              {/* Device Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{getDeviceIcon(device.type)}</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white">
                      {device.name}
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 capitalize">
                      {device.type.replace('-', ' ')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getStatusColor(device.status)} size="sm">
                    {device.status.replace('_', ' ')}
                  </Badge>
                  <button className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded">
                    <MoreVertical className="w-4 h-4 text-neutral-500" />
                  </button>
                </div>
              </div>

              {/* Device Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <MapPin className="w-4 h-4" />
                  <span>{device.location}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                  {device.status === 'online' ? (
                    <Wifi className="w-4 h-4 text-success-500" />
                  ) : (
                    <WifiOff className="w-4 h-4 text-error-500" />
                  )}
                  <span>{device.ipAddress}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <Calendar className="w-4 h-4" />
                  <span>Last seen: {device.lastSeen.toLocaleString()}</span>
                </div>

                {device.batteryLevel && (
                  <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <Battery className="w-4 h-4" />
                    <span>{device.batteryLevel}%</span>
                    <div className="flex-1 bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5">
                      <div
                        className="bg-success-500 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${device.batteryLevel}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Threat Level */}
              <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {device.threatLevel === 'low' ? (
                      <Shield className="w-4 h-4 text-success-500" />
                    ) : (
                      <ShieldAlert className="w-4 h-4 text-error-500" />
                    )}
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      Threat Level
                    </span>
                  </div>
                  <Badge variant={getThreatLevelColor(device.threatLevel)} size="sm">
                    {device.threatLevel}
                  </Badge>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    const newStatus = device.status === 'online' ? 'offline' : 'online';
                    updateDevice(device.id, { status: newStatus });
                  }}
                >
                  {device.status === 'online' ? 'Disable' : 'Enable'}
                </Button>
                <Button variant="ghost" size="sm">
                  Configure
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredDevices.length === 0 && (
        <Card variant="glass" className="p-12 text-center">
          <div className="text-6xl mb-4">📱</div>
          <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
            No devices found
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Get started by adding your first IoT device'
            }
          </p>
          <Button onClick={() => setShowAddDevice(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Device
          </Button>
        </Card>
      )}
    </div>
  );
}

export default Devices;