import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  MapPin, 
  Shield, 
  AlertTriangle, 
  Activity,
  Zap,
  Eye,
  Filter
} from 'lucide-react';
import Card from './Card';
import Badge from './Badge';
import Button from './Button';

interface ThreatLocation {
  id: string;
  country: string;
  city: string;
  lat: number;
  lng: number;
  threatCount: number;
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  lastActivity: Date;
  attackTypes: string[];
}

const mockThreatData: ThreatLocation[] = [
  {
    id: '1',
    country: 'United States',
    city: 'New York',
    lat: 40.7128,
    lng: -74.0060,
    threatCount: 23,
    threatLevel: 'high',
    lastActivity: new Date(Date.now() - 300000),
    attackTypes: ['DDoS', 'Port Scan', 'Brute Force'],
  },
  {
    id: '2',
    country: 'China',
    city: 'Beijing',
    lat: 39.9042,
    lng: 116.4074,
    threatCount: 45,
    threatLevel: 'critical',
    lastActivity: new Date(Date.now() - 120000),
    attackTypes: ['Malware', 'Data Exfiltration', 'APT'],
  },
  {
    id: '3',
    country: 'Russia',
    city: 'Moscow',
    lat: 55.7558,
    lng: 37.6176,
    threatCount: 18,
    threatLevel: 'medium',
    lastActivity: new Date(Date.now() - 600000),
    attackTypes: ['Phishing', 'Ransomware'],
  },
  {
    id: '4',
    country: 'Germany',
    city: 'Berlin',
    lat: 52.5200,
    lng: 13.4050,
    threatCount: 8,
    threatLevel: 'low',
    lastActivity: new Date(Date.now() - 1800000),
    attackTypes: ['Port Scan'],
  },
];

function ThreatMap() {
  const [selectedThreat, setSelectedThreat] = useState<ThreatLocation | null>(null);
  const [filterLevel, setFilterLevel] = useState<string>('all');

  const filteredThreats = mockThreatData.filter(threat => 
    filterLevel === 'all' || threat.threatLevel === filterLevel
  );

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'critical': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getThreatIcon = (level: string) => {
    switch (level) {
      case 'critical': return AlertTriangle;
      case 'high': return Shield;
      case 'medium': return Activity;
      case 'low': return Eye;
      default: return MapPin;
    }
  };

  return (
    <Card variant="glass" className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
            Global Threat Map
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Real-time threat intelligence from around the world
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Levels</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <Button variant="ghost" size="sm">
            <Globe className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Simplified World Map Visualization */}
      <div className="relative bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-8 mb-6 min-h-[300px] overflow-hidden">
        <div className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500"%3E%3Cpath d="M150,100 Q200,80 250,100 T350,100 L400,120 Q450,100 500,120 T600,120 L650,140 Q700,120 750,140 T850,140" stroke="%23cbd5e1" stroke-width="2" fill="none" opacity="0.3"/%3E%3Cpath d="M100,200 Q150,180 200,200 T300,200 L350,220 Q400,200 450,220 T550,220 L600,240 Q650,220 700,240 T800,240" stroke="%23cbd5e1" stroke-width="2" fill="none" opacity="0.3"/%3E%3Cpath d="M200,300 Q250,280 300,300 T400,300 L450,320 Q500,300 550,320 T650,320 L700,340 Q750,320 800,340 T900,340" stroke="%23cbd5e1" stroke-width="2" fill="none" opacity="0.3"/%3E%3C/svg%3E')] opacity-20`} />
        
        {filteredThreats.map((threat, index) => {
          const Icon = getThreatIcon(threat.threatLevel);
          return (
            <motion.div
              key={threat.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2`}
              style={{
                left: `${((threat.lng + 180) / 360) * 100}%`,
                top: `${((90 - threat.lat) / 180) * 100}%`,
              }}
              onClick={() => setSelectedThreat(threat)}
            >
              <div className={`relative w-8 h-8 bg-${getThreatColor(threat.threatLevel)}-500 rounded-full flex items-center justify-center shadow-lg hover:scale-125 transition-transform duration-200`}>
                <Icon className="w-4 h-4 text-white" />
                <div className={`absolute inset-0 bg-${getThreatColor(threat.threatLevel)}-500 rounded-full animate-ping opacity-75`} />
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-medium text-neutral-900 dark:text-white whitespace-nowrap">
                {threat.threatCount}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Threat Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredThreats.map((threat) => (
          <motion.div
            key={threat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedThreat?.id === threat.id ? 'ring-2 ring-primary-500' : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'
            }`}
            onClick={() => setSelectedThreat(threat)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-neutral-500" />
                <span className="font-medium text-neutral-900 dark:text-white">
                  {threat.city}, {threat.country}
                </span>
              </div>
              <Badge variant={getThreatColor(threat.threatLevel)} size="sm">
                {threat.threatLevel}
              </Badge>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                Threats: {threat.threatCount}
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                {threat.lastActivity.toLocaleTimeString()}
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {threat.attackTypes.map((type) => (
                <Badge key={type} variant="default" size="sm">
                  {type}
                </Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center space-x-6">
        {['low', 'medium', 'high', 'critical'].map((level) => (
          <div key={level} className="flex items-center space-x-2">
            <div className={`w-3 h-3 bg-${getThreatColor(level)}-500 rounded-full`} />
            <span className="text-sm text-neutral-600 dark:text-neutral-400 capitalize">
              {level}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default ThreatMap;