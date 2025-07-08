import React from 'react';
import { 
  Home, 
  AlertTriangle, 
  Users, 
  BarChart3, 
  MessageSquare, 
  Settings,
  Brain,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'alarms', label: 'Active Alarms', icon: AlertTriangle },
  { id: 'csos', label: 'CSO Status', icon: Users },
  { id: 'ai-agents', label: 'AI Agents', icon: Brain },
  { id: 'communications', label: 'Communications', icon: MessageSquare },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'system', label: 'System Health', icon: Activity },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-50/50 border-r border-gray-200/60 h-full">
      <nav className="p-4 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                'w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm'
              )}
            >
              <Icon className={cn(
                'h-5 w-5 transition-colors',
                isActive ? 'text-primary-foreground' : 'text-gray-400 group-hover:text-gray-600'
              )} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}