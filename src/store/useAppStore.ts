import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Alarm, CSO, AIAgent, Notification, AIAgentResponse } from '../types';

interface AppState {
  // Alarm Management
  alarms: Alarm[];
  activeAlarm: Alarm | null;
  
  // CSO Management
  currentCSO: CSO;
  allCSOs: CSO[];
  
  // AI Agent State
  aiAgents: {
    triageAgent: AIAgent;
    communicationAgent: AIAgent;
    analyticsAgent: AIAgent;
  };
  
  // UI State
  sidebarOpen: boolean;
  activeView: 'dashboard' | 'alarms' | 'analytics' | 'settings';
  notifications: Notification[];
  
  // Actions
  setActiveAlarm: (alarm: Alarm | null) => void;
  updateAlarmStatus: (id: string, status: Alarm['status']) => void;
  assignAlarmToCSO: (alarmId: string, csoId: string) => void;
  getAIRecommendation: (alarmId: string) => Promise<AIAgentResponse>;
  setSidebarOpen: (open: boolean) => void;
  setActiveView: (view: AppState['activeView']) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  markNotificationRead: (id: string) => void;
}

// Mock data
const mockAlarms: Alarm[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    type: 'fire',
    priority: 'critical',
    status: 'new',
    location: {
      address: '123 Main St, Downtown',
      zone: 'Zone A',
    },
    customer: {
      id: 'cust1',
      name: 'Downtown Office Complex',
      phone: '+1-555-0123',
      contactPerson: 'John Smith',
    },
    aiAnalysis: {
      riskScore: 85,
      confidence: 92,
      recommendations: ['Immediate dispatch required', 'Contact fire department'],
      falseAlarmProbability: 15,
      suggestedActions: ['Verify with customer', 'Dispatch emergency services'],
    },
    notes: [],
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 600000), // 10 minutes ago
    type: 'intrusion',
    priority: 'high',
    status: 'acknowledged',
    location: {
      address: '456 Oak Ave, Residential',
      zone: 'Zone B',
    },
    customer: {
      id: 'cust2',
      name: 'Smith Residence',
      phone: '+1-555-0456',
      contactPerson: 'Jane Smith',
    },
    aiAnalysis: {
      riskScore: 70,
      confidence: 88,
      recommendations: ['Contact customer first', 'Check for false alarm indicators'],
      falseAlarmProbability: 35,
      suggestedActions: ['Call customer', 'Review camera footage if available'],
    },
    assignedCSO: 'cso1',
    notes: ['Customer contacted - no answer'],
  },
];

const mockCSOs: CSO[] = [
  {
    id: 'cso1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@becklar.com',
    status: 'available',
    currentAlarms: ['2'],
    performance: {
      averageResponseTime: 45,
      alarmsHandledToday: 12,
      accuracyScore: 94,
    },
    aiAssistanceLevel: 'enhanced',
  },
  {
    id: 'cso2',
    name: 'Mike Chen',
    email: 'mike.chen@becklar.com',
    status: 'busy',
    currentAlarms: ['3', '4'],
    performance: {
      averageResponseTime: 38,
      alarmsHandledToday: 15,
      accuracyScore: 97,
    },
    aiAssistanceLevel: 'expert',
  },
];

const mockAIAgents = {
  triageAgent: {
    id: 'triage-1',
    type: 'triage' as const,
    status: 'active' as const,
    confidence: 94,
    lastActivity: new Date(),
  },
  communicationAgent: {
    id: 'comm-1',
    type: 'communication' as const,
    status: 'active' as const,
    confidence: 89,
    lastActivity: new Date(),
  },
  analyticsAgent: {
    id: 'analytics-1',
    type: 'analytics' as const,
    status: 'processing' as const,
    confidence: 91,
    lastActivity: new Date(),
  },
};

// Mock AI response generator
const generateAIResponse = (alarmId: string): AIAgentResponse => {
  const responses = [
    {
      recommendation: 'High probability genuine alarm - recommend immediate dispatch',
      reasoning: ['Sensor pattern matches historical fire events', 'No recent maintenance activity', 'Customer has reliable alarm history'],
      suggestedActions: ['Contact fire department', 'Notify customer', 'Monitor for updates'],
    },
    {
      recommendation: 'Possible false alarm - verify before dispatch',
      reasoning: ['Similar pattern detected in recent false alarms', 'Maintenance scheduled today', 'Weather conditions may affect sensors'],
      suggestedActions: ['Contact customer first', 'Check maintenance logs', 'Monitor for 2 minutes before escalating'],
    },
  ];
  
  const response = responses[Math.floor(Math.random() * responses.length)];
  
  return {
    agentType: 'triage',
    timestamp: new Date(),
    confidence: Math.floor(Math.random() * 20) + 80, // 80-100
    ...response,
  };
};

export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      // Initial state
      alarms: mockAlarms,
      activeAlarm: null,
      currentCSO: mockCSOs[0],
      allCSOs: mockCSOs,
      aiAgents: mockAIAgents,
      sidebarOpen: true,
      activeView: 'dashboard',
      notifications: [
        {
          id: '1',
          type: 'info',
          title: 'AI Agent Update',
          message: 'Triage agent performance improved by 5%',
          timestamp: new Date(Date.now() - 120000),
          read: false,
        },
      ],
      
      // Actions
      setActiveAlarm: (alarm) => set({ activeAlarm: alarm }),
      
      updateAlarmStatus: (id, status) => set((state) => ({
        alarms: state.alarms.map((alarm) =>
          alarm.id === id ? { ...alarm, status } : alarm
        ),
      })),
      
      assignAlarmToCSO: (alarmId, csoId) => set((state) => ({
        alarms: state.alarms.map((alarm) =>
          alarm.id === alarmId ? { ...alarm, assignedCSO: csoId } : alarm
        ),
      })),
      
      getAIRecommendation: async (alarmId) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        return generateAIResponse(alarmId);
      },
      
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setActiveView: (view) => set({ activeView: view }),
      
      addNotification: (notification) => set((state) => ({
        notifications: [
          {
            ...notification,
            id: Date.now().toString(),
          },
          ...state.notifications,
        ],
      })),
      
      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map((notif) =>
          notif.id === id ? { ...notif, read: true } : notif
        ),
      })),
    }),
    {
      name: 'grandstand-store',
    }
  )
);