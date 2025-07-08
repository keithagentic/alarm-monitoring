import React from 'react';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  BarChart3, 
  Settings,
  Bot,
  Activity,
  Users
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useAppStore } from '../../store/useAppStore';
import { cn } from '../../lib/utils';

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView, sidebarOpen, aiAgents, alarms } = useAppStore();
  
  const newAlarmsCount = alarms.filter(alarm => alarm.status === 'new').length;
  
  const menuItems = [
    {
      id: 'dashboard' as const,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'alarms' as const,
      label: 'Alarms',
      icon: AlertTriangle,
      badge: newAlarmsCount > 0 ? newAlarmsCount.toString() : null,
    },
    {
      id: 'analytics' as const,
      label: 'Analytics',
      icon: BarChart3,
      badge: null,
    },
    {
      id: 'settings' as const,
      label: 'Settings',
      icon: Settings,
      badge: null,
    },
  ];

  if (!sidebarOpen) {
    return null;
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-700 border border-primary-200'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <div className="flex items-center space-x-3">
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <Badge variant="danger" size="sm">
                  {item.badge}
                </Badge>
              )}
            </button>
          );
        })}
      </nav>

      {/* AI Agents Status */}
      <div className="px-4 py-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
          <Bot className="h-4 w-4 mr-2" />
          AI Agents
        </h3>
        <div className="space-y-2">
          {Object.values(aiAgents).map((agent) => (
            <div key={agent.id} className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <div className={cn(
                  'w-2 h-2 rounded-full',
                  agent.status === 'active' ? 'bg-green-500' : 
                  agent.status === 'processing' ? 'bg-yellow-500' : 'bg-gray-400'
                )} />
                <span className="text-gray-600 capitalize">{agent.type}</span>
              </div>
              <span className="text-gray-500">{agent.confidence}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4 py-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
          <Activity className="h-4 w-4 mr-2" />
          Quick Stats
        </h3>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-600">Active Alarms</span>
            <span className="font-medium">{alarms.filter(a => a.status !== 'resolved').length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Response Time</span>
            <span className="font-medium">42s avg</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">AI Accuracy</span>
            <span className="font-medium text-green-600">94%</span>
          </div>
        </div>
      </div>
    </aside>
  );
};