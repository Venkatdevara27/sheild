import React, { useState } from 'react';
import { Menu, Bell, Sun, Moon, Search, Shield, Zap, Globe, Activity, User, LogOut, Settings, CreditCard, Key, HelpCircle, ChevronDown } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

interface HeaderProps {
  onMenuClick: () => void;
}

function Header({ onMenuClick }: HeaderProps) {
  const { theme, toggleTheme, alerts } = useApp();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const unreadAlerts = alerts.filter(alert => !alert.isRead).length;

  const recentAlerts = alerts.slice(0, 5);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenuItems = [
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Account Settings', path: '/account-settings' },
    { icon: CreditCard, label: 'API Usage', path: '/api-usage' },
    { icon: Key, label: 'API Keys', path: '/api-keys' },
    { icon: HelpCircle, label: 'Help & Support', path: '/help' },
  ];

  return (
    <header className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800 px-4 py-3 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 lg:hidden"
          >
            <Menu className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
          </button>
          
          {/* Enhanced Search */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search devices, alerts, logs..."
                className="pl-10 pr-4 py-2 text-sm bg-neutral-100 dark:bg-neutral-800 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-80 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* System Status Indicators */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-1 bg-success-100 dark:bg-success-900/30 rounded-full">
            <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-success-700 dark:text-success-300">
              All Systems Operational
            </span>
          </div>
          
          <div className="flex items-center space-x-1 text-xs text-neutral-500 dark:text-neutral-400">
            <Activity className="w-3 h-3" />
            <span>98.7% Uptime</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Quick Stats */}
          <div className="hidden md:flex items-center space-x-4 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4 text-success-600" />
              <span className="text-sm font-medium text-neutral-900 dark:text-white">
                156
              </span>
              <span className="text-xs text-neutral-500">protected</span>
            </div>
            <div className="w-px h-4 bg-neutral-300 dark:bg-neutral-600" />
            <div className="flex items-center space-x-1">
              <Zap className="w-4 h-4 text-warning-600" />
              <span className="text-sm font-medium text-neutral-900 dark:text-white">
                {unreadAlerts}
              </span>
              <span className="text-xs text-neutral-500">alerts</span>
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            ) : (
              <Sun className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
            >
              <Bell className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            </button>
            {unreadAlerts > 0 && (
              <Badge 
                variant="error" 
                size="sm" 
                className="absolute -top-1 -right-1 min-w-[1.25rem] px-1"
              >
                {unreadAlerts}
              </Badge>
            )}

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-neutral-800 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-700 z-50">
                <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-neutral-900 dark:text-white">
                      Notifications
                    </h3>
                    <Badge variant="error" size="sm">
                      {unreadAlerts} new
                    </Badge>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {recentAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 border-b border-neutral-100 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors ${
                        !alert.isRead ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          alert.severity === 'critical' ? 'bg-error-500' :
                          alert.severity === 'warning' ? 'bg-warning-500' : 'bg-primary-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-neutral-900 dark:text-white">
                            {alert.title}
                          </p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                            {alert.deviceName} • {alert.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4">
                  <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/alerts')}>
                    View All Alerts
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 pl-3 border-l border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg p-2 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-neutral-900 dark:text-white">
                  {user?.name}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {user?.role === 'admin' ? 'Administrator' : 'Security Analyst'}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-neutral-500" />
            </button>

            {/* User Menu Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-neutral-800 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-700 z-50">
                <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-lg">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900 dark:text-white">
                        {user?.name}
                      </p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="py-2">
                  {userMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.path}
                        onClick={() => {
                          navigate(item.path);
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                      >
                        <Icon className="w-4 h-4 text-neutral-500" />
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="border-t border-neutral-200 dark:border-neutral-700 p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-error-50 dark:hover:bg-error-900/20 rounded-lg transition-colors duration-200 text-error-600 dark:text-error-400"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;