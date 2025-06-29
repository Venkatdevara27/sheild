import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Shield,
  Clock,
  Filter,
  Search,
  Download,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Info,
  Zap,
  MapPin,
  Calendar,
  Activity,
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';

function Alerts() {
  const { alerts, markAlertAsRead, clearAllAlerts } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.deviceName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'read' && alert.isRead) ||
                         (statusFilter === 'unread' && !alert.isRead);
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-5 h-5 text-error-500" />;
      case 'warning': return <Shield className="w-5 h-5 text-warning-500" />;
      case 'info': return <Info className="w-5 h-5 text-primary-500" />;
      default: return <Activity className="w-5 h-5 text-neutral-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'error';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'default';
    }
  };

  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case 'intrusion': return <Zap className="w-4 h-4" />;
      case 'anomaly': return <Activity className="w-4 h-4" />;
      case 'system': return <Shield className="w-4 h-4" />;
      case 'network': return <Activity className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const exportAlerts = () => {
    const csvContent = [
      ['Timestamp', 'Device', 'Type', 'Severity', 'Title', 'Description', 'Source IP', 'Target IP'],
      ...filteredAlerts.map(alert => [
        alert.timestamp.toISOString(),
        alert.deviceName,
        alert.type,
        alert.severity,
        alert.title,
        alert.description,
        alert.sourceIp || '',
        alert.targetIp || '',
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `security-alerts-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
            Security Alerts
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Monitor and manage security incidents across your IoT network
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <Badge variant="warning" className="text-sm">
            {unreadCount} Unread
          </Badge>
          <Button variant="outline" onClick={exportAlerts}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={clearAllAlerts}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card variant="glass" className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Search alerts..."
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
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="px-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="warning">Warning</option>
                <option value="info">Info</option>
              </select>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
          >
            <Card 
              variant="glass" 
              className={`p-6 cursor-pointer transition-all duration-200 ${
                !alert.isRead ? 'ring-2 ring-primary-200 dark:ring-primary-800' : ''
              } ${selectedAlert === alert.id ? 'ring-2 ring-primary-500' : ''}`}
              onClick={() => setSelectedAlert(selectedAlert === alert.id ? null : alert.id)}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getSeverityIcon(alert.severity)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                        {alert.title}
                      </h3>
                      <Badge variant={getSeverityColor(alert.severity)} size="sm">
                        {alert.severity}
                      </Badge>
                      <div className="flex items-center space-x-1 text-neutral-500">
                        {getAlertTypeIcon(alert.type)}
                        <span className="text-sm capitalize">{alert.type}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!alert.isRead && (
                        <div className="w-2 h-2 bg-primary-500 rounded-full" />
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markAlertAsRead(alert.id);
                        }}
                        className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded"
                      >
                        {alert.isRead ? (
                          <EyeOff className="w-4 h-4 text-neutral-500" />
                        ) : (
                          <Eye className="w-4 h-4 text-primary-500" />
                        )}
                      </button>
                    </div>
                  </div>

                  <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                    {alert.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{alert.deviceName}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{alert.timestamp.toLocaleString()}</span>
                    </div>
                    {alert.sourceIp && (
                      <div className="flex items-center space-x-1">
                        <Activity className="w-4 h-4" />
                        <span>From: {alert.sourceIp}</span>
                      </div>
                    )}
                    {alert.targetIp && (
                      <div className="flex items-center space-x-1">
                        <Activity className="w-4 h-4" />
                        <span>To: {alert.targetIp}</span>
                      </div>
                    )}
                  </div>

                  {/* Expanded Details */}
                  {selectedAlert === alert.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-neutral-900 dark:text-white mb-2">
                            Alert Details
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-neutral-500">Alert ID:</span>
                              <span className="text-neutral-900 dark:text-white">{alert.id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-neutral-500">Device ID:</span>
                              <span className="text-neutral-900 dark:text-white">{alert.deviceId}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-neutral-500">Type:</span>
                              <span className="text-neutral-900 dark:text-white capitalize">{alert.type}</span>
                            </div>
                            {alert.attackVector && (
                              <div className="flex justify-between">
                                <span className="text-neutral-500">Attack Vector:</span>
                                <span className="text-neutral-900 dark:text-white">{alert.attackVector}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-neutral-900 dark:text-white mb-2">
                            Network Information
                          </h4>
                          <div className="space-y-2 text-sm">
                            {alert.sourceIp && (
                              <div className="flex justify-between">
                                <span className="text-neutral-500">Source IP:</span>
                                <span className="text-neutral-900 dark:text-white font-mono">{alert.sourceIp}</span>
                              </div>
                            )}
                            {alert.targetIp && (
                              <div className="flex justify-between">
                                <span className="text-neutral-500">Target IP:</span>
                                <span className="text-neutral-900 dark:text-white font-mono">{alert.targetIp}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-neutral-500">Timestamp:</span>
                              <span className="text-neutral-900 dark:text-white">{alert.timestamp.toISOString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex space-x-2">
                        <Button size="sm" variant="outline">
                          Investigate
                        </Button>
                        <Button size="sm" variant="outline">
                          Block Source
                        </Button>
                        <Button size="sm" variant="outline">
                          Create Rule
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <Card variant="glass" className="p-12 text-center">
          <div className="text-6xl mb-4">🛡️</div>
          <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
            No alerts found
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            {searchTerm || severityFilter !== 'all' || statusFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Your network is secure - no security alerts at this time'
            }
          </p>
        </Card>
      )}
    </div>
  );
}

export default Alerts;