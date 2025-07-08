import { create } from 'zustand';
import { Alarm, CSO, SystemStats } from '@/types';

interface AlarmStore {
  alarms: Alarm[];
  csos: CSO[];
  systemStats: SystemStats;
  selectedAlarm: Alarm | null;
  
  // Actions
  setSelectedAlarm: (alarm: Alarm | null) => void;
  updateAlarmStatus: (alarmId: string, status: Alarm['status']) => void;
  assignAlarmToCSO: (alarmId: string, csoId: string) => void;
  addAlarmNote: (alarmId: string, content: string, author: string) => void;
  
  // Initialize with mock data
  initializeMockData: () => void;
}

export const useAlarmStore = create<AlarmStore>((set, get) => ({
  alarms: [],
  csos: [],
  systemStats: {
    activeAlarms: 0,
    totalAlarmsToday: 0,
    averageResponseTime: 0,
    falseAlarmRate: 0,
    aiAccuracy: 0,
    csoUtilization: 0
  },
  selectedAlarm: null,

  setSelectedAlarm: (alarm) => set({ selectedAlarm: alarm }),

  updateAlarmStatus: (alarmId, status) => set((state) => ({
    alarms: state.alarms.map(alarm =>
      alarm.id === alarmId ? { ...alarm, status } : alarm
    )
  })),

  assignAlarmToCSO: (alarmId, csoId) => set((state) => ({
    alarms: state.alarms.map(alarm =>
      alarm.id === alarmId ? { ...alarm, assignedCSO: csoId } : alarm
    ),
    csos: state.csos.map(cso =>
      cso.id === csoId 
        ? { ...cso, currentAlarms: [...cso.currentAlarms, alarmId] }
        : cso
    )
  })),

  addAlarmNote: (alarmId, content, author) => set((state) => ({
    alarms: state.alarms.map(alarm =>
      alarm.id === alarmId 
        ? {
            ...alarm,
            notes: [
              ...alarm.notes,
              {
                id: `note-${Date.now()}`,
                timestamp: new Date(),
                author,
                content,
                type: 'cso' as const
              }
            ]
          }
        : alarm
    )
  })),

  initializeMockData: () => {
    const mockAlarms: Alarm[] = [
      {
        id: 'alarm-001',
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        type: 'fire',
        priority: 'critical',
        status: 'new',
        location: {
          address: '123 Main St, Downtown',
          zone: 'Zone A-1',
          coordinates: { lat: 40.7128, lng: -74.0060 }
        },
        customer: {
          id: 'cust-001',
          name: 'Downtown Office Complex',
          phone: '+1-555-0123',
          contactPerson: 'John Smith'
        },
        device: {
          id: 'dev-fire-001',
          type: 'Smoke Detector',
          description: 'Main lobby smoke detector'
        },
        aiAnalysis: {
          riskScore: 95,
          confidence: 88,
          recommendation: 'dispatch',
          reasoning: 'High-confidence fire alarm with multiple sensor triggers in commercial building during business hours.',
          contextualInfo: [
            'Multiple smoke detectors activated',
            'Building occupancy: High (business hours)',
            'No recent maintenance records',
            'Weather: Clear, no environmental factors'
          ],
          predictedOutcome: 'Likely genuine fire emergency requiring immediate response',
          suggestedActions: [
            'Dispatch fire department immediately',
            'Contact building security',
            'Initiate evacuation procedures',
            'Monitor additional sensors'
          ]
        },
        notes: [
          {
            id: 'note-001',
            timestamp: new Date(Date.now() - 240000),
            author: 'AI Agent',
            content: 'Initial analysis complete. High-priority fire alarm detected.',
            type: 'ai'
          }
        ]
      },
      {
        id: 'alarm-002',
        timestamp: new Date(Date.now() - 600000), // 10 minutes ago
        type: 'intrusion',
        priority: 'high',
        status: 'acknowledged',
        location: {
          address: '456 Oak Avenue, Residential',
          zone: 'Zone B-3'
        },
        customer: {
          id: 'cust-002',
          name: 'Johnson Residence',
          phone: '+1-555-0456'
        },
        device: {
          id: 'dev-motion-002',
          type: 'Motion Sensor',
          description: 'Front entrance motion detector'
        },
        aiAnalysis: {
          riskScore: 72,
          confidence: 65,
          recommendation: 'verify',
          reasoning: 'Motion detected at residential property during typical away hours. Moderate confidence due to single sensor activation.',
          contextualInfo: [
            'Single motion sensor triggered',
            'Homeowner typically away during this time',
            'No recent false alarms',
            'Neighborhood crime rate: Low'
          ],
          predictedOutcome: 'Possible intrusion, verification recommended before dispatch',
          suggestedActions: [
            'Contact homeowner for verification',
            'Check additional sensors',
            'Review camera footage if available',
            'Monitor for additional triggers'
          ]
        },
        assignedCSO: 'cso-001',
        notes: [
          {
            id: 'note-002',
            timestamp: new Date(Date.now() - 480000),
            author: 'AI Agent',
            content: 'Motion detected at front entrance. Attempting customer contact.',
            type: 'ai'
          },
          {
            id: 'note-003',
            timestamp: new Date(Date.now() - 420000),
            author: 'Sarah Chen',
            content: 'Acknowledged alarm. Attempting to contact homeowner.',
            type: 'cso'
          }
        ]
      },
      {
        id: 'alarm-003',
        timestamp: new Date(Date.now() - 900000), // 15 minutes ago
        type: 'medical',
        priority: 'critical',
        status: 'dispatched',
        location: {
          address: '789 Senior Living Way, Healthcare District',
          zone: 'Zone C-2'
        },
        customer: {
          id: 'cust-003',
          name: 'Sunset Senior Living',
          phone: '+1-555-0789',
          contactPerson: 'Nurse Station'
        },
        device: {
          id: 'dev-medical-003',
          type: 'Medical Alert Button',
          description: 'Room 204 emergency button'
        },
        aiAnalysis: {
          riskScore: 98,
          confidence: 92,
          recommendation: 'dispatch',
          reasoning: 'Medical emergency button activated in senior living facility. High confidence due to device type and location.',
          contextualInfo: [
            'Medical alert button pressed',
            'Senior living facility',
            'Patient history: Cardiac issues',
            'Response time critical'
          ],
          predictedOutcome: 'Genuine medical emergency requiring immediate response',
          suggestedActions: [
            'Dispatch EMS immediately',
            'Contact facility medical staff',
            'Prepare for potential cardiac emergency',
            'Monitor patient status'
          ]
        },
        assignedCSO: 'cso-002',
        responseTime: 45,
        notes: [
          {
            id: 'note-004',
            timestamp: new Date(Date.now() - 840000),
            author: 'AI Agent',
            content: 'Medical emergency detected. High priority dispatch recommended.',
            type: 'ai'
          },
          {
            id: 'note-005',
            timestamp: new Date(Date.now() - 780000),
            author: 'Mike Rodriguez',
            content: 'EMS dispatched. ETA 3 minutes. Contacted facility nurse station.',
            type: 'cso'
          }
        ]
      }
    ];

    const mockCSOs: CSO[] = [
      {
        id: 'cso-001',
        name: 'Sarah Chen',
        email: 'sarah.chen@becklar.com',
        status: 'busy',
        currentAlarms: ['alarm-002'],
        performance: {
          averageResponseTime: 32,
          alarmsHandled: 156,
          accuracy: 94
        },
        aiAssistanceLevel: 'high'
      },
      {
        id: 'cso-002',
        name: 'Mike Rodriguez',
        email: 'mike.rodriguez@becklar.com',
        status: 'busy',
        currentAlarms: ['alarm-003'],
        performance: {
          averageResponseTime: 28,
          alarmsHandled: 203,
          accuracy: 97
        },
        aiAssistanceLevel: 'moderate'
      },
      {
        id: 'cso-003',
        name: 'Emily Johnson',
        email: 'emily.johnson@becklar.com',
        status: 'available',
        currentAlarms: [],
        performance: {
          averageResponseTime: 35,
          alarmsHandled: 134,
          accuracy: 92
        },
        aiAssistanceLevel: 'high'
      }
    ];

    const mockStats: SystemStats = {
      activeAlarms: 3,
      totalAlarmsToday: 47,
      averageResponseTime: 31,
      falseAlarmRate: 12,
      aiAccuracy: 89,
      csoUtilization: 67
    };

    set({
      alarms: mockAlarms,
      csos: mockCSOs,
      systemStats: mockStats
    });
  }
}));