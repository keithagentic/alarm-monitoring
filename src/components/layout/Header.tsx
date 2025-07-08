import React from 'react';
import { Bell, Settings, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAlarmStore } from '@/store/alarmStore';

export function Header() {
  const { systemStats } = useAlarmStore();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary-600" />
            <h1 className="text-xl font-bold text-gray-900">Grandstand</h1>
          </div>
          <Badge variant="info" className="ml-4">
            AI-Enhanced Monitoring
          </Badge>
        </div>

        <div className="flex items-center space-x-6">
          {/* System Stats */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <span className="text-gray-500">Active:</span>
              <span className="font-semibold text-red-600">{systemStats.activeAlarms}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-gray-500">Today:</span>
              <span className="font-semibold">{systemStats.totalAlarmsToday}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-gray-500">Avg Response:</span>
              <span className="font-semibold">{systemStats.averageResponseTime}s</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-gray-500">AI Accuracy:</span>
              <span className="font-semibold text-green-600">{systemStats.aiAccuracy}%</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              {systemStats.activeAlarms > 0 && (
                <Badge variant="danger" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {systemStats.activeAlarms}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}