import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Key,
  Plus,
  Copy,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  Activity,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  Code,
  Database,
  Server,
  Zap,
  Lock,
  Unlock,
  RefreshCw,
  Download,
  Filter,
  Search,
  MoreVertical,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';

interface APIKey {
  id: string;
  name: string;
  key: string;
  prefix: string;
  created: Date;
  lastUsed: Date | null;
  expiresAt: Date | null;
  permissions: string[];
  status: 'active' | 'inactive' | 'expired' | 'revoked';
  requests: number;
  rateLimit: number;
  environment: 'production' | 'development' | 'testing';
  ipWhitelist: string[];
  description: string;
}

const mockAPIKeys: APIKey[] = [
  {
    id: '1',
    name: 'Production API Key',
    key: 'sk_prod_1234567890abcdef1234567890abcdef',
    prefix: 'sk_prod_',
    created: new Date('2024-01-01'),
    lastUsed: new Date('2024-01-20'),
    expiresAt: new Date('2024-12-31'),
    permissions: ['devices:read', 'devices:write', 'alerts:read', 'logs:read'],
    status: 'active',
    requests: 125000,
    rateLimit: 1000,
    environment: 'production',
    ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8'],
    description: 'Main production API key for device management',
  },
  {
    id: '2',
    name: 'Development API Key',
    key: 'sk_dev_abcdef1234567890abcdef1234567890',
    prefix: 'sk_dev_',
    created: new Date('2024-01-10'),
    lastUsed: new Date('2024-01-19'),
    expiresAt: null,
    permissions: ['devices:read', 'alerts:read'],
    status: 'active',
    requests: 45000,
    rateLimit: 500,
    environment: 'development',
    ipWhitelist: [],
    description: 'Development environment testing',
  },
  {
    id: '3',
    name: 'Analytics API Key',
    key: 'sk_test_fedcba0987654321fedcba0987654321',
    prefix: 'sk_test_',
    created: new Date('2024-01-15'),
    lastUsed: new Date('2024-01-18'),
    expiresAt: new Date('2024-06-30'),
    permissions: ['analytics:read', 'reports:read'],
    status: 'active',
    requests: 12000,
    rateLimit: 100,
    environment: 'testing',
    ipWhitelist: ['203.0.113.0/24'],
    description: 'Read-only access for analytics dashboard',
  },
  {
    id: '4',
    name: 'Legacy API Key',
    key: 'sk_prod_legacy1234567890abcdef1234567890',
    prefix: 'sk_prod_',
    created: new Date('2023-06-01'),
    lastUsed: new Date('2023-12-15'),
    expiresAt: new Date('2024-01-01'),
    permissions: ['devices:read'],
    status: 'expired',
    requests: 89000,
    rateLimit: 200,
    environment: 'production',
    ipWhitelist: [],
    description: 'Deprecated legacy API key',
  },
];

function APIKeys() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>(mockAPIKeys);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [environmentFilter, setEnvironmentFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [selectedKey, setSelectedKey] = useState<APIKey | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  const [newKey, setNewKey] = useState({
    name: '',
    description: '',
    environment: 'development' as const,
    permissions: [] as string[],
    rateLimit: 100,
    expiresAt: '',
    ipWhitelist: '',
  });

  const availablePermissions = [
    'devices:read',
    'devices:write',
    'devices:delete',
    'alerts:read',
    'alerts:write',
    'logs:read',
    'analytics:read',
    'reports:read',
    'reports:write',
    'users:read',
    'users:write',
    'admin:all',
  ];

  const filteredKeys = apiKeys.filter(key => {
    const matchesSearch = key.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         key.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || key.status === statusFilter;
    const matchesEnvironment = environmentFilter === 'all' || key.environment === environmentFilter;
    return matchesSearch && matchesStatus && matchesEnvironment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'warning';
      case 'expired': return 'error';
      case 'revoked': return 'error';
      default: return 'default';
    }
  };

  const getEnvironmentColor = (environment: string) => {
    switch (environment) {
      case 'production': return 'error';
      case 'development': return 'warning';
      case 'testing': return 'info';
      default: return 'default';
    }
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    // Add toast notification here
  };

  const toggleKeyVisibility = (keyId: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId);
    } else {
      newVisible.add(keyId);
    }
    setVisibleKeys(newVisible);
  };

  const handleCreateKey = () => {
    const generatedKey = `${newKey.environment === 'production' ? 'sk_prod_' : 
                          newKey.environment === 'development' ? 'sk_dev_' : 'sk_test_'}${
                          Math.random().toString(36).substring(2, 15) + 
                          Math.random().toString(36).substring(2, 15)}`;

    const apiKey: APIKey = {
      id: Date.now().toString(),
      name: newKey.name,
      key: generatedKey,
      prefix: generatedKey.split('_').slice(0, 2).join('_') + '_',
      created: new Date(),
      lastUsed: null,
      expiresAt: newKey.expiresAt ? new Date(newKey.expiresAt) : null,
      permissions: newKey.permissions,
      status: 'active',
      requests: 0,
      rateLimit: newKey.rateLimit,
      environment: newKey.environment,
      ipWhitelist: newKey.ipWhitelist ? newKey.ipWhitelist.split(',').map(ip => ip.trim()) : [],
      description: newKey.description,
    };

    setApiKeys(prev => [...prev, apiKey]);
    setShowCreateModal(false);
    setShowKeyModal(true);
    setSelectedKey(apiKey);
    
    // Reset form
    setNewKey({
      name: '',
      description: '',
      environment: 'development',
      permissions: [],
      rateLimit: 100,
      expiresAt: '',
      ipWhitelist: '',
    });
  };

  const handleRevokeKey = (keyId: string) => {
    setApiKeys(prev => prev.map(key => 
      key.id === keyId ? { ...key, status: 'revoked' as const } : key
    ));
  };

  const handleDeleteKey = (keyId: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== keyId));
  };

  const stats = [
    {
      label: 'Total Keys',
      value: apiKeys.length,
      icon: Key,
      color: 'primary',
    },
    {
      label: 'Active Keys',
      value: apiKeys.filter(k => k.status === 'active').length,
      icon: CheckCircle,
      color: 'success',
    },
    {
      label: 'Total Requests',
      value: apiKeys.reduce((sum, k) => sum + k.requests, 0).toLocaleString(),
      icon: Activity,
      color: 'secondary',
    },
    {
      label: 'Expired Keys',
      value: apiKeys.filter(k => k.status === 'expired').length,
      icon: AlertTriangle,
      color: 'warning',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
            API Key Management
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Create, manage, and monitor API keys for secure access
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create API Key
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card variant="glass" className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <Card variant="glass" className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Search API keys..."
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="expired">Expired</option>
                <option value="revoked">Revoked</option>
              </select>
            </div>
            <select
              value={environmentFilter}
              onChange={(e) => setEnvironmentFilter(e.target.value)}
              className="px-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Environments</option>
              <option value="production">Production</option>
              <option value="development">Development</option>
              <option value="testing">Testing</option>
            </select>
          </div>
        </div>
      </Card>

      {/* API Keys List */}
      <div className="space-y-4">
        {filteredKeys.map((apiKey, index) => (
          <motion.div
            key={apiKey.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card variant="glass" className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                      {apiKey.name}
                    </h3>
                    <Badge variant={getStatusColor(apiKey.status)} size="sm">
                      {apiKey.status}
                    </Badge>
                    <Badge variant={getEnvironmentColor(apiKey.environment)} size="sm">
                      {apiKey.environment}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                    {apiKey.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400">
                      <Calendar className="w-4 h-4" />
                      <span>Created: {apiKey.created.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400">
                      <Clock className="w-4 h-4" />
                      <span>
                        Last used: {apiKey.lastUsed ? apiKey.lastUsed.toLocaleDateString() : 'Never'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400">
                      <Activity className="w-4 h-4" />
                      <span>Requests: {apiKey.requests.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400">
                      <Zap className="w-4 h-4" />
                      <span>Rate limit: {apiKey.rateLimit}/min</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-2 flex-1">
                      <Code className="w-4 h-4 text-neutral-500" />
                      <span className="font-mono text-sm text-neutral-900 dark:text-white">
                        {visibleKeys.has(apiKey.id) ? apiKey.key : `${apiKey.prefix}${'*'.repeat(24)}`}
                      </span>
                      <button
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                        className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded"
                      >
                        {visibleKeys.has(apiKey.id) ? (
                          <EyeOff className="w-4 h-4 text-neutral-500" />
                        ) : (
                          <Eye className="w-4 h-4 text-neutral-500" />
                        )}
                      </button>
                      <button
                        onClick={() => handleCopyKey(apiKey.key)}
                        className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded"
                      >
                        <Copy className="w-4 h-4 text-neutral-500" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {apiKey.permissions.map((permission) => (
                      <Badge key={permission} variant="default" size="sm">
                        {permission}
                      </Badge>
                    ))}
                  </div>

                  {apiKey.ipWhitelist.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        IP Whitelist:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {apiKey.ipWhitelist.map((ip) => (
                          <span
                            key={ip}
                            className="inline-flex items-center px-2 py-1 rounded text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-mono"
                          >
                            {ip}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {apiKey.expiresAt && (
                    <div className="flex items-center space-x-2 text-sm text-warning-600">
                      <AlertTriangle className="w-4 h-4" />
                      <span>
                        Expires: {apiKey.expiresAt.toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  {apiKey.status === 'active' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRevokeKey(apiKey.id)}
                      className="text-warning-600 hover:text-warning-700"
                    >
                      <Lock className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteKey(apiKey.id)}
                    className="text-error-600 hover:text-error-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Create API Key Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New API Key"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Key Name"
              value={newKey.name}
              onChange={(e) => setNewKey(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter a descriptive name"
            />
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Environment
              </label>
              <select
                value={newKey.environment}
                onChange={(e) => setNewKey(prev => ({ ...prev, environment: e.target.value as any }))}
                className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="development">Development</option>
                <option value="testing">Testing</option>
                <option value="production">Production</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Description
            </label>
            <textarea
              value={newKey.description}
              onChange={(e) => setNewKey(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Describe the purpose of this API key"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Permissions
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
              {availablePermissions.map((permission) => (
                <label key={permission} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newKey.permissions.includes(permission)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setNewKey(prev => ({ ...prev, permissions: [...prev.permissions, permission] }));
                      } else {
                        setNewKey(prev => ({ ...prev, permissions: prev.permissions.filter(p => p !== permission) }));
                      }
                    }}
                    className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    {permission}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Rate Limit (requests/minute)"
              type="number"
              value={newKey.rateLimit.toString()}
              onChange={(e) => setNewKey(prev => ({ ...prev, rateLimit: parseInt(e.target.value) || 100 }))}
            />
            <Input
              label="Expires At (optional)"
              type="date"
              value={newKey.expiresAt}
              onChange={(e) => setNewKey(prev => ({ ...prev, expiresAt: e.target.value }))}
            />
          </div>

          <Input
            label="IP Whitelist (comma-separated, optional)"
            value={newKey.ipWhitelist}
            onChange={(e) => setNewKey(prev => ({ ...prev, ipWhitelist: e.target.value }))}
            placeholder="192.168.1.0/24, 10.0.0.0/8"
          />

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateKey} disabled={!newKey.name.trim() || newKey.permissions.length === 0}>
              Create API Key
            </Button>
          </div>
        </div>
      </Modal>

      {/* Show New Key Modal */}
      <Modal
        isOpen={showKeyModal}
        onClose={() => setShowKeyModal(false)}
        title="API Key Created Successfully"
        size="md"
      >
        {selectedKey && (
          <div className="space-y-4">
            <div className="p-4 bg-success-50 dark:bg-success-900/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-success-600" />
                <h4 className="font-medium text-success-900 dark:text-success-100">
                  API Key Created
                </h4>
              </div>
              <p className="text-sm text-success-700 dark:text-success-300">
                Your API key has been created successfully. Make sure to copy it now as you won't be able to see it again.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                API Key
              </label>
              <div className="flex items-center space-x-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3">
                <span className="font-mono text-sm text-neutral-900 dark:text-white flex-1">
                  {selectedKey.key}
                </span>
                <button
                  onClick={() => handleCopyKey(selectedKey.key)}
                  className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded"
                >
                  <Copy className="w-4 h-4 text-neutral-500" />
                </button>
              </div>
            </div>

            <div className="p-4 bg-warning-50 dark:bg-warning-900/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-warning-600" />
                <h4 className="font-medium text-warning-900 dark:text-warning-100">
                  Important Security Notice
                </h4>
              </div>
              <ul className="text-sm text-warning-700 dark:text-warning-300 space-y-1">
                <li>• Store this key securely and never share it publicly</li>
                <li>• Use environment variables to store the key in your applications</li>
                <li>• Regularly rotate your API keys for better security</li>
                <li>• Monitor usage and revoke keys that are no longer needed</li>
              </ul>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setShowKeyModal(false)}>
                I've Saved the Key
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default APIKeys;