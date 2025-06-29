import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Shield,
  ShieldCheck,
  Clock,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Activity,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';

// Mock user data
const mockUsers = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'admin',
    status: 'active',
    lastLogin: new Date(Date.now() - 3600000),
    createdAt: new Date(Date.now() - 86400000 * 30),
    loginCount: 245,
    department: 'IT Security',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'user',
    status: 'active',
    lastLogin: new Date(Date.now() - 7200000),
    createdAt: new Date(Date.now() - 86400000 * 15),
    loginCount: 89,
    department: 'Operations',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    role: 'user',
    status: 'inactive',
    lastLogin: new Date(Date.now() - 86400000 * 7),
    createdAt: new Date(Date.now() - 86400000 * 60),
    loginCount: 156,
    department: 'Engineering',
    phone: '+1 (555) 345-6789',
    location: 'Austin, TX',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    role: 'user',
    status: 'pending',
    lastLogin: null,
    createdAt: new Date(Date.now() - 86400000 * 2),
    loginCount: 0,
    department: 'Security',
    phone: '+1 (555) 456-7890',
    location: 'Chicago, IL',
  },
];

function UserManagement() {
  const { user: currentUser } = useAuth();
  const [users] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const getRoleIcon = (role: string) => {
    return role === 'admin' ? <ShieldCheck className="w-4 h-4" /> : <Shield className="w-4 h-4" />;
  };

  const getRoleColor = (role: string) => {
    return role === 'admin' ? 'primary' : 'secondary';
  };

  const stats = [
    {
      label: 'Total Users',
      value: users.length,
      icon: Users,
      color: 'primary',
    },
    {
      label: 'Active Users',
      value: users.filter(u => u.status === 'active').length,
      icon: Activity,
      color: 'success',
    },
    {
      label: 'Administrators',
      value: users.filter(u => u.role === 'admin').length,
      icon: ShieldCheck,
      color: 'secondary',
    },
    {
      label: 'Pending Approval',
      value: users.filter(u => u.status === 'pending').length,
      icon: Clock,
      color: 'warning',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
            User Management
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <Button onClick={() => setShowAddUser(true)} className="mt-4 lg:mt-0">
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card variant="glass" className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-1">
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
                placeholder="Search users..."
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
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Roles</option>
                <option value="admin">Administrator</option>
                <option value="user">User</option>
              </select>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Users Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card variant="glass" hover className="p-6">
              {/* User Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-lg">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white">
                      {user.name}
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {user.department}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getStatusColor(user.status)} size="sm">
                    {user.status}
                  </Badge>
                  <button className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded">
                    <MoreVertical className="w-4 h-4 text-neutral-500" />
                  </button>
                </div>
              </div>

              {/* User Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{user.email}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <Phone className="w-4 h-4" />
                  <span>{user.phone}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <Calendar className="w-4 h-4" />
                  <span>Joined: {user.createdAt.toLocaleDateString()}</span>
                </div>

                {user.lastLogin && (
                  <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <Clock className="w-4 h-4" />
                    <span>Last login: {user.lastLogin.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Role and Stats */}
              <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getRoleIcon(user.role)}
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      Role
                    </span>
                  </div>
                  <Badge variant={getRoleColor(user.role)} size="sm">
                    {user.role}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    Login Count
                  </span>
                  <span className="text-sm font-medium text-neutral-900 dark:text-white">
                    {user.loginCount}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setSelectedUser(user.id)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-error-600 hover:text-error-700 hover:bg-error-50 dark:hover:bg-error-900/20"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card variant="glass" className="p-12 text-center">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
            No users found
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {searchTerm || roleFilter !== 'all' || statusFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Get started by adding your first user'
            }
          </p>
          <Button onClick={() => setShowAddUser(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </Card>
      )}
    </div>
  );
}

export default UserManagement;