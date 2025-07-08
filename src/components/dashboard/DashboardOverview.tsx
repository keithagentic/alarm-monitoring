import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useAlarmStore } from '@/store/alarmStore';
import { 
  AlertTriangle, 
  Users, 
  Clock, 
  TrendingUp, 
  Brain,
  Shield
} from 'lucide-react';

export function DashboardOverview() {
  const { systemStats, alarms, csos } = useAlarmStore();
  
  const criticalAlarms = alarms.filter(alarm => alarm.priority === 'critical').length;
  const availableCSOs = csos.filter(cso => cso.status === 'available').length;

  const statCards = [
    {
      title: 'Active Alarms',
      value: systemStats.activeAlarms,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      subtitle: `${criticalAlarms} critical`
    },
    {
      title: 'Available CSOs',
      value: availableCSOs,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      subtitle: `${csos.length} total`
    },
    {
      title: 'Avg Response Time',
      value: `${systemStats.averageResponseTime}s`,
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      subtitle: '15% improvement'
    },
    {
      title: 'AI Accuracy',
      value: `${systemStats.aiAccuracy}%`,
      icon: Brain,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      subtitle: 'Learning active'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Command Center</h2>
          <p className="text-gray-600">AI-enhanced alarm monitoring dashboard</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="success" className="flex items-center space-x-1">
            <Shield className="h-3 w-3" />
            <span>System Operational</span>
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span>Recent Alarms</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alarms.slice(0, 3).map((alarm) => (
                <div key={alarm.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Badge variant={alarm.priority === 'critical' ? 'danger' : 'warning'}>
                        {alarm.type}
                      </Badge>
                      <span className="text-sm font-medium">{alarm.location.address}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {alarm.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  <Badge variant={alarm.status === 'new' ? 'danger' : 'info'}>
                    {alarm.status.replace('_', ' ')}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-purple-600" />
              <span>AI Agent Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-green-900">Triage Agent</p>
                  <p className="text-sm text-green-700">Processing alarms</p>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-blue-900">Communication Agent</p>
                  <p className="text-sm text-blue-700">Managing notifications</p>
                </div>
                <Badge variant="info">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="font-medium text-purple-900">Analytics Agent</p>
                  <p className="text-sm text-purple-700">Learning patterns</p>
                </div>
                <Badge variant="info">Learning</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}