export interface Alarm {
  id: string;
  timestamp: Date;
  type: 'fire' | 'intrusion' | 'medical' | 'panic' | 'technical';
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'new' | 'acknowledged' | 'investigating' | 'dispatched' | 'resolved' | 'false_alarm';
  location: {
    address: string;
    coordinates?: { lat: number; lng: number };
    zone?: string;
  };
  customer: {
    id: string;
    name: string;
    phone: string;
    contactPerson: string;
  };
  aiAnalysis: {
    riskScore: number; // 0-100
    confidence: number; // 0-100
    recommendations: string[];
    falseAlarmProbability: number;
    suggestedActions: string[];
  };
  assignedCSO?: string;
  responseTime?: number; // seconds
  notes: string[];
}

export interface CSO {
  id: string;
  name: string;
  email: string;
  status: 'available' | 'busy' | 'break' | 'offline';
  currentAlarms: string[];
  performance: {
    averageResponseTime: number;
    alarmsHandledToday: number;
    accuracyScore: number;
  };
  aiAssistanceLevel: 'basic' | 'enhanced' | 'expert';
}

export interface AIAgent {
  id: string;
  type: 'triage' | 'communication' | 'documentation' | 'analytics';
  status: 'active' | 'inactive' | 'processing';
  confidence: number;
  lastActivity: Date;
}

export interface AIAgentResponse {
  agentType: 'triage' | 'communication' | 'documentation' | 'analytics';
  timestamp: Date;
  confidence: number;
  recommendation: string;
  reasoning: string[];
  suggestedActions: string[];
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}