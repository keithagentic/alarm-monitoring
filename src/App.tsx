import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { AlarmList } from '@/components/alarm/AlarmList';
import { CSOManagement } from '@/components/cso/CSOManagement';
import { useAlarmStore } from '@/store/alarmStore';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { initializeMockData } = useAlarmStore();

  useEffect(() => {
    // Initialize mock data when app loads
    initializeMockData();
  }, [initializeMockData]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'alarms':
        return <AlarmList />;
      case 'csos':
        return <CSOManagement />;
      case 'ai-agents':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">AI Agents</h2>
              <p className="text-gray-600">AI agent management interface coming soon...</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-2 capitalize">{activeTab}</h2>
              <p className="text-gray-600">This section is under development...</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <Header />
      <div className="flex h-[calc(100vh-73px)]">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 overflow-auto bg-gradient-to-br from-gray-50/50 to-white">
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;