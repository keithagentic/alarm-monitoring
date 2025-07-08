import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAlarmStore } from '@/store/alarmStore';
import { 
  AlertTriangle, 
  Clock, 
  User, 
  Brain,
  Phone,
  MapPin,
  Filter,
  Search
} from 'lucide-react';
import { AlarmDetailModal } from './AlarmDetailModal';
import { Alarm } from '@/types';

export function AlarmList() {
  const { alarms, csos, setSelectedAlarm, selectedAlarm } = useAlarmStore();
  const [filter, setFilter] = useState<'all' | 'new' | 'critical'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAlarms = alarms.filter(alarm => {
    const matchesFilter = filter === 'all' || 
      (filter === 'new' && alarm.status === 'new') ||
      (filter === 'critical' && alarm.priority === 'critical');
    
    const matchesSearch = searchTerm === '' || 
      alarm.location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alarm.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alarm.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getAlarmTypeIcon = (type: string) => {
    const icons = {
      fire: '🔥',
      intrusion: '🚨',
      medical: '🏥',
      panic: '⚠️',
      technical: '🔧'
    };
    return icons[type as keyof typeof icons] || '⚠️';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      critical: 'danger',
      high: 'warning',
      medium: 'info',
      low: 'success'
    };
    return colors[priority as keyof typeof colors] || 'info';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      new: 'danger',
      acknowledged: 'warning',
      in_progress: 'info',
      dispatched: 'info',
      resolved: 'success',
      false_alarm: 'default'
    };
    return colors[status as keyof typeof colors] || 'default';
  };

  const getAssignedCSOName = (csoId?: string) => {
    if (!csoId) return 'Unassigned';
    const cso = csos.find(c => c.id === csoId);
    return cso?.name || 'Unknown CSO';
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Active Alarms</h2>
          <p className="text-gray-600">AI-enhanced alarm monitoring and response</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search alarms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Alarms</option>
            <option value="new">New Only</option>
            <option value="critical">Critical Only</option>
          </select>
        </div>
      </div>

      {/* Alarms Grid */}
      <div className="grid gap-4">
        {filteredAlarms.map((alarm) => (
          <Card key={alarm.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  {/* Alarm Type Icon */}
                  <div className="text-2xl">{getAlarmTypeIcon(alarm.type)}</div>
                  
                  {/* Main Alarm Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 capitalize">
                        {alarm.type} Alarm
                      </h3>
                      <Badge variant={getPriorityColor(alarm.priority) as any}>
                        {alarm.priority}
                      </Badge>
                      <Badge variant={getStatusColor(alarm.status) as any}>
                        {alarm.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{alarm.location.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{alarm.customer.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{formatTimeAgo(alarm.timestamp)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>CSO: {getAssignedCSOName(alarm.assignedCSO)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Analysis & Actions */}
                <div className="flex flex-col items-end space-y-3 ml-4">
                  {alarm.aiAnalysis && (
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <Brain className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium">AI Risk Score</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-600">
                        {alarm.aiAnalysis.riskScore}%
                      </div>
                      <div className="text-xs text-gray-500">
                        {alarm.aiAnalysis.confidence}% confidence
                      </div>
                    </div>
                  )}
                  
                  <Button
                    onClick={() => setSelectedAlarm(alarm)}
                    size="sm"
                    className="whitespace-nowrap"
                  >
                    View Details
                  </Button>
                </div>
              </div>

              {/* AI Recommendation Preview */}
              {alarm.aiAnalysis && (
                <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-start space-x-2">
                    <Brain className="h-4 w-4 text-purple-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-purple-900 mb-1">
                        AI Recommendation: {alarm.aiAnalysis.recommendation}
                      </p>
                      <p className="text-xs text-purple-700">
                        {alarm.aiAnalysis.reasoning}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAlarms.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No alarms found</h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? 'No active alarms match your search criteria.'
                : `No ${filter} alarms found.`
              }
            </p>
          </CardContent>
        </Card>
      )}

      {/* Alarm Detail Modal */}
      {selectedAlarm && (
        <AlarmDetailModal
          alarm={selectedAlarm}
          isOpen={!!selectedAlarm}
          onClose={() => setSelectedAlarm(null)}
        />
      )}
    </div>
  );
}