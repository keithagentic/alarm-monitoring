import React from 'react';
import { Bell, Settings, User, Menu } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useAppStore } from '../../store/useAppStore';

export const Header: React.FC = () => {
  const { currentCSO, notifications, sidebarOpen, setSidebarOpen } = useAppStore();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Grandstand</h1>
              <p className="text-xs text-gray-500">AI-Powered Alarm Monitoring</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* System Status */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">System Online</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge variant="danger" size="sm" className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 flex items-center justify-center p-0">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Settings */}
          <Button variant="ghost" size="sm">
            <Settings className="h-5 w-5" />
          </Button>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{currentCSO.name}</p>
              <p className="text-xs text-gray-500 capitalize">{currentCSO.status}</p>
            </div>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};