import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAlarmStore } from '@/store/alarmStore';
import {
  Users,
  Clock,
  TrendingUp,
  Activity,
  Brain,
  AlertTriangle,
  CheckCircle,
  Coffee,
  UserX
} from 'lucide-react';

export function CSOManagement() {
  const { csos, alarms } = useAlarmStore();
  const [selectedCSO, setSelectedCSO] = useState<string | null>(null);

  const getStatusIcon = (status: string) => {
    const icons = {
      available: <CheckCircle className="h-4 w-4 text-green-600" />,
      busy: <Activity className="h-4 w-4 text-yellow-600" />,
      break: <Coffee className="h-4 w-4 text-blue-600" />,
      offline: <UserX className="h-4 w-4 text-gray-600" />
    };
    return icons[status as keyof typeof icons] || icons.offline;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      available: 'success',
      busy: 'warning',
      break: 'info',
      offline: 'default'
    };
    return colors[status as keyof typeof colors] || 'default';
  };

  const getAIAssistanceColor = (level: string) => {
    const colors = {
      minimal: 'default',
      moderate: 'info',
      high: 'success'
    };
    return colors[level as keyof typeof colors] || 'default';
  };

  const getCSOAlarms = (csoId: string) => {
    return alarms.filter(alarm => alarm.assignedCSO === csoId);
  };

  const getPerformanceGrade = (accuracy: number) => {
    if (accuracy >= 95) return { grade: 'A+', color: 'text-green-600' };
    if (accuracy >= 90) return { grade: 'A', color: 'text-green-600' };
    if (accuracy >= 85) return { grade: 'B+', color: 'text-blue-600' };
    if (accuracy >= 80) return { grade: 'B', color: 'text-blue-600' };
    return { grade: 'C', color: 'text-yellow-600' };
  };

  const systemStats = {
    totalCSOs: csos.length,
    available: csos.filter(cso => cso.status === 'available').length,
    busy: csos.filter(cso => cso.status === 'busy').length,
    averagePerformance: Math.round(csos.reduce((sum, cso) => sum + cso.performance.accuracy, 0) / csos.length),
    totalAlarmsHandled: csos.reduce((sum, cso) => sum + cso.performance.alarmsHandled, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">CSO Management</h2>
          <p className="text-gray-600">Monitor and manage Central Station Operators</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="info" className="flex items-center space-x-1">
            <Brain className="h-3 w-3" />
            <span>AI-Enhanced Performance</span>
          </Badge>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total CSOs</p>
                <p className="text-2xl font-bold text-gray-900">{systemStats.totalCSOs}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-2xl font-bold text-green-600">{systemStats.available}</p>
                <p className="text-xs text-gray-500">{systemStats.busy} busy</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Performance</p>
                <p className="text-2xl font-bold text-purple-600">{systemStats.averagePerformance}%</p>
                <p className="text-xs text-gray-500">AI-enhanced</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Alarms Today</p>
                <p className="text-2xl font-bold text-orange-600">{systemStats.totalAlarmsHandled}</p>
                <p className="text-xs text-gray-500">Total handled</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CSO List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {csos.map((cso) => {
          const csoAlarms = getCSOAlarms(cso.id);
          const performance = getPerformanceGrade(cso.performance.accuracy);
          
          return (
            <Card key={cso.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{cso.name}</CardTitle>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(cso.status)}
                    <Badge variant={getStatusColor(cso.status) as any}>
                      {cso.status}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{cso.email}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Current Workload */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Current Alarms</span>
                    <span className="text-sm font-bold text-red-600">{csoAlarms.length}</span>
                  </div>
                  {csoAlarms.length > 0 && (
                    <div className="space-y-1">
                      {csoAlarms.slice(0, 2).map((alarm) => (
                        <div key={alarm.id} className="text-xs text-gray-600 flex items-center justify-between">
                          <span className="capitalize">{alarm.type} - {alarm.location.address.split(',')[0]}</span>
                          <Badge variant={alarm.priority === 'critical' ? 'danger' : 'warning'} className="text-xs">
                            {alarm.priority}
                          </Badge>
                        </div>
                      ))}
                      {csoAlarms.length > 2 && (
                        <p className="text-xs text-gray-500">+{csoAlarms.length - 2} more</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Response Time</p>
                    <p className="font-semibold">{cso.performance.averageResponseTime}s</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Handled Today</p>
                    <p className="font-semibold">{cso.performance.alarmsHandled}</p>
                  </div>
                </div>

                {/* Accuracy Score */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Accuracy Score</span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-lg font-bold ${performance.color}`}>
                      {performance.grade}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({cso.performance.accuracy}%)
                    </span>
                  </div>
                </div>

                {/* AI Assistance Level */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">AI Assistance</span>
                  <Badge variant={getAIAssistanceColor(cso.aiAssistanceLevel) as any} className="capitalize">
                    {cso.aiAssistanceLevel}
                  </Badge>
                </div>

                {/* Action Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setSelectedCSO(selectedCSO === cso.id ? null : cso.id)}
                >
                  {selectedCSO === cso.id ? 'Hide Details' : 'View Details'}
                </Button>

                {/* Expanded Details */}
                {selectedCSO === cso.id && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg space-y-2">
                    <h4 className="font-medium text-gray-900">Performance Insights</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>• Average response time improved by 15% with AI assistance</p>
                      <p>• False alarm detection rate: 89%</p>
                      <p>• Customer satisfaction score: 4.8/5</p>
                      <p>• AI recommendations accepted: 94%</p>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-3">
                      <Button size="sm" variant="outline">Message</Button>
                      <Button size="sm" variant="outline">Schedule</Button>
                      <Button size="sm" variant="outline">Reports</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Performance Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Team Performance Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">+60%</div>
              <p className="text-sm text-gray-600">Productivity Increase</p>
              <p className="text-xs text-gray-500">With AI assistance</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">-45%</div>
              <p className="text-sm text-gray-600">Response Time Reduction</p>
              <p className="text-xs text-gray-500">AI pre-processing</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">94%</div>
              <p className="text-sm text-gray-600">AI Recommendation Accuracy</p>
              <p className="text-xs text-gray-500">Continuously improving</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}