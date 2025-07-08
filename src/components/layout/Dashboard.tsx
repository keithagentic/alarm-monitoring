import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { AlertTriangle, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { formatTime, getPriorityColor, getStatusColor } from '../../lib/utils';

export const Dashboard: React.FC = () => {
  const { alarms, currentCSO, setActiveAlarm, setActiveView } = useAppStore();
  
  const stats = {
    total: alarms.length,
    new: alarms.filter(a => a.status === 'new').length,
    inProgress: alarms.filter(a => ['acknowledged', 'investigating', 'dispatched'].includes(a.status)).length,
    resolved: alarms.filter(a => a.status === 'resolved').length,
  };

  const recentAlarms = alarms
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {currentCSO.name}
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your alarm monitoring system today.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">AI Agents Active</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alarms</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              +2 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Alarms</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.new}</div>
            <p className="text-xs text-muted-foreground">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
            <p className="text-xs text-muted-foreground">
              Being handled by CSOs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
            <p className="text-xs text-muted-foreground">
              Average response: 42s
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alarms */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Alarms</CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setActiveView('alarms')}
            >
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAlarms.map((alarm) => (
              <div
                key={alarm.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setActiveAlarm(alarm)}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col space-y-1">
                    <Badge className={getPriorityColor(alarm.priority)} size="sm">
                      {alarm.priority}
                    </Badge>
                    <Badge className={getStatusColor(alarm.status)} size="sm">
                      {alarm.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 capitalize">
                      {alarm.type} Alarm
                    </p>
                    <p className="text-sm text-gray-600">{alarm.location.address}</p>
                    <p className="text-xs text-gray-500">{alarm.customer.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {formatTime(alarm.timestamp)}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-500">
                      AI Score: {alarm.aiAnalysis.riskScore}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CSO Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Performance Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Alarms Handled</span>
                <span className="font-medium">{currentCSO.performance.alarmsHandledToday}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Average Response Time</span>
                <span className="font-medium">{currentCSO.performance.averageResponseTime}s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Accuracy Score</span>
                <span className="font-medium text-green-600">{currentCSO.performance.accuracyScore}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">AI Assistance Level</span>
                <Badge variant="success" size="sm" className="capitalize">
                  {currentCSO.aiAssistanceLevel}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Agent Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Triage Accuracy</span>
                <span className="font-medium text-green-600">94%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">False Alarm Detection</span>
                <span className="font-medium text-green-600">89%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Response Time Improvement</span>
                <span className="font-medium text-green-600">+60%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Automation Rate</span>
                <span className="font-medium">35%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};