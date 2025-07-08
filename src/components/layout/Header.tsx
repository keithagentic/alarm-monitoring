import React from 'react';
import { Bell, Settings, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAlarmStore } from '@/store/alarmStore';

export function Header() {
  const { systemStats } = useAlarmStore();

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200/60 px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-sm">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Grandstand</h1>
          </div>
          <Badge variant="info" className="ml-4 font-medium">
            AI-Enhanced Monitoring
          </Badge>
        </div>

        <div className="flex items-center space-x-8">
          {/* System Stats */}
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-1.5">
              <span className="text-gray-500">Active:</span>
              <span className="font-semibold text-danger">{systemStats.activeAlarms}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="text-gray-500">Today:</span>
              <span className="font-semibold text-gray-900">{systemStats.totalAlarmsToday}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="text-gray-500">Avg Response:</span>
              <span className="font-semibold text-gray-900">{systemStats.averageResponseTime}s</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="text-gray-500">AI Accuracy:</span>
              <span className="font-semibold text-success">{systemStats.aiAccuracy}%</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              {systemStats.activeAlarms > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-danger text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {systemStats.activeAlarms}
                </span>
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