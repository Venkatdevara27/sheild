import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings as SettingsIcon,
  Shield,
  Bell,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Sliders,
  Database,
  Wifi,
  Server,
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';

function Settings() {
  const { theme, toggleTheme } = useApp();
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form states
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'SecureIoT Enterprise',
    timezone: 'UTC',
    language: 'en',
    autoRefresh: true,
    refreshInterval: 30,
  });

  const [securitySettings, setSecuritySettings] = useState({
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    requireTwoFactor: false,
    passwordExpiry: 90,
    minPasswordLength: 8,
    enableAuditLog: true,
  });

  const [alertSettings, setAlertSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    criticalAlerts: true,
    warningAlerts: true,
    infoAlerts: false,
    alertThreshold: 'medium',
    emailAddress: user?.email || '',
  });

  const [detectionSettings, setDetectionSettings] = useState({
    detectionMode: 'balanced',
    confidenceThreshold: 0.8,
    autoBlock: false,
    learningMode: true,
    modelVersion: '2.1.0',
    updateFrequency: 'weekly',
  });

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'detection', label: 'Detection', icon: Shield },
    { id: 'profile', label: 'Profile', icon: Eye },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (activeTab === 'profile') {
      updateUser({
        name: profileData.name,
        email: profileData.email,
      });
    }
    
    setIsSaving(false);
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          General Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Site Name"
            value={generalSettings.siteName}
            onChange={(e) => setGeneralSettings(prev => ({ ...prev, siteName: e.target.value }))}
          />
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Timezone
            </label>
            <select
              value={generalSettings.timezone}
              onChange={(e) => setGeneralSettings(prev => ({ ...prev, timezone: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-neutral-900 dark:text-white mb-4">
          Display Preferences
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                Dark Mode
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Toggle between light and dark themes
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                theme === 'dark' ? 'bg-primary-600' : 'bg-neutral-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                Auto Refresh
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Automatically refresh dashboard data
              </p>
            </div>
            <button
              onClick={() => setGeneralSettings(prev => ({ ...prev, autoRefresh: !prev.autoRefresh }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                generalSettings.autoRefresh ? 'bg-primary-600' : 'bg-neutral-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  generalSettings.autoRefresh ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Security Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Session Timeout (minutes)
            </label>
            <input
              type="number"
              value={securitySettings.sessionTimeout}
              onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Max Login Attempts
            </label>
            <input
              type="number"
              value={securitySettings.maxLoginAttempts}
              onChange={(e) => setSecuritySettings(prev => ({ ...prev, maxLoginAttempts: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-neutral-900 dark:text-white mb-4">
          Authentication Settings
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                Two-Factor Authentication
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Require 2FA for all user logins
              </p>
            </div>
            <button
              onClick={() => setSecuritySettings(prev => ({ ...prev, requireTwoFactor: !prev.requireTwoFactor }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                securitySettings.requireTwoFactor ? 'bg-primary-600' : 'bg-neutral-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  securitySettings.requireTwoFactor ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                Audit Logging
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Log all user activities and system changes
              </p>
            </div>
            <button
              onClick={() => setSecuritySettings(prev => ({ ...prev, enableAuditLog: !prev.enableAuditLog }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                securitySettings.enableAuditLog ? 'bg-primary-600' : 'bg-neutral-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  securitySettings.enableAuditLog ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAlertSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Notification Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                Email Notifications
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Receive alerts via email
              </p>
            </div>
            <button
              onClick={() => setAlertSettings(prev => ({ ...prev, emailNotifications: !prev.emailNotifications }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                alertSettings.emailNotifications ? 'bg-primary-600' : 'bg-neutral-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  alertSettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                Critical Alerts
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                High-priority security incidents
              </p>
            </div>
            <button
              onClick={() => setAlertSettings(prev => ({ ...prev, criticalAlerts: !prev.criticalAlerts }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                alertSettings.criticalAlerts ? 'bg-primary-600' : 'bg-neutral-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  alertSettings.criticalAlerts ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div>
        <Input
          label="Alert Email Address"
          type="email"
          value={alertSettings.emailAddress}
          onChange={(e) => setAlertSettings(prev => ({ ...prev, emailAddress: e.target.value }))}
          hint="Email address for receiving security alerts"
        />
      </div>
    </div>
  );

  const renderDetectionSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Detection Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Detection Mode
            </label>
            <select
              value={detectionSettings.detectionMode}
              onChange={(e) => setDetectionSettings(prev => ({ ...prev, detectionMode: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="aggressive">Aggressive (Low false negatives)</option>
              <option value="balanced">Balanced (Recommended)</option>
              <option value="conservative">Conservative (Low false positives)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Confidence Threshold
            </label>
            <input
              type="range"
              min="0.5"
              max="1"
              step="0.05"
              value={detectionSettings.confidenceThreshold}
              onChange={(e) => setDetectionSettings(prev => ({ ...prev, confidenceThreshold: parseFloat(e.target.value) }))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>50%</span>
              <span className="font-medium">{(detectionSettings.confidenceThreshold * 100).toFixed(0)}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-neutral-900 dark:text-white mb-4">
          Advanced Options
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                Auto-Block Threats
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Automatically block detected malicious traffic
              </p>
            </div>
            <button
              onClick={() => setDetectionSettings(prev => ({ ...prev, autoBlock: !prev.autoBlock }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                detectionSettings.autoBlock ? 'bg-primary-600' : 'bg-neutral-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  detectionSettings.autoBlock ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                Learning Mode
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Continuously improve detection accuracy
              </p>
            </div>
            <button
              onClick={() => setDetectionSettings(prev => ({ ...prev, learningMode: !prev.learningMode }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                detectionSettings.learningMode ? 'bg-primary-600' : 'bg-neutral-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  detectionSettings.learningMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Database className="w-5 h-5 text-primary-600" />
          <h4 className="font-medium text-primary-900 dark:text-primary-100">
            Model Information
          </h4>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-primary-700 dark:text-primary-300">Current Version:</span>
            <span className="ml-2 font-mono text-primary-900 dark:text-primary-100">
              {detectionSettings.modelVersion}
            </span>
          </div>
          <div>
            <span className="text-primary-700 dark:text-primary-300">Last Updated:</span>
            <span className="ml-2 text-primary-900 dark:text-primary-100">
              2 days ago
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Profile Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            value={profileData.name}
            onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
          />
          <Input
            label="Email Address"
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-neutral-900 dark:text-white mb-4">
          Change Password
        </h4>
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
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
          System Settings
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-1">
          Configure your IoT security system preferences and policies
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card variant="glass" className="p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <Card variant="glass" className="p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'general' && renderGeneralSettings()}
              {activeTab === 'security' && renderSecuritySettings()}
              {activeTab === 'alerts' && renderAlertSettings()}
              {activeTab === 'detection' && renderDetectionSettings()}
              {activeTab === 'profile' && renderProfileSettings()}

              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                <Button variant="outline">
                  Reset to Defaults
                </Button>
                <Button onClick={handleSave} isLoading={isSaving}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </motion.div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Settings;