import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Shield, AlertTriangle, Settings, Download, RefreshCw, Zap, Eye, Lock, Users, 
  Brain, Database, Network, Server, Monitor, Cog, Wrench, Play, Pause, Square as Stop, 
  SkipForward, Power, Cpu, HardDrive, Wifi, Globe, Activity, BarChart3, PieChart, 
  LineChart, TrendingUp, Target, Crosshair, Radar, Satellite, Radio, Antenna, Signal, 
  Bluetooth, Usb, MemoryStick, ScanLine, Fingerprint, KeyRound, UserCheck, Crown, 
  Award, Sparkles, Flame, CloudLightning as Lightning, Bolt, FileText, Bell, X, 
  CheckCircle, AlertCircle, Info, Loader
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import Button from './Button';
import Modal from './Modal';
import Badge from './Badge';

interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  path?: string;
  action?: () => void;
  category: 'device' | 'security' | 'ai' | 'system' | 'analytics' | 'admin';
  requiresConfirmation?: boolean;
}

interface ActionResult {
  success: boolean;
  message: string;
  details?: string;
}

function QuickActions() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [actionResults, setActionResults] = useState<Record<string, ActionResult>>({});

  // Simulate action execution
  const executeAction = async (actionId: string, actionName: string): Promise<ActionResult> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    const results: Record<string, ActionResult> = {
      'network-scan': {
        success: true,
        message: 'Network scan completed',
        details: 'Found 3 new devices, 0 security issues detected'
      },
      'device-health': {
        success: true,
        message: 'Device health check completed',
        details: '156 devices healthy, 3 require attention'
      },
      'system-scan': {
        success: true,
        message: 'Security scan completed',
        details: 'No threats detected, all systems secure'
      },
      'threat-hunt': {
        success: true,
        message: 'Threat hunting completed',
        details: 'Analyzed 2.3M events, 0 advanced threats found'
      },
      'incident-response': {
        success: true,
        message: 'Incident response activated',
        details: 'Emergency protocols initiated, team notified'
      },
      'ai-models': {
        success: true,
        message: 'AI model management opened',
        details: '4 models active, 1 training in progress'
      },
      'train-model': {
        success: true,
        message: 'Model training started',
        details: 'Training initiated with 2.3M samples, ETA: 4 hours'
      },
      'ai-insights': {
        success: true,
        message: 'AI insights generated',
        details: 'Threat probability: Low, Anomaly score: 0.02'
      },
      'system-health': {
        success: true,
        message: 'System health check completed',
        details: 'All components operational, 98.7% performance'
      },
      'backup-system': {
        success: true,
        message: 'System backup initiated',
        details: 'Backup started, estimated completion: 45 minutes'
      },
      'update-system': {
        success: true,
        message: 'System update check completed',
        details: '2 security updates available, 1 feature update'
      },
      'generate-report': {
        success: true,
        message: 'Security report generated',
        details: 'Report includes 24h analysis, 156 events processed'
      },
      'export-logs': {
        success: true,
        message: 'Logs exported successfully',
        details: 'Downloaded security-logs-2024-01-20.zip (2.3 MB)'
      },
      'analytics-dashboard': {
        success: true,
        message: 'Analytics dashboard opened',
        details: 'Real-time data loaded, 15 metrics available'
      },
      'audit-logs': {
        success: true,
        message: 'Audit logs loaded',
        details: 'Showing 247 audit events from last 24 hours'
      },
      'lockdown': {
        success: true,
        message: 'System lockdown activated',
        details: 'All non-essential services stopped, security mode enabled'
      },
      'emergency-stop': {
        success: true,
        message: 'Emergency stop executed',
        details: 'All automated processes halted, manual control required'
      },
      'isolate-network': {
        success: true,
        message: 'Network isolation activated',
        details: 'All external connections severed, internal monitoring active'
      },
      'alert-all': {
        success: true,
        message: 'Alert broadcast sent',
        details: 'Emergency notification sent to all 24 team members'
      }
    };

    setIsLoading(false);
    return results[actionId] || {
      success: Math.random() > 0.2,
      message: `${actionName} ${Math.random() > 0.2 ? 'completed successfully' : 'failed'}`,
      details: Math.random() > 0.2 ? 'Operation completed without errors' : 'Please check system logs for details'
    };
  };

  const handleActionClick = async (action: QuickAction) => {
    if (action.path) {
      navigate(action.path);
      return;
    }

    if (action.requiresConfirmation) {
      setModalContent({
        type: 'confirmation',
        action: action,
        title: `Confirm ${action.label}`,
        message: `Are you sure you want to ${action.label.toLowerCase()}? This action may affect system operations.`,
        onConfirm: () => performAction(action)
      });
      setIsModalOpen(true);
      return;
    }

    await performAction(action);
  };

  const performAction = async (action: QuickAction) => {
    setIsModalOpen(false);
    
    // Show loading modal
    setModalContent({
      type: 'loading',
      title: action.label,
      message: `Executing ${action.label.toLowerCase()}...`
    });
    setIsModalOpen(true);

    const result = await executeAction(action.id, action.label);
    setActionResults(prev => ({ ...prev, [action.id]: result }));

    // Show result modal
    setModalContent({
      type: 'result',
      title: action.label,
      result: result
    });
  };

  const quickActions: QuickAction[] = [
    // Device Management
    {
      id: 'add-device',
      label: 'Add Device',
      description: 'Register new IoT device',
      icon: Plus,
      color: 'primary',
      path: '/devices',
      category: 'device',
    },
    {
      id: 'network-scan',
      label: 'Network Scan',
      description: 'Discover new devices',
      icon: Radar,
      color: 'secondary',
      path: '/admin/network-scan',
      category: 'device',
    },
    {
      id: 'device-health',
      label: 'Device Health',
      description: 'Check device status',
      icon: Activity,
      color: 'success',
      path: '/admin/device-health',
      category: 'device',
    },

    // Security Operations
    {
      id: 'view-alerts',
      label: 'View Alerts',
      description: 'Check security incidents',
      icon: AlertTriangle,
      color: 'error',
      path: '/alerts',
      category: 'security',
    },
    {
      id: 'system-scan',
      label: 'Security Scan',
      description: 'Run comprehensive scan',
      icon: Shield,
      color: 'success',
      action: () => {},
      category: 'security',
    },
    {
      id: 'threat-hunt',
      label: 'Threat Hunt',
      description: 'Proactive threat hunting',
      icon: Crosshair,
      color: 'warning',
      action: () => {},
      category: 'security',
    },
    {
      id: 'incident-response',
      label: 'Incident Response',
      description: 'Emergency response tools',
      icon: Zap,
      color: 'error',
      action: () => {},
      requiresConfirmation: true,
      category: 'security',
    },

    // AI & Machine Learning
    {
      id: 'ai-models',
      label: 'AI Models',
      description: 'Manage ML models',
      icon: Brain,
      color: 'secondary',
      path: '/admin/ai-models',
      category: 'ai',
    },
    {
      id: 'train-model',
      label: 'Train Model',
      description: 'Start model training',
      icon: Target,
      color: 'accent',
      action: () => {},
      category: 'ai',
    },
    {
      id: 'ai-insights',
      label: 'AI Insights',
      description: 'View AI predictions',
      icon: Eye,
      color: 'info',
      action: () => {},
      category: 'ai',
    },

    // System Management
    {
      id: 'system-health',
      label: 'System Health',
      description: 'Monitor system status',
      icon: Monitor,
      color: 'success',
      path: '/admin/system-health',
      category: 'system',
    },
    {
      id: 'backup-system',
      label: 'Backup System',
      description: 'Create system backup',
      icon: Database,
      color: 'info',
      action: () => {},
      category: 'system',
    },
    {
      id: 'update-system',
      label: 'System Update',
      description: 'Check for updates',
      icon: RefreshCw,
      color: 'primary',
      action: () => {},
      category: 'system',
    },

    // Analytics & Reporting
    {
      id: 'generate-report',
      label: 'Generate Report',
      description: 'Create security report',
      icon: BarChart3,
      color: 'accent',
      action: () => {},
      category: 'analytics',
    },
    {
      id: 'export-logs',
      label: 'Export Logs',
      description: 'Download security logs',
      icon: Download,
      color: 'secondary',
      action: () => {},
      category: 'analytics',
    },
    {
      id: 'analytics-dashboard',
      label: 'Analytics',
      description: 'Advanced analytics',
      icon: TrendingUp,
      color: 'primary',
      action: () => {},
      category: 'analytics',
    },

    // Administration
    {
      id: 'user-management',
      label: 'User Management',
      description: 'Manage user accounts',
      icon: Users,
      color: 'primary',
      path: '/admin/users',
      category: 'admin',
    },
    {
      id: 'settings',
      label: 'Settings',
      description: 'System configuration',
      icon: Settings,
      color: 'secondary',
      path: '/settings',
      category: 'admin',
    },
    {
      id: 'audit-logs',
      label: 'Audit Logs',
      description: 'View system audit trail',
      icon: FileText,
      color: 'info',
      action: () => {},
      category: 'admin',
    },
  ];

  const emergencyActions = [
    { 
      id: 'lockdown', 
      label: 'Lockdown', 
      icon: Lock, 
      action: () => {},
      requiresConfirmation: true 
    },
    { 
      id: 'emergency-stop', 
      label: 'Emergency Stop', 
      icon: Stop, 
      action: () => {},
      requiresConfirmation: true 
    },
    { 
      id: 'isolate-network', 
      label: 'Isolate Network', 
      icon: Network, 
      action: () => {},
      requiresConfirmation: true 
    },
    { 
      id: 'alert-all', 
      label: 'Alert All', 
      icon: Bell, 
      action: () => {},
      requiresConfirmation: true 
    },
  ];

  const categories = [
    { id: 'device', label: 'Device Management', color: 'primary' },
    { id: 'security', label: 'Security Operations', color: 'error' },
    { id: 'ai', label: 'AI & ML', color: 'secondary' },
    { id: 'system', label: 'System Management', color: 'success' },
    { id: 'analytics', label: 'Analytics', color: 'accent' },
    { id: 'admin', label: 'Administration', color: 'info' },
  ];

  const renderModal = () => {
    if (!modalContent) return null;

    switch (modalContent.type) {
      case 'confirmation':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-warning-100 dark:bg-warning-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-warning-600" />
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              {modalContent.message}
            </p>
            <div className="flex space-x-3 justify-center">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={modalContent.onConfirm}>
                Confirm
              </Button>
            </div>
          </div>
        );

      case 'loading':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader className="w-8 h-8 text-primary-600 animate-spin" />
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">
              {modalContent.message}
            </p>
          </div>
        );

      case 'result':
        const { result } = modalContent;
        return (
          <div className="text-center">
            <div className={`w-16 h-16 ${
              result.success 
                ? 'bg-success-100 dark:bg-success-900/30' 
                : 'bg-error-100 dark:bg-error-900/30'
            } rounded-full flex items-center justify-center mx-auto mb-4`}>
              {result.success ? (
                <CheckCircle className="w-8 h-8 text-success-600" />
              ) : (
                <X className="w-8 h-8 text-error-600" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              {result.message}
            </h3>
            {result.details && (
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                {result.details}
              </p>
            )}
            <Button onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Card variant="glass" className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
              Quick Actions & Admin Controls
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mt-1">
              Comprehensive system management and security operations
            </p>
          </div>
          <Button variant="ghost" size="sm">
            <Sparkles className="w-5 h-5" />
          </Button>
        </div>

        {categories.map((category, categoryIndex) => {
          const categoryActions = quickActions.filter(action => action.category === category.id);
          
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
              className="mb-8 last:mb-0"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-3 h-3 bg-${category.color}-500 rounded-full`} />
                <h4 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  {category.label}
                </h4>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {categoryActions.map((action, index) => {
                  const Icon = action.icon;
                  const hasResult = actionResults[action.id];
                  
                  return (
                    <motion.button
                      key={action.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleActionClick(action)}
                      className="group relative p-6 bg-neutral-50/80 dark:bg-neutral-800/50 backdrop-blur-sm rounded-2xl hover:bg-neutral-100/80 dark:hover:bg-neutral-700/50 transition-all duration-300 text-left border border-neutral-200/50 dark:border-neutral-700/50 hover:border-primary-200 dark:hover:border-primary-700 hover:shadow-xl"
                    >
                      {hasResult && (
                        <div className="absolute top-2 right-2">
                          <div className={`w-3 h-3 rounded-full ${
                            hasResult.success ? 'bg-success-500' : 'bg-error-500'
                          }`} />
                        </div>
                      )}
                      
                      <div className={`w-12 h-12 bg-gradient-to-br from-${action.color}-500 to-${action.color}-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h5 className="font-semibold text-neutral-900 dark:text-white text-sm mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {action.label}
                      </h5>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        {action.description}
                      </p>
                      
                      {/* Hover Effect Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          );
        })}

        {/* Emergency Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mt-8 p-6 bg-gradient-to-r from-error-50 to-warning-50 dark:from-error-900/20 dark:to-warning-900/20 rounded-2xl border border-error-200 dark:border-error-800"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-3 h-3 bg-error-500 rounded-full animate-pulse" />
            <h4 className="text-lg font-semibold text-error-900 dark:text-error-100">
              Emergency Actions
            </h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {emergencyActions.map((emergency, index) => {
              const Icon = emergency.icon;
              const hasResult = actionResults[emergency.id];
              
              return (
                <motion.button
                  key={emergency.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleActionClick({
                    ...emergency,
                    description: `Emergency ${emergency.label.toLowerCase()}`,
                    color: 'error',
                    category: 'security' as const
                  })}
                  className="relative p-4 bg-error-100 dark:bg-error-900/30 rounded-xl hover:bg-error-200 dark:hover:bg-error-900/50 transition-all duration-200 text-center group"
                >
                  {hasResult && (
                    <div className="absolute top-1 right-1">
                      <div className={`w-2 h-2 rounded-full ${
                        hasResult.success ? 'bg-success-500' : 'bg-error-500'
                      }`} />
                    </div>
                  )}
                  
                  <Icon className="w-6 h-6 text-error-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-error-900 dark:text-error-100">
                    {emergency.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </Card>

      {/* Action Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent?.title || ''}
        showCloseButton={modalContent?.type !== 'loading'}
      >
        {renderModal()}
      </Modal>
    </>
  );
}

export default QuickActions;