import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Dashboard from './pages/Dashboard';
import Devices from './pages/Devices';
import Alerts from './pages/Alerts';
import NetworkLogs from './pages/NetworkLogs';
import Settings from './pages/Settings';
import UserManagement from './pages/UserManagement';
import Profile from './pages/Profile';
import APIUsage from './pages/APIUsage';
import APIKeys from './pages/APIKeys';
import Help from './pages/Help';

// Admin Quick Action Pages
import NetworkScan from './pages/admin/NetworkScan';
import DeviceHealth from './pages/admin/DeviceHealth';
import AIModelManagement from './pages/admin/AIModelManagement';
import SystemHealth from './pages/admin/SystemHealth';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="devices" element={<Devices />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="logs" element={<NetworkLogs />} />
        <Route path="settings" element={<Settings />} />
        <Route path="admin/users" element={<UserManagement />} />
        
        {/* User Profile & Account Pages */}
        <Route path="profile" element={<Profile />} />
        <Route path="account-settings" element={<Profile />} />
        <Route path="api-usage" element={<APIUsage />} />
        <Route path="api-keys" element={<APIKeys />} />
        <Route path="help" element={<Help />} />
        
        {/* Admin Quick Action Pages */}
        <Route path="admin/network-scan" element={<NetworkScan />} />
        <Route path="admin/device-health" element={<DeviceHealth />} />
        <Route path="admin/ai-models" element={<AIModelManagement />} />
        <Route path="admin/system-health" element={<SystemHealth />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;