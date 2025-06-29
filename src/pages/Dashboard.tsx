import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Smartphone,
  AlertTriangle,
  Activity,
  TrendingUp,
  TrendingDown,
  Cpu,
  HardDrive,
  Wifi,
  Globe,
  Zap,
  Eye,
  Clock,
  Users,
  Server,
  Network,
  Lock,
  Unlock,
  MapPin,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  RefreshCw,
  Download,
  Settings,
  Bell,
  Search,
  Filter,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Star,
  Target,
  Layers,
  Database,
  Cloud,
  Gauge,
  Brain,
  Cog,
  Wrench,
  Monitor,
  Thermometer,
  Battery,
  WifiOff,
  ShieldCheck,
  ShieldAlert,
  Radar,
  Crosshair,
  Microscope,
  Beaker,
  FlaskConical,
  Atom,
  Workflow,
  GitBranch,
  Boxes,
  Package,
  Truck,
  Factory,
  Building,
  Home,
  MapIcon,
  Satellite,
  Radio,
  Antenna,
  Signal,
  Bluetooth,
  Usb,
  HardDrive as Storage,
  MemoryStick,
  ScanLine,
  Fingerprint,
  KeyRound,
  UserCheck,
  UserX,
  Crown,
  Award,
  Medal,
  Trophy,
  Sparkles,
  Flame,
  Lightning,
  Bolt,
  Power,
  PowerOff,
  Play,
  Pause,
  Stop,
  SkipForward,
  SkipBack,
  FastForward,
  Rewind,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  Shuffle,
  Repeat,
  Heart,
  Bookmark,
  Share,
  Link,
  Copy,
  Scissors,
  Clipboard,
  FileText,
  File,
  Folder,
  FolderOpen,
  Archive,
  Trash,
  Edit,
  Plus,
  Minus,
  X,
  Check,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronsUp,
  ChevronsDown,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  MoreVertical,
  Menu,
  Grid,
  List,
  Columns,
  Rows,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Octagon,
  Diamond,
  Pentagon,
  Star as StarIcon,
  Heart as HeartIcon,
  Bookmark as BookmarkIcon,
  Flag,
  Tag,
  Hash,
  AtSign,
  Percent,
  DollarSign,
  Euro,
  PoundSterling,
  Yen,
  Ruble,
  IndianRupee,
  Bitcoin,
  Banknote,
  CreditCard,
  Wallet,
  PiggyBank,
  Calculator,
  Abacus,
  Scale,
  Ruler,
  Compass,
  Map,
  Navigation,
  Route,
  Car,
  Bus,
  Train,
  Plane,
  Ship,
  Bike,
  Scooter,
  Skateboard,
  Rocket,
  Helicopter,
  Sailboat,
  Anchor,
  Waves,
  Mountain,
  Trees,
  Flower,
  Leaf,
  Seedling,
  Cactus,
  PalmTree,
  Evergreen,
  Deciduous,
  Sun,
  Moon,
  Stars,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Tornado,
  Hurricane,
  Snowflake,
  Droplets,
  Umbrella,
  Rainbow,
  Sunrise,
  Sunset,
  Eclipse,
  Comet,
  Meteor,
  Orbit,
  Planet,
  Earth,
  MoonIcon,
  SunIcon,
  Cloudy,
  PartlyCloudy,
  Wind,
  Tornado as TornadoIcon,
  Zap as ZapIcon,
  Flame as FlameIcon,
  Snowflake as SnowflakeIcon,
  Droplet,
  Waves as WavesIcon,
  Mountain as MountainIcon,
  TreePine,
  Flower2,
  Sprout,
  Bug,
  Fish,
  Bird,
  Rabbit,
  Squirrel,
  Turtle,
  Snail,
  Butterfly,
  Bee,
  Ant,
  Spider,
  Worm,
  Microbe,
  Dna,
  Pill,
  Syringe,
  Stethoscope,
  Thermometer as ThermometerIcon,
  Bandage,
  Crutch,
  Wheelchair,
  Glasses,
  Sunglasses,
  Watch,
  Timer,
  Stopwatch,
  Hourglass,
  AlarmClock,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  CalendarDays,
  CalendarCheck,
  CalendarX,
  CalendarPlus,
  CalendarMinus,
  CalendarClock,
  CalendarHeart,
  CalendarRange,
  CalendarSearch,
  CalendarArrowUp,
  CalendarArrowDown,
  CalendarFold,
  CalendarUnfold,
  Cake,
  Gift,
  PartyPopper,
  Confetti,
  Balloon,
  Sparkler,
  Fireworks,
  Candle,
  Lamp,
  Lightbulb,
  Flashlight,
  Lantern,
  Torch,
  Campfire,
  Fireplace,
  Oven,
  Microwave,
  Refrigerator,
  Dishwasher,
  WashingMachine,
  Dryer,
  Iron,
  Vacuum,
  Broom,
  Mop,
  Bucket,
  Soap,
  Towel,
  Toilet,
  Shower,
  Bathtub,
  Sink,
  Faucet,
  Toothbrush,
  Razor,
  Scissors as ScissorsIcon,
  Comb,
  Brush,
  Mirror,
  Perfume,
  Lipstick,
  Nail,
  Ring,
  Necklace,
  Earrings,
  Bracelet,
  Crown as CrownIcon,
  Gem,
  Diamond as DiamondIcon,
  Ruby,
  Emerald,
  Sapphire,
  Pearl,
  Gold,
  Silver,
  Bronze,
  Copper,
  Iron as IronIcon,
  Steel,
  Aluminum,
  Titanium,
  Platinum,
  Palladium,
  Rhodium,
  Iridium,
  Osmium,
  Ruthenium,
  Rhenium,
  Tungsten,
  Molybdenum,
  Chromium,
  Vanadium,
  Scandium,
  Yttrium,
  Lanthanum,
  Cerium,
  Praseodymium,
  Neodymium,
  Promethium,
  Samarium,
  Europium,
  Gadolinium,
  Terbium,
  Dysprosium,
  Holmium,
  Erbium,
  Thulium,
  Ytterbium,
  Lutetium,
  Hafnium,
  Tantalum,
  Rhenium as RheniumIcon,
  Osmium as OsmiumIcon,
  Iridium as IridiumIcon,
  Platinum as PlatinumIcon,
  Gold as GoldIcon,
  Mercury,
  Thallium,
  Lead,
  Bismuth,
  Polonium,
  Astatine,
  Radon,
  Francium,
  Radium,
  Actinium,
  Thorium,
  Protactinium,
  Uranium,
  Neptunium,
  Plutonium,
  Americium,
  Curium,
  Berkelium,
  Californium,
  Einsteinium,
  Fermium,
  Mendelevium,
  Nobelium,
  Lawrencium,
  Rutherfordium,
  Dubnium,
  Seaborgium,
  Bohrium,
  Hassium,
  Meitnerium,
  Darmstadtium,
  Roentgenium,
  Copernicium,
  Nihonium,
  Flerovium,
  Moscovium,
  Livermorium,
  Tennessine,
  Oganesson,
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell,
  LineChart as RechartsLineChart,
  Line,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  Legend,
  ComposedChart,
  Scatter,
  ScatterChart,
  Treemap,
  Sankey,
  Funnel,
  FunnelChart,
  Radar as RechartsRadar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import QuickActions from '../components/ui/QuickActions';
import ThreatMap from '../components/ui/ThreatMap';

// Enhanced mock data for comprehensive dashboard
const threatData = [
  { time: '00:00', threats: 4, normal: 156, blocked: 3, investigated: 1, mitigated: 2 },
  { time: '02:00', threats: 2, normal: 142, blocked: 2, investigated: 0, mitigated: 1 },
  { time: '04:00', threats: 1, normal: 138, blocked: 1, investigated: 0, mitigated: 1 },
  { time: '06:00', threats: 3, normal: 165, blocked: 2, investigated: 1, mitigated: 2 },
  { time: '08:00', threats: 8, normal: 298, blocked: 6, investigated: 2, mitigated: 5 },
  { time: '10:00', threats: 12, normal: 342, blocked: 10, investigated: 2, mitigated: 8 },
  { time: '12:00', threats: 15, normal: 387, blocked: 12, investigated: 3, mitigated: 10 },
  { time: '14:00', threats: 18, normal: 401, blocked: 15, investigated: 3, mitigated: 12 },
  { time: '16:00', threats: 22, normal: 425, blocked: 18, investigated: 4, mitigated: 15 },
  { time: '18:00', threats: 19, normal: 398, blocked: 16, investigated: 3, mitigated: 13 },
  { time: '20:00', threats: 18, normal: 356, blocked: 15, investigated: 3, mitigated: 12 },
  { time: '22:00', threats: 12, normal: 298, blocked: 10, investigated: 2, mitigated: 8 },
];

const deviceFleetData = [
  { category: 'IoT Sensors', total: 156, online: 142, offline: 8, maintenance: 4, critical: 2, healthy: 140, warning: 14 },
  { category: 'Gateways', total: 24, online: 22, offline: 1, maintenance: 1, critical: 0, healthy: 22, warning: 2 },
  { category: 'Cameras', total: 48, online: 45, offline: 2, maintenance: 1, critical: 1, healthy: 44, warning: 4 },
  { category: 'Access Points', total: 32, online: 30, offline: 1, maintenance: 1, critical: 0, healthy: 30, warning: 2 },
  { category: 'Controllers', total: 16, online: 15, offline: 0, maintenance: 1, critical: 0, healthy: 15, warning: 1 },
];

const systemHealthMetrics = [
  { component: 'AI Engine', status: 'optimal', performance: 98.7, load: 45, temperature: 42, uptime: 99.9 },
  { component: 'Database', status: 'good', performance: 94.2, load: 67, temperature: 38, uptime: 99.8 },
  { component: 'Network Stack', status: 'optimal', performance: 97.1, load: 34, temperature: 35, uptime: 99.9 },
  { component: 'Storage', status: 'warning', performance: 89.3, load: 78, temperature: 45, uptime: 99.5 },
  { component: 'Security Engine', status: 'optimal', performance: 99.1, load: 52, temperature: 40, uptime: 100 },
  { component: 'Analytics Engine', status: 'good', performance: 95.8, load: 61, temperature: 43, uptime: 99.7 },
];

const aiModelsData = [
  { 
    name: 'Threat Detection Model', 
    version: '2.1.3', 
    accuracy: 98.7, 
    status: 'active', 
    lastTrained: '2024-01-15',
    trainingData: '2.3M samples',
    type: 'Deep Learning',
    framework: 'TensorFlow',
    size: '245MB'
  },
  { 
    name: 'Anomaly Detection Model', 
    version: '1.8.2', 
    accuracy: 94.2, 
    status: 'active', 
    lastTrained: '2024-01-10',
    trainingData: '1.8M samples',
    type: 'Ensemble',
    framework: 'XGBoost',
    size: '89MB'
  },
  { 
    name: 'Behavioral Analysis Model', 
    version: '3.0.1', 
    accuracy: 96.5, 
    status: 'training', 
    lastTrained: '2024-01-18',
    trainingData: '3.1M samples',
    type: 'Neural Network',
    framework: 'PyTorch',
    size: '512MB'
  },
  { 
    name: 'Network Pattern Model', 
    version: '1.5.7', 
    accuracy: 92.8, 
    status: 'active', 
    lastTrained: '2024-01-12',
    trainingData: '1.2M samples',
    type: 'Random Forest',
    framework: 'Scikit-learn',
    size: '34MB'
  },
];

const advancedAnalytics = [
  { metric: 'Threat Detection Rate', value: 98.7, trend: 2.3, period: '24h' },
  { metric: 'False Positive Rate', value: 0.8, trend: -0.2, period: '24h' },
  { metric: 'Mean Time to Detection', value: 1.2, trend: -0.3, period: '24h', unit: 'seconds' },
  { metric: 'Mean Time to Response', value: 4.7, trend: -1.1, period: '24h', unit: 'seconds' },
  { metric: 'Network Coverage', value: 99.8, trend: 0.1, period: '24h' },
  { metric: 'Device Compliance', value: 96.4, trend: 1.2, period: '24h' },
];

const geographicalThreats = [
  { region: 'North America', threats: 45, blocked: 42, severity: 'medium' },
  { region: 'Europe', threats: 23, blocked: 21, severity: 'low' },
  { region: 'Asia Pacific', threats: 67, blocked: 58, severity: 'high' },
  { region: 'South America', threats: 12, blocked: 11, severity: 'low' },
  { region: 'Africa', threats: 8, blocked: 7, severity: 'low' },
  { region: 'Middle East', threats: 34, blocked: 29, severity: 'medium' },
];

const complianceMetrics = [
  { standard: 'ISO 27001', compliance: 98.5, status: 'compliant', lastAudit: '2024-01-10' },
  { standard: 'NIST Framework', compliance: 96.8, status: 'compliant', lastAudit: '2024-01-08' },
  { standard: 'GDPR', compliance: 99.2, status: 'compliant', lastAudit: '2024-01-15' },
  { standard: 'SOC 2', compliance: 97.3, status: 'compliant', lastAudit: '2024-01-12' },
  { standard: 'PCI DSS', compliance: 94.7, status: 'warning', lastAudit: '2024-01-05' },
];

function Dashboard() {
  const { devices, alerts, metrics } = useApp();
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('24h');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('threats');
  const [activeAnalyticsTab, setActiveAnalyticsTab] = useState('overview');
  const [selectedAIModel, setSelectedAIModel] = useState(null);

  const onlineDevices = devices.filter(device => device.status === 'online').length;
  const criticalAlerts = alerts.filter(alert => alert.severity === 'critical').length;
  const devicesUnderAttack = devices.filter(device => device.status === 'under_attack').length;
  const totalThreatsBlocked = threatData.reduce((sum, item) => sum + item.blocked, 0);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const quickStats = [
    {
      label: 'Active Devices',
      value: onlineDevices,
      total: devices.length,
      icon: Smartphone,
      color: 'primary',
      gradient: 'from-blue-500 to-blue-600',
      trend: { value: 12, isUp: true },
      description: 'Devices online and monitored',
      details: `${Math.round((onlineDevices / devices.length) * 100)}% uptime`,
    },
    {
      label: 'Threats Blocked',
      value: totalThreatsBlocked,
      icon: Shield,
      color: 'success',
      gradient: 'from-emerald-500 to-emerald-600',
      trend: { value: 8, isUp: true },
      description: 'Malicious activities prevented',
      details: '99.2% block rate',
    },
    {
      label: 'Critical Alerts',
      value: criticalAlerts,
      icon: AlertTriangle,
      color: 'error',
      gradient: 'from-red-500 to-red-600',
      trend: { value: 15, isUp: false },
      description: 'High-priority security incidents',
      details: 'Avg response: 1.2s',
    },
    {
      label: 'System Health',
      value: '98.5%',
      icon: Activity,
      color: 'success',
      gradient: 'from-green-500 to-green-600',
      trend: { value: 2, isUp: true },
      description: 'Overall system performance',
      details: 'All systems operational',
    },
    {
      label: 'AI Accuracy',
      value: '98.7%',
      icon: Brain,
      color: 'secondary',
      gradient: 'from-purple-500 to-purple-600',
      trend: { value: 1.2, isUp: true },
      description: 'Machine learning precision',
      details: '0.8% false positives',
    },
    {
      label: 'Network Coverage',
      value: '99.8%',
      icon: Network,
      color: 'accent',
      gradient: 'from-orange-500 to-orange-600',
      trend: { value: 0.3, isUp: true },
      description: 'Infrastructure monitoring',
      details: '2,847 endpoints',
    },
  ];

  const analyticsTabsData = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'threats', label: 'Threat Analysis', icon: Shield },
    { id: 'fleet', label: 'Device Fleet', icon: Smartphone },
    { id: 'health', label: 'System Health', icon: Activity },
    { id: 'ai', label: 'AI Models', icon: Brain },
    { id: 'compliance', label: 'Compliance', icon: CheckCircle },
    { id: 'geography', label: 'Geo Analysis', icon: Globe },
  ];

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800 min-h-screen">
      {/* Enhanced Header with Advanced Controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 via-secondary-600/10 to-accent-600/10 rounded-3xl" />
        <div className="relative bg-white/70 dark:bg-neutral-800/70 backdrop-blur-xl border border-white/20 dark:border-neutral-700/50 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-success-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-neutral-900 via-primary-600 to-secondary-600 bg-clip-text text-transparent dark:from-white dark:via-primary-400 dark:to-secondary-400">
                  Advanced Security Command Center
                </h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mt-2">
                  Welcome back, <span className="font-semibold text-primary-600 dark:text-primary-400">{user?.name?.split(' ')[0]}</span> • Enterprise AI-Powered Threat Detection
                </p>
                <div className="flex items-center space-x-4 mt-3">
                  <Badge variant="success" className="text-sm px-3 py-1">
                    <div className="w-2 h-2 bg-success-500 rounded-full mr-2 animate-pulse" />
                    All Systems Operational
                  </Badge>
                  <Badge variant="info" className="text-sm px-3 py-1">
                    <Brain className="w-3 h-3 mr-1" />
                    AI Models: Active
                  </Badge>
                  <div className="flex items-center space-x-2 text-sm text-neutral-500">
                    <Clock className="w-4 h-4" />
                    <span>Last updated: {new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-6 lg:mt-0">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-3 text-sm bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-lg"
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
              <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing} className="px-6 py-3 shadow-lg">
                <RefreshCw className={`w-5 h-5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="primary" className="px-6 py-3 shadow-lg">
                <Settings className="w-5 h-5 mr-2" />
                Configure
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <div className="relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />
                <div className="relative bg-white/80 dark:bg-neutral-800/80 backdrop-blur-xl border border-white/20 dark:border-neutral-700/50 rounded-2xl p-6 shadow-2xl group-hover:shadow-3xl transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`relative w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                      <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className={`flex items-center text-sm font-medium px-3 py-1 rounded-full ${
                      stat.trend.isUp 
                        ? 'text-success-700 bg-success-100 dark:text-success-300 dark:bg-success-900/30' 
                        : 'text-error-700 bg-error-100 dark:text-error-300 dark:bg-error-900/30'
                    }`}>
                      {stat.trend.isUp ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      {stat.trend.value}%
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                      {stat.label}
                    </p>
                    <div className="flex items-baseline space-x-2 mb-2">
                      <p className="text-3xl font-bold text-neutral-900 dark:text-white">
                        {stat.value}
                        {stat.total && (
                          <span className="text-lg font-normal text-neutral-500">
                            /{stat.total}
                          </span>
                        )}
                      </p>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                      {stat.description}
                    </p>
                    <p className="text-xs font-medium text-primary-600 dark:text-primary-400">
                      {stat.details}
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${stat.gradient} h-2 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${typeof stat.value === 'number' ? Math.min(stat.value, 100) : 85}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Advanced Analytics Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
              Advanced Analytics & Management
            </h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </Button>
            </div>
          </div>
          
          {/* Analytics Navigation */}
          <div className="flex flex-wrap gap-2 mb-6">
            {analyticsTabsData.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveAnalyticsTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeAnalyticsTab === tab.id
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Analytics Content */}
          <motion.div
            key={activeAnalyticsTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeAnalyticsTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    Key Performance Indicators
                  </h3>
                  {advancedAnalytics.map((metric, index) => (
                    <motion.div
                      key={metric.metric}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-neutral-900 dark:text-white">
                          {metric.metric}
                        </span>
                        <div className={`flex items-center text-sm ${
                          metric.trend > 0 ? 'text-success-600' : 'text-error-600'
                        }`}>
                          {metric.trend > 0 ? (
                            <TrendingUp className="w-4 h-4 mr-1" />
                          ) : (
                            <TrendingDown className="w-4 h-4 mr-1" />
                          )}
                          {Math.abs(metric.trend)}%
                        </div>
                      </div>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                          {metric.value}{metric.unit ? metric.unit : '%'}
                        </span>
                        <span className="text-sm text-neutral-500">
                          {metric.period}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                    Threat Timeline
                  </h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={threatData}>
                      <defs>
                        <linearGradient id="threatGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="blockedGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="threats"
                        stackId="1"
                        stroke="#ef4444"
                        fill="url(#threatGradient)"
                        name="Threats Detected"
                      />
                      <Area
                        type="monotone"
                        dataKey="blocked"
                        stackId="2"
                        stroke="#22c55e"
                        fill="url(#blockedGradient)"
                        name="Threats Blocked"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeAnalyticsTab === 'fleet' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Device Fleet Management
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {deviceFleetData.map((fleet, index) => (
                    <motion.div
                      key={fleet.category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-xl"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-neutral-900 dark:text-white">
                          {fleet.category}
                        </h4>
                        <Badge variant="info" size="sm">
                          {fleet.total} devices
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">Online</span>
                          <span className="font-medium text-success-600">{fleet.online}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">Offline</span>
                          <span className="font-medium text-error-600">{fleet.offline}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">Maintenance</span>
                          <span className="font-medium text-warning-600">{fleet.maintenance}</span>
                        </div>
                        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 mt-4">
                          <div
                            className="bg-success-500 h-2 rounded-full"
                            style={{ width: `${(fleet.online / fleet.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeAnalyticsTab === 'health' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  System Health Monitoring
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {systemHealthMetrics.map((component, index) => (
                    <motion.div
                      key={component.component}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-xl"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-neutral-900 dark:text-white">
                          {component.component}
                        </h4>
                        <Badge 
                          variant={
                            component.status === 'optimal' ? 'success' :
                            component.status === 'good' ? 'info' : 'warning'
                          } 
                          size="sm"
                        >
                          {component.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">Performance</span>
                          <div className="text-xl font-bold text-neutral-900 dark:text-white">
                            {component.performance}%
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">Load</span>
                          <div className="text-xl font-bold text-neutral-900 dark:text-white">
                            {component.load}%
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">Temperature</span>
                          <div className="text-xl font-bold text-neutral-900 dark:text-white">
                            {component.temperature}°C
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">Uptime</span>
                          <div className="text-xl font-bold text-neutral-900 dark:text-white">
                            {component.uptime}%
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeAnalyticsTab === 'ai' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    AI Model Management
                  </h3>
                  <Button variant="primary" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Deploy Model
                  </Button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {aiModelsData.map((model, index) => (
                    <motion.div
                      key={model.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-xl"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Brain className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-neutral-900 dark:text-white">
                              {model.name}
                            </h4>
                            <p className="text-sm text-neutral-500">v{model.version}</p>
                          </div>
                        </div>
                        <Badge 
                          variant={
                            model.status === 'active' ? 'success' :
                            model.status === 'training' ? 'warning' : 'error'
                          } 
                          size="sm"
                        >
                          {model.status}
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">Accuracy</span>
                          <span className="font-medium text-neutral-900 dark:text-white">{model.accuracy}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">Framework</span>
                          <span className="font-medium text-neutral-900 dark:text-white">{model.framework}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">Size</span>
                          <span className="font-medium text-neutral-900 dark:text-white">{model.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">Training Data</span>
                          <span className="font-medium text-neutral-900 dark:text-white">{model.trainingData}</span>
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <Button variant="outline" size="sm" className="flex-1">
                            Configure
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            Retrain
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeAnalyticsTab === 'compliance' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Compliance Dashboard
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {complianceMetrics.map((standard, index) => (
                    <motion.div
                      key={standard.standard}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-xl"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-neutral-900 dark:text-white">
                          {standard.standard}
                        </h4>
                        <Badge 
                          variant={standard.status === 'compliant' ? 'success' : 'warning'} 
                          size="sm"
                        >
                          {standard.status}
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">Compliance</span>
                            <span className="font-medium text-neutral-900 dark:text-white">{standard.compliance}%</span>
                          </div>
                          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                standard.compliance >= 95 ? 'bg-success-500' : 'bg-warning-500'
                              }`}
                              style={{ width: `${standard.compliance}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">Last Audit</span>
                          <span className="text-sm text-neutral-900 dark:text-white">{standard.lastAudit}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeAnalyticsTab === 'geography' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Geographical Threat Analysis
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-neutral-900 dark:text-white mb-4">
                      Regional Threat Distribution
                    </h4>
                    <div className="space-y-4">
                      {geographicalThreats.map((region, index) => (
                        <motion.div
                          key={region.region}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-neutral-900 dark:text-white">
                              {region.region}
                            </span>
                            <Badge 
                              variant={
                                region.severity === 'high' ? 'error' :
                                region.severity === 'medium' ? 'warning' : 'success'
                              } 
                              size="sm"
                            >
                              {region.severity}
                            </Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-neutral-600 dark:text-neutral-400">
                              Threats: {region.threats}
                            </span>
                            <span className="text-success-600">
                              Blocked: {region.blocked}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <ThreatMap />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </Card>
      </motion.div>

      {/* Quick Actions Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <QuickActions />
      </motion.div>
    </div>
  );
}

export default Dashboard;