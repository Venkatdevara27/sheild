import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HelpCircle,
  Search,
  Book,
  MessageCircle,
  Mail,
  Phone,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Star,
  ThumbsUp,
  ThumbsDown,
  Send,
  FileText,
  Video,
  Code,
  Shield,
  Smartphone,
  BarChart3,
  Settings,
  Users,
  Zap,
  Globe,
  Download,
  Play,
  Clock,
  CheckCircle,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
  notHelpful: number;
}

interface GuideItem {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  type: 'article' | 'video' | 'tutorial';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: React.ComponentType<any>;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'How do I add a new IoT device to the system?',
    answer: 'To add a new device, navigate to the Devices page and click "Add Device". Enter the device details including name, type, IP address, and location. The system will automatically detect and configure the device for monitoring.',
    category: 'devices',
    helpful: 45,
    notHelpful: 2,
  },
  {
    id: '2',
    question: 'What should I do when a critical security alert is triggered?',
    answer: 'When a critical alert is triggered: 1) Immediately review the alert details, 2) Check the affected device status, 3) Isolate the device if necessary, 4) Investigate the threat source, 5) Apply appropriate security measures, 6) Document the incident for future reference.',
    category: 'security',
    helpful: 67,
    notHelpful: 1,
  },
  {
    id: '3',
    question: 'How can I customize alert notifications?',
    answer: 'Go to Settings > Alerts to customize notification preferences. You can set different notification methods (email, push, SMS) for different alert severities, configure quiet hours, and set up custom alert rules based on device types or locations.',
    category: 'alerts',
    helpful: 34,
    notHelpful: 3,
  },
  {
    id: '4',
    question: 'How do I generate security reports?',
    answer: 'Navigate to the Analytics section and click "Generate Report". Select the time range, devices, and metrics you want to include. You can schedule automatic reports or generate them on-demand. Reports can be exported in PDF, CSV, or JSON formats.',
    category: 'reports',
    helpful: 28,
    notHelpful: 1,
  },
  {
    id: '5',
    question: 'What are the API rate limits?',
    answer: 'API rate limits depend on your subscription plan: Free tier: 100 requests/hour, Professional: 1,000 requests/hour, Enterprise: 10,000 requests/hour. Rate limits are enforced per API key and reset every hour.',
    category: 'api',
    helpful: 52,
    notHelpful: 4,
  },
];

const guides: GuideItem[] = [
  {
    id: '1',
    title: 'Getting Started with SecureIoT',
    description: 'Complete guide to setting up your first IoT security monitoring system',
    category: 'getting-started',
    duration: '15 min',
    type: 'tutorial',
    difficulty: 'beginner',
    icon: Shield,
  },
  {
    id: '2',
    title: 'Device Management Best Practices',
    description: 'Learn how to effectively manage and monitor your IoT device fleet',
    category: 'devices',
    duration: '20 min',
    type: 'article',
    difficulty: 'intermediate',
    icon: Smartphone,
  },
  {
    id: '3',
    title: 'Advanced Threat Detection',
    description: 'Configure AI-powered threat detection for maximum security',
    category: 'security',
    duration: '25 min',
    type: 'video',
    difficulty: 'advanced',
    icon: Zap,
  },
  {
    id: '4',
    title: 'API Integration Guide',
    description: 'Integrate SecureIoT with your existing systems using our REST API',
    category: 'api',
    duration: '30 min',
    type: 'tutorial',
    difficulty: 'intermediate',
    icon: Code,
  },
  {
    id: '5',
    title: 'Analytics and Reporting',
    description: 'Create custom dashboards and automated security reports',
    category: 'analytics',
    duration: '18 min',
    type: 'article',
    difficulty: 'beginner',
    icon: BarChart3,
  },
  {
    id: '6',
    title: 'User Management and Permissions',
    description: 'Set up team access controls and role-based permissions',
    category: 'users',
    duration: '12 min',
    type: 'video',
    difficulty: 'beginner',
    icon: Users,
  },
];

function Help() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('faq');
  const [supportMessage, setSupportMessage] = useState('');

  const categories = [
    { id: 'all', label: 'All Topics', icon: HelpCircle },
    { id: 'getting-started', label: 'Getting Started', icon: Play },
    { id: 'devices', label: 'Device Management', icon: Smartphone },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'alerts', label: 'Alerts', icon: Zap },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'api', label: 'API', icon: Code },
    { id: 'users', label: 'User Management', icon: Users },
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFAQVote = (faqId: string, helpful: boolean) => {
    // Handle FAQ voting logic here
    console.log(`FAQ ${faqId} voted as ${helpful ? 'helpful' : 'not helpful'}`);
  };

  const handleSendMessage = () => {
    if (supportMessage.trim()) {
      console.log('Sending support message:', supportMessage);
      setSupportMessage('');
      // Add success notification here
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return FileText;
      case 'video': return Video;
      case 'tutorial': return Book;
      default: return FileText;
    }
  };

  const tabs = [
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'guides', label: 'Guides', icon: Book },
    { id: 'contact', label: 'Contact Support', icon: MessageCircle },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
          Help & Support Center
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          Find answers, guides, and get support for SecureIoT
        </p>
      </div>

      {/* Search */}
      <Card variant="glass" className="p-6">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search for help articles, guides, or FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 text-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-neutral-900 dark:text-white"
          />
        </div>
      </Card>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="flex space-x-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'faq' && (
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card variant="glass" className="overflow-hidden">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    className="w-full p-6 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-neutral-900 dark:text-white pr-4">
                        {faq.question}
                      </h3>
                      {expandedFAQ === faq.id ? (
                        <ChevronDown className="w-5 h-5 text-neutral-500 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-neutral-500 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                  
                  {expandedFAQ === faq.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-6"
                    >
                      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
                        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                          {faq.answer}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-neutral-500">Was this helpful?</span>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleFAQVote(faq.id, true)}
                                className="flex items-center space-x-1 px-2 py-1 rounded hover:bg-success-50 dark:hover:bg-success-900/20 transition-colors"
                              >
                                <ThumbsUp className="w-4 h-4 text-success-600" />
                                <span className="text-sm text-success-600">{faq.helpful}</span>
                              </button>
                              <button
                                onClick={() => handleFAQVote(faq.id, false)}
                                className="flex items-center space-x-1 px-2 py-1 rounded hover:bg-error-50 dark:hover:bg-error-900/20 transition-colors"
                              >
                                <ThumbsDown className="w-4 h-4 text-error-600" />
                                <span className="text-sm text-error-600">{faq.notHelpful}</span>
                              </button>
                            </div>
                          </div>
                          <Badge variant="default" size="sm">
                            {faq.category}
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'guides' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide, index) => {
              const Icon = guide.icon;
              const TypeIcon = getTypeIcon(guide.type);
              return (
                <motion.div
                  key={guide.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card variant="glass" hover className="p-6 h-full">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                          {guide.title}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                          {guide.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <TypeIcon className="w-4 h-4 text-neutral-500" />
                        <span className="text-sm text-neutral-500 capitalize">{guide.type}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-neutral-500" />
                        <span className="text-sm text-neutral-500">{guide.duration}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant={getDifficultyColor(guide.difficulty)} size="sm">
                        {guide.difficulty}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        View Guide
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Options */}
              <div className="space-y-6">
                <Card variant="glass" className="p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                    Contact Options
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-900 dark:text-white">Live Chat</h4>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          Available 24/7 for immediate assistance
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Start Chat
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                      <div className="w-10 h-10 bg-success-100 dark:bg-success-900/30 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-success-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-900 dark:text-white">Email Support</h4>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          support@secureiot.com
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                      <div className="w-10 h-10 bg-warning-100 dark:bg-warning-900/30 rounded-lg flex items-center justify-center">
                        <Phone className="w-5 h-5 text-warning-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-900 dark:text-white">Phone Support</h4>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          +1 (555) 123-4567
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Call Now
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card variant="glass" className="p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                    Support Hours
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-400">Live Chat:</span>
                      <span className="text-neutral-900 dark:text-white">24/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-400">Email:</span>
                      <span className="text-neutral-900 dark:text-white">24/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-400">Phone:</span>
                      <span className="text-neutral-900 dark:text-white">Mon-Fri 9AM-6PM PST</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Contact Form */}
              <Card variant="glass" className="p-6">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                  Send us a Message
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Subject"
                    placeholder="Brief description of your issue"
                  />
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Priority
                    </label>
                    <select className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Message
                    </label>
                    <textarea
                      value={supportMessage}
                      onChange={(e) => setSupportMessage(e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Describe your issue in detail..."
                    />
                  </div>
                  <Button onClick={handleSendMessage} className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}
      </motion.div>

      {/* Quick Links */}
      <Card variant="glass" className="p-6">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 text-center">
          Quick Links
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-4">
            <Download className="w-6 h-6" />
            <span className="text-sm">Download App</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-4">
            <Code className="w-6 h-6" />
            <span className="text-sm">API Docs</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-4">
            <Video className="w-6 h-6" />
            <span className="text-sm">Video Tutorials</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-4">
            <Globe className="w-6 h-6" />
            <span className="text-sm">Community</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Help;