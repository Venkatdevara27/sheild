import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Clock,
  Globe,
  Server,
  Zap,
  AlertTriangle,
  CheckCircle,
  Download,
  RefreshCw,
  Calendar,
  Filter,
  Eye,
  Code,
  Database,
  Shield,
  Key,
  Copy,
  Plus,
  Trash2,
  Edit,
  MoreVertical,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';

// Mock API usage data
const usageData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 86400000).toLocaleDateString(),
  requests: Math.floor(Math.random() * 10000) + 5000,
  errors: Math.floor(Math.random() * 100) + 10,
  latency: Math.floor(Math.random() * 200) + 50,
  bandwidth: Math.floor(Math.random() * 1000) + 500,
}));

const endpointData = [
  { endpoint: '/api/v1/devices', requests: 45230, errors: 23, avgLatency: 120, status: 'healthy' },
  { endpoint: '/api/v1/alerts', requests: 32100, errors: 45, avgLatency: 89, status: 'healthy' },
  { endpoint: '/api/v1/logs', requests: 28900, errors: 12, avgLatency: 156, status: 'healthy' },
  { endpoint: '/api/v1/analytics', requests: 15600, errors: 78, avgLatency: 234, status: 'warning' },
  { endpoint: '/api/v1/reports', requests: 8900, errors: 5, avgLatency: 67, status: 'healthy' },
];

const apiKeys = [
  {
    id: '1',
    name: 'Production API Key',
    key: 'sk_prod_1234567890abcdef',
    created: new Date('2024-01-01'),
    lastUsed: new Date('2024-01-20'),
    permissions: ['read', 'write'],
    status: 'active',
    requests: 125000,
  },
  {
    id: '2',
    name: 'Development API Key',
    key: 'sk_dev_abcdef1234567890',
    created: new Date('2024-01-10'),
    lastUsed: new Date('2024-01-19'),
    permissions: ['read'],
    status: 'active',
    requests: 45000,
  },
  {
    id: '3',
    name: 'Testing API Key',
    key: 'sk_test_fedcba0987654321',
    created: new Date('2024-01-15'),
    lastUsed: new Date('2024-01-18'),
    permissions: ['read'],
    status: 'inactive',
    requests: 12000,
  },
];

const quotaData = [
  { name: 'Used', value: 75000, color: '#3b82f6' },
  { name: 'Remaining', value: 25000, color: '#e5e7eb' },
];

function APIUsage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedEndpoint, setSelectedEndpoint] = useState('all');
  const [showCreateKey, setShowCreateKey] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyPermissions, setNewKeyPermissions] = useState<string[]>(['read']);

  const totalRequests = usageData.reduce((sum, day) => sum + day.requests, 0);
  const totalErrors = usageData.reduce((sum, day) => sum + day.errors, 0);
  const avgLatency = Math.round(usageData.reduce((sum, day) => sum + day.latency, 0) / usageData.length);
  const errorRate = ((totalErrors / totalRequests) * 100).toFixed(2);

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    // You could add a toast notification here
  };

  const handleCreateKey = () => {
    // Simulate API key creation
    console.log('Creating API key:', { name: newKeyName, permissions: newKeyPermissions });
    setShowCreateKey(false);
    setNewKeyName('');
    setNewKeyPermissions(['read']);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'success';
      case 'warning': return 'warning';
      case 'error': return 'error';
      case 'active': return 'success';
      case 'inactive': return 'default';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
            API Usage & Analytics
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Monitor API performance, usage patterns, and manage access keys
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Total Requests
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {totalRequests.toLocaleString()}
              </p>
              <div className="flex items-center text-sm text-success-600 mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12.5%
              </div>
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
                Error Rate
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {errorRate}%
              </p>
              <div className="flex items-center text-sm text-success-600 mt-1">
                <TrendingDown className="w-4 h-4 mr-1" />
                -2.1%
              </div>
            </div>
            <div className="w-12 h-12 bg-error-100 dark:bg-error-900/30 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-error-600" />
            </div>
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Avg Latency
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {avgLatency}ms
              </p>
              <div className="flex items-center text-sm text-warning-600 mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +5.2%
              </div>
            </div>
            <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-warning-600" />
            </div>
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Active Keys
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {apiKeys.filter(key => key.status === 'active').length}
              </p>
              <div className="flex items-center text-sm text-neutral-500 mt-1">
                <Key className="w-4 h-4 mr-1" />
                {apiKeys.length} total
              </div>
            </div>
            <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg flex items-center justify-center">
              <Key className="w-6 h-6 text-secondary-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Usage Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card variant="glass" className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
              API Usage Trends
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={usageData}>
                <defs>
                  <linearGradient id="requestsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="requests"
                  stroke="#3b82f6"
                  fill="url(#requestsGradient)"
                  name="Requests"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card variant="glass" className="p-6">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Monthly Quota
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={quotaData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {quotaData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center">
            <p className="text-2xl font-bold text-neutral-900 dark:text-white">
              75%
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              75,000 / 100,000 requests used
            </p>
          </div>
        </Card>
      </div>

      {/* Endpoint Performance */}
      <Card variant="glass" className="p-6">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Endpoint Performance
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 dark:bg-neutral-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Endpoint
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Requests
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Errors
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Avg Latency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {endpointData.map((endpoint, index) => (
                <motion.tr
                  key={endpoint.endpoint}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Code className="w-4 h-4 text-neutral-400" />
                      <span className="font-mono text-sm text-neutral-900 dark:text-white">
                        {endpoint.endpoint}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                    {endpoint.requests.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                    {endpoint.errors}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                    {endpoint.avgLatency}ms
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getStatusColor(endpoint.status)} size="sm">
                      {endpoint.status}
                    </Badge>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* API Keys Management */}
      <Card variant="glass" className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
            API Keys
          </h3>
          <Button onClick={() => setShowCreateKey(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Key
          </Button>
        </div>

        <div className="space-y-4">
          {apiKeys.map((apiKey, index) => (
            <motion.div
              key={apiKey.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-neutral-900 dark:text-white">
                      {apiKey.name}
                    </h4>
                    <Badge variant={getStatusColor(apiKey.status)} size="sm">
                      {apiKey.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <span>Created: {apiKey.created.toLocaleDateString()}</span>
                    <span>Last used: {apiKey.lastUsed.toLocaleDateString()}</span>
                    <span>Requests: {apiKey.requests.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="font-mono text-sm bg-neutral-200 dark:bg-neutral-700 px-2 py-1 rounded">
                      {apiKey.key.substring(0, 20)}...
                    </span>
                    <button
                      onClick={() => handleCopyKey(apiKey.key)}
                      className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded"
                    >
                      <Copy className="w-4 h-4 text-neutral-500" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    {apiKey.permissions.map((permission) => (
                      <Badge key={permission} variant="default" size="sm">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-error-600 hover:text-error-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Create API Key Modal */}
      {showCreateKey && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-neutral-800 rounded-xl shadow-2xl w-full max-w-md"
          >
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                Create API Key
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <Input
                label="Key Name"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="Enter a descriptive name"
              />
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Permissions
                </label>
                <div className="space-y-2">
                  {['read', 'write', 'admin'].map((permission) => (
                    <label key={permission} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newKeyPermissions.includes(permission)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewKeyPermissions(prev => [...prev, permission]);
                          } else {
                            setNewKeyPermissions(prev => prev.filter(p => p !== permission));
                          }
                        }}
                        className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-neutral-700 dark:text-neutral-300 capitalize">
                        {permission}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-neutral-200 dark:border-neutral-700 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowCreateKey(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateKey} disabled={!newKeyName.trim()}>
                Create Key
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default APIUsage;