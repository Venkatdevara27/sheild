import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Play,
  Pause,
  Square,
  Download,
  Upload,
  Settings,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Clock,
  Database,
  Cpu,
  Zap,
  Target,
  Eye,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Info,
  Activity,
  FileText,
  Code,
  GitBranch,
  Layers,
  Gauge,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';

interface AIModel {
  id: string;
  name: string;
  version: string;
  type: 'classification' | 'regression' | 'clustering' | 'deep_learning' | 'ensemble';
  framework: 'TensorFlow' | 'PyTorch' | 'Scikit-learn' | 'XGBoost' | 'Custom';
  status: 'active' | 'training' | 'idle' | 'error' | 'deploying';
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  trainingData: string;
  modelSize: string;
  lastTrained: Date;
  deployedAt: Date;
  trainingTime: number; // in hours
  inferenceTime: number; // in milliseconds
  memoryUsage: number; // in MB
  cpuUsage: number; // percentage
  predictions: number;
  errors: number;
  description: string;
  tags: string[];
  metrics: Array<{
    timestamp: Date;
    accuracy: number;
    loss: number;
    predictions: number;
  }>;
}

const mockAIModels: AIModel[] = [
  {
    id: '1',
    name: 'Threat Detection Model',
    version: '2.1.3',
    type: 'deep_learning',
    framework: 'TensorFlow',
    status: 'active',
    accuracy: 98.7,
    precision: 97.2,
    recall: 99.1,
    f1Score: 98.1,
    trainingData: '2.3M samples',
    modelSize: '245MB',
    lastTrained: new Date('2024-01-15'),
    deployedAt: new Date('2024-01-16'),
    trainingTime: 4.5,
    inferenceTime: 12,
    memoryUsage: 512,
    cpuUsage: 45,
    predictions: 1250000,
    errors: 156,
    description: 'Advanced neural network for detecting security threats in network traffic',
    tags: ['security', 'neural-network', 'production'],
    metrics: Array.from({ length: 30 }, (_, i) => ({
      timestamp: new Date(Date.now() - (29 - i) * 86400000),
      accuracy: 98 + Math.random() * 2,
      loss: 0.02 + Math.random() * 0.01,
      predictions: 40000 + Math.random() * 10000,
    })),
  },
  {
    id: '2',
    name: 'Anomaly Detection Model',
    version: '1.8.2',
    type: 'ensemble',
    framework: 'XGBoost',
    status: 'active',
    accuracy: 94.2,
    precision: 92.8,
    recall: 95.6,
    f1Score: 94.2,
    trainingData: '1.8M samples',
    modelSize: '89MB',
    lastTrained: new Date('2024-01-10'),
    deployedAt: new Date('2024-01-11'),
    trainingTime: 2.1,
    inferenceTime: 8,
    memoryUsage: 256,
    cpuUsage: 32,
    predictions: 890000,
    errors: 89,
    description: 'Ensemble model for detecting anomalous behavior patterns',
    tags: ['anomaly', 'ensemble', 'production'],
    metrics: Array.from({ length: 30 }, (_, i) => ({
      timestamp: new Date(Date.now() - (29 - i) * 86400000),
      accuracy: 93 + Math.random() * 3,
      loss: 0.05 + Math.random() * 0.02,
      predictions: 30000 + Math.random() * 8000,
    })),
  },
  {
    id: '3',
    name: 'Behavioral Analysis Model',
    version: '3.0.1',
    type: 'deep_learning',
    framework: 'PyTorch',
    status: 'training',
    accuracy: 96.5,
    precision: 95.1,
    recall: 97.8,
    f1Score: 96.4,
    trainingData: '3.1M samples',
    modelSize: '512MB',
    lastTrained: new Date('2024-01-18'),
    deployedAt: new Date('2024-01-19'),
    trainingTime: 6.8,
    inferenceTime: 15,
    memoryUsage: 768,
    cpuUsage: 78,
    predictions: 0,
    errors: 0,
    description: 'Advanced behavioral analysis using transformer architecture',
    tags: ['behavior', 'transformer', 'training'],
    metrics: Array.from({ length: 30 }, (_, i) => ({
      timestamp: new Date(Date.now() - (29 - i) * 86400000),
      accuracy: 95 + Math.random() * 3,
      loss: 0.03 + Math.random() * 0.02,
      predictions: i < 25 ? 25000 + Math.random() * 5000 : 0,
    })),
  },
];

function AIModelManagement() {
  const [models, setModels] = useState<AIModel[]>(mockAIModels);
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showDeployModal, setShowDeployModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'training': return 'warning';
      case 'idle': return 'default';
      case 'error': return 'error';
      case 'deploying': return 'info';
      default: return 'default';
    }
  };

  const getFrameworkColor = (framework: string) => {
    switch (framework) {
      case 'TensorFlow': return 'primary';
      case 'PyTorch': return 'secondary';
      case 'Scikit-learn': return 'success';
      case 'XGBoost': return 'warning';
      default: return 'default';
    }
  };

  const filteredModels = models.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         model.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || model.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const overallStats = {
    totalModels: models.length,
    activeModels: models.filter(m => m.status === 'active').length,
    trainingModels: models.filter(m => m.status === 'training').length,
    avgAccuracy: Math.round(models.reduce((sum, m) => sum + m.accuracy, 0) / models.length * 10) / 10,
    totalPredictions: models.reduce((sum, m) => sum + m.predictions, 0),
    totalErrors: models.reduce((sum, m) => sum + m.errors, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
            AI Model Management
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Deploy, monitor, and manage machine learning models
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Model
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Model
          </Button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Total Models
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {overallStats.totalModels}
              </p>
            </div>
            <Brain className="w-8 h-8 text-primary-600" />
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Active
              </p>
              <p className="text-2xl font-bold text-success-600">
                {overallStats.activeModels}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-success-600" />
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Training
              </p>
              <p className="text-2xl font-bold text-warning-600">
                {overallStats.trainingModels}
              </p>
            </div>
            <Activity className="w-8 h-8 text-warning-600" />
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Avg Accuracy
              </p>
              <p className="text-2xl font-bold text-primary-600">
                {overallStats.avgAccuracy}%
              </p>
            </div>
            <Target className="w-8 h-8 text-primary-600" />
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Predictions
              </p>
              <p className="text-2xl font-bold text-secondary-600">
                {(overallStats.totalPredictions / 1000000).toFixed(1)}M
              </p>
            </div>
            <Zap className="w-8 h-8 text-secondary-600" />
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Error Rate
              </p>
              <p className="text-2xl font-bold text-accent-600">
                {((overallStats.totalErrors / overallStats.totalPredictions) * 100).toFixed(3)}%
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-accent-600" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card variant="glass" className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <Input
              placeholder="Search models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="training">Training</option>
              <option value="idle">Idle</option>
              <option value="error">Error</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Models Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredModels.map((model, index) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card variant="glass" hover className="p-6">
              {/* Model Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white">
                      {model.name}
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      v{model.version}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getStatusColor(model.status)} size="sm">
                    {model.status}
                  </Badge>
                </div>
              </div>

              {/* Model Info */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Framework</span>
                  <Badge variant={getFrameworkColor(model.framework)} size="sm">
                    {model.framework}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Type</span>
                  <span className="text-sm font-medium text-neutral-900 dark:text-white capitalize">
                    {model.type.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Size</span>
                  <span className="text-sm font-medium text-neutral-900 dark:text-white">
                    {model.modelSize}
                  </span>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <p className="text-lg font-bold text-neutral-900 dark:text-white">
                    {model.accuracy}%
                  </p>
                  <p className="text-xs text-neutral-500">Accuracy</p>
                </div>
                <div className="text-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <p className="text-lg font-bold text-neutral-900 dark:text-white">
                    {model.f1Score}%
                  </p>
                  <p className="text-xs text-neutral-500">F1 Score</p>
                </div>
                <div className="text-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <p className="text-lg font-bold text-neutral-900 dark:text-white">
                    {model.inferenceTime}ms
                  </p>
                  <p className="text-xs text-neutral-500">Inference</p>
                </div>
                <div className="text-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <p className="text-lg font-bold text-neutral-900 dark:text-white">
                    {(model.predictions / 1000).toFixed(0)}K
                  </p>
                  <p className="text-xs text-neutral-500">Predictions</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {model.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setSelectedModel(model)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Details
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
                {model.status === 'active' ? (
                  <Button variant="outline" size="sm">
                    <Pause className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button variant="outline" size="sm">
                    <Play className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Model Details Modal */}
      {selectedModel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedModel(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-neutral-800 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
          >
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                    {selectedModel.name}
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Version {selectedModel.version} • {selectedModel.framework}
                  </p>
                </div>
                <Button variant="ghost" onClick={() => setSelectedModel(null)}>
                  ×
                </Button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Performance Chart */}
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                    Performance Metrics (30 days)
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={selectedModel.metrics}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis 
                        dataKey="timestamp" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString()}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                      />
                      <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" name="Accuracy %" />
                      <Line type="monotone" dataKey="loss" stroke="#ef4444" name="Loss" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Detailed Metrics */}
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                    Model Details
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Target className="w-5 h-5 text-primary-600" />
                          <span className="font-medium">Accuracy</span>
                        </div>
                        <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                          {selectedModel.accuracy}%
                        </p>
                      </div>
                      <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Gauge className="w-5 h-5 text-success-600" />
                          <span className="font-medium">Precision</span>
                        </div>
                        <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                          {selectedModel.precision}%
                        </p>
                      </div>
                      <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Activity className="w-5 h-5 text-warning-600" />
                          <span className="font-medium">Recall</span>
                        </div>
                        <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                          {selectedModel.recall}%
                        </p>
                      </div>
                      <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <BarChart3 className="w-5 h-5 text-info-600" />
                          <span className="font-medium">F1 Score</span>
                        </div>
                        <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                          {selectedModel.f1Score}%
                        </p>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-neutral-600 dark:text-neutral-400">Training Data</span>
                        <span className="font-medium">{selectedModel.trainingData}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600 dark:text-neutral-400">Model Size</span>
                        <span className="font-medium">{selectedModel.modelSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600 dark:text-neutral-400">Training Time</span>
                        <span className="font-medium">{selectedModel.trainingTime}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600 dark:text-neutral-400">Inference Time</span>
                        <span className="font-medium">{selectedModel.inferenceTime}ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600 dark:text-neutral-400">Memory Usage</span>
                        <span className="font-medium">{selectedModel.memoryUsage}MB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600 dark:text-neutral-400">CPU Usage</span>
                        <span className="font-medium">{selectedModel.cpuUsage}%</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h4 className="font-medium text-neutral-900 dark:text-white mb-2">
                        Description
                      </h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {selectedModel.description}
                      </p>
                    </div>
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

export default AIModelManagement;