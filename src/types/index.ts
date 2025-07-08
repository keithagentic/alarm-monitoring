// Core data models for the alarm monitoring system

export interface Alarm {
  id: string;
  timestamp: Date;
  type: 'fire' | 'intrusion' | 'medical' | 'panic' | 'technical';
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'new' | 'acknowledged' | 'in_progress' | 'dispatched' | 'resolved' | 'false_alarm';
  location: {
    address: string;
    zone?: string;
    coordinates?: { lat: number; lng: number };
  };
  customer: {
    id: string;
    name: string;
    phone: string;
    contactPerson?: string;
  };
  device: {
    id: string;
    type: string;
    description: string;
  };
  aiAnalysis?: AIAnalysis;
  assignedCSO?: string;
  notes: AlarmNote[];
  responseTime?: number; // in seconds
}

export interface AIAnalysis {
  riskScore: number; // 0-100
  confidence: number; // 0-100
  recommendation: 'dispatch' | 'verify' | 'monitor' | 'false_alarm';
  reasoning: string;
  contextualInfo: string[];
  predictedOutcome: string;
  suggestedActions: string[];
}

export interface AlarmNote {
  id: string;
  timestamp: Date;
  author: string;
  content: string;
  type: 'system' | 'cso' | 'ai';
}

export interface CSO {
  id: string;
  name: string;
  email: string;
  status: 'available' | 'busy' | 'break' | 'offline';
  currentAlarms: string[];
  performance: {
    averageResponseTime: number;
    alarmsHandled: number;
    accuracy: number;
  };
  aiAssistanceLevel: 'minimal' | 'moderate' | 'high';
}

export interface SystemStats {
  activeAlarms: number;
  totalAlarmsToday: number;
  averageResponseTime: number;
  falseAlarmRate: number;
  aiAccuracy: number;
  csoUtilization: number;
}