import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Edit,
  Save,
  Camera,
  Key,
  Clock,
  Activity,
  Award,
  Star,
  TrendingUp,
  Eye,
  EyeOff,
  Bell,
  Globe,
  Smartphone,
  Lock,
  CheckCircle,
  AlertTriangle,
  Settings,
  Download,
  Upload,
  RefreshCw,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';

function Profile() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showPassword, setShowPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    department: 'IT Security',
    title: 'Senior Security Engineer',
    bio: 'Experienced cybersecurity professional specializing in IoT security and threat detection.',
    timezone: 'America/Los_Angeles',
    language: 'English',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    securityAlerts: true,
    weeklyReports: false,
    darkMode: true,
    autoLogout: 30,
    twoFactorAuth: false,
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateUser({
      name: profileData.name,
      email: profileData.email,
    });
    
    setIsEditing(false);
    setIsSaving(false);
  };

  const activityData = [
    { date: '2024-01-20', action: 'Logged in', time: '09:15 AM', ip: '192.168.1.100' },
    { date: '2024-01-20', action: 'Updated security settings', time: '10:30 AM', ip: '192.168.1.100' },
    { date: '2024-01-19', action: 'Generated security report', time: '03:45 PM', ip: '192.168.1.100' },
    { date: '2024-01-19', action: 'Added new device', time: '11:20 AM', ip: '192.168.1.100' },
    { date: '2024-01-18', action: 'Logged in', time: '08:30 AM', ip: '192.168.1.100' },
  ];

  const achievements = [
    { icon: Shield, title: 'Security Expert', description: 'Detected 100+ threats', color: 'primary' },
    { icon: Award, title: 'System Guardian', description: '99.9% uptime maintained', color: 'success' },
    { icon: Star, title: 'Early Adopter', description: 'Beta tester for new features', color: 'warning' },
    { icon: TrendingUp, title: 'Performance Leader', description: 'Top 5% response time', color: 'secondary' },
  ];

  const stats = [
    { label: 'Days Active', value: '127', icon: Calendar, color: 'primary' },
    { label: 'Threats Detected', value: '1,247', icon: Shield, color: 'error' },
    { label: 'Reports Generated', value: '89', icon: Activity, color: 'success' },
    { label: 'Devices Managed', value: '156', icon: Smartphone, color: 'secondary' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'activity', label: 'Activity', icon: Activity },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card variant="glass" className="p-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                {profileData.name}
              </h2>
              <Badge variant={user?.role === 'admin' ? 'primary' : 'secondary'}>
                {user?.role === 'admin' ? 'Administrator' : 'User'}
              </Badge>
            </div>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-2">
              {profileData.title}
            </p>
            <p className="text-neutral-500 dark:text-neutral-400 mb-4">
              {profileData.bio}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center space-x-1">
                <Mail className="w-4 h-4" />
                <span>{profileData.email}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>{profileData.phone}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{profileData.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Joined {user?.lastLogin?.toLocaleDateString() || 'Recently'}</span>
              </div>
            </div>
          </div>
          
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? 'outline' : 'primary'}
          >
            <Edit className="w-4 h-4 mr-2" />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>
      </Card>

      {/* Stats Grid */}
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

      {/* Achievements */}
      <Card variant="glass" className="p-6">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Achievements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg"
              >
                <div className={`w-12 h-12 bg-${achievement.color}-100 dark:bg-${achievement.color}-900/30 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${achievement.color}-600`} />
                </div>
                <div>
                  <h4 className="font-medium text-neutral-900 dark:text-white">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Edit Form */}
      {isEditing && (
        <Card variant="glass" className="p-6">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Edit Profile Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              value={profileData.name}
              onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
            />
            <Input
              label="Email"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
            />
            <Input
              label="Phone"
              value={profileData.phone}
              onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
            />
            <Input
              label="Location"
              value={profileData.location}
              onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
            />
            <Input
              label="Department"
              value={profileData.department}
              onChange={(e) => setProfileData(prev => ({ ...prev, department: e.target.value }))}
            />
            <Input
              label="Job Title"
              value={profileData.title}
              onChange={(e) => setProfileData(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Bio
            </label>
            <textarea
              value={profileData.bio}
              onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} isLoading={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </Card>
      )}
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <Card variant="glass" className="p-6">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Password & Authentication
        </h3>
        <div className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            value={profileData.currentPassword}
            onChange={(e) => setProfileData(prev => ({ ...prev, currentPassword: e.target.value }))}
          />
          <div className="relative">
            <Input
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              value={profileData.newPassword}
              onChange={(e) => setProfileData(prev => ({ ...prev, newPassword: e.target.value }))}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-neutral-400 hover:text-neutral-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <Input
            label="Confirm New Password"
            type={showPassword ? 'text' : 'password'}
            value={profileData.confirmPassword}
            onChange={(e) => setProfileData(prev => ({ ...prev, confirmPassword: e.target.value }))}
          />
        </div>
        
        <div className="mt-6 p-4 bg-warning-50 dark:bg-warning-900/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-warning-600" />
            <h4 className="font-medium text-warning-900 dark:text-warning-100">
              Two-Factor Authentication
            </h4>
          </div>
          <p className="text-sm text-warning-700 dark:text-warning-300 mb-3">
            Enhance your account security with two-factor authentication
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-warning-700 dark:text-warning-300">
              Status: {preferences.twoFactorAuth ? 'Enabled' : 'Disabled'}
            </span>
            <Button
              variant={preferences.twoFactorAuth ? 'outline' : 'primary'}
              size="sm"
              onClick={() => setPreferences(prev => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }))}
            >
              {preferences.twoFactorAuth ? 'Disable' : 'Enable'} 2FA
            </Button>
          </div>
        </div>
      </Card>

      <Card variant="glass" className="p-6">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Session Management
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-neutral-900 dark:text-white">Auto Logout</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Automatically log out after inactivity
              </p>
            </div>
            <select
              value={preferences.autoLogout}
              onChange={(e) => setPreferences(prev => ({ ...prev, autoLogout: parseInt(e.target.value) }))}
              className="px-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
              <option value={0}>Never</option>
            </select>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <Card variant="glass" className="p-6">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Notification Settings
        </h3>
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
            { key: 'pushNotifications', label: 'Push Notifications', description: 'Browser push notifications' },
            { key: 'securityAlerts', label: 'Security Alerts', description: 'Critical security notifications' },
            { key: 'weeklyReports', label: 'Weekly Reports', description: 'Weekly summary reports' },
          ].map((setting) => (
            <div key={setting.key} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-neutral-900 dark:text-white">{setting.label}</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{setting.description}</p>
              </div>
              <button
                onClick={() => setPreferences(prev => ({ ...prev, [setting.key]: !prev[setting.key as keyof typeof prev] }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences[setting.key as keyof typeof preferences] ? 'bg-primary-600' : 'bg-neutral-200 dark:bg-neutral-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences[setting.key as keyof typeof preferences] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </Card>

      <Card variant="glass" className="p-6">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Regional Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Timezone
            </label>
            <select
              value={profileData.timezone}
              onChange={(e) => setProfileData(prev => ({ ...prev, timezone: e.target.value }))}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Language
            </label>
            <select
              value={profileData.language}
              onChange={(e) => setProfileData(prev => ({ ...prev, language: e.target.value }))}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Japanese">Japanese</option>
            </select>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderActivity = () => (
    <div className="space-y-6">
      <Card variant="glass" className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
            Recent Activity
          </h3>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
        <div className="space-y-4">
          {activityData.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <Activity className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-neutral-900 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {activity.date} at {activity.time}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  IP: {activity.ip}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
          Profile Settings
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
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

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'security' && renderSecurity()}
        {activeTab === 'preferences' && renderPreferences()}
        {activeTab === 'activity' && renderActivity()}
      </motion.div>
    </div>
  );
}

export default Profile;