import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useAlarmStore } from '@/store/alarmStore';
import { Alarm } from '@/types';
import {
  AlertTriangle,
  Clock,
  User,
  MapPin,
  Phone,
  Brain,
  MessageSquare,
  CheckCircle,
  XCircle,
  Send,
  Shield
} from 'lucide-react';

interface AlarmDetailModalProps {
  alarm: Alarm;
  isOpen: boolean;
  onClose: () => void;
}

export function AlarmDetailModal({ alarm, isOpen, onClose }: AlarmDetailModalProps) {
  const { updateAlarmStatus, assignAlarmToCSO, addAlarmNote, csos } = useAlarmStore();
  const [newNote, setNewNote] = useState('');
  const [selectedCSO, setSelectedCSO] = useState(alarm.assignedCSO || '');

  const handleStatusUpdate = (status: Alarm['status']) => {
    updateAlarmStatus(alarm.id, status);
  };

  const handleAssignCSO = () => {
    if (selectedCSO) {
      assignAlarmToCSO(alarm.id, selectedCSO);
    }
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      addAlarmNote(alarm.id, newNote.trim(), 'Current CSO');
      setNewNote('');
    }
  };

  const getAlarmTypeIcon = (type: string) => {
    const icons = {
      fire: '🔥',
      intrusion: '🚨',
      medical: '🏥',
      panic: '⚠️',
      technical: '🔧'
    };
    return icons[type as keyof typeof icons] || '⚠️';
  };

  const formatTime = (date: Date) => {
    return date.toLocaleString();
  };

  const availableCSOs = csos.filter(cso => cso.status === 'available' || cso.id === alarm.assignedCSO);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{getAlarmTypeIcon(alarm.type)}</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 capitalize">
                {alarm.type} Alarm
              </h2>
              <p className="text-gray-600">{alarm.location.address}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={alarm.priority === 'critical' ? 'danger' : 'warning'}>
              {alarm.priority}
            </Badge>
            <Badge variant={alarm.status === 'new' ? 'danger' : 'info'}>
              {alarm.status.replace('_', ' ')}
            </Badge>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Alarm Details */}
          <div className="space-y-4">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Alarm Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    <strong>Time:</strong> {formatTime(alarm.timestamp)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    <strong>Location:</strong> {alarm.location.address}
                    {alarm.location.zone && ` (${alarm.location.zone})`}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    <strong>Customer:</strong> {alarm.customer.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    <strong>Phone:</strong> {alarm.customer.phone}
                  </span>
                </div>
                {alarm.device && (
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>Device:</strong> {alarm.device.description}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* CSO Assignment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>CSO Assignment</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-3">
                  <select
                    value={selectedCSO}
                    onChange={(e) => setSelectedCSO(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select CSO...</option>
                    {availableCSOs.map((cso) => (
                      <option key={cso.id} value={cso.id}>
                        {cso.name} ({cso.status})
                      </option>
                    ))}
                  </select>
                  <Button onClick={handleAssignCSO} size="sm">
                    Assign
                  </Button>
                </div>
                {alarm.assignedCSO && (
                  <p className="text-sm text-gray-600">
                    Currently assigned to: {csos.find(c => c.id === alarm.assignedCSO)?.name}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - AI Analysis */}
          <div className="space-y-4">
            {alarm.aiAnalysis && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    <span>AI Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Risk Score */}
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-1">
                      {alarm.aiAnalysis.riskScore}%
                    </div>
                    <div className="text-sm text-purple-700">Risk Score</div>
                    <div className="text-xs text-purple-600 mt-1">
                      {alarm.aiAnalysis.confidence}% confidence
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Recommendation</h4>
                    <Badge variant="info" className="mb-2 capitalize">
                      {alarm.aiAnalysis.recommendation}
                    </Badge>
                    <p className="text-sm text-gray-700">{alarm.aiAnalysis.reasoning}</p>
                  </div>

                  {/* Contextual Information */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Context</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {alarm.aiAnalysis.contextualInfo.map((info, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-purple-600 mt-1">•</span>
                          <span>{info}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Suggested Actions */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Suggested Actions</h4>
                    <div className="space-y-2">
                      {alarm.aiAnalysis.suggestedActions.map((action, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-700">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Notes Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Notes & Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Existing Notes */}
            <div className="space-y-3 mb-4">
              {alarm.notes.map((note) => (
                <div key={note.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm">{note.author}</span>
                      <Badge variant={note.type === 'ai' ? 'info' : 'default'} className="text-xs">
                        {note.type}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {formatTime(note.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{note.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Note */}
            <div className="flex items-start space-x-2">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 resize-none"
                rows={2}
              />
              <Button onClick={handleAddNote} size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => handleStatusUpdate('acknowledged')}
              variant="outline"
              size="sm"
            >
              Acknowledge
            </Button>
            <Button
              onClick={() => handleStatusUpdate('dispatched')}
              variant="primary"
              size="sm"
            >
              Dispatch
            </Button>
            <Button
              onClick={() => handleStatusUpdate('resolved')}
              variant="outline"
              size="sm"
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Resolve
            </Button>
            <Button
              onClick={() => handleStatusUpdate('false_alarm')}
              variant="outline"
              size="sm"
            >
              <XCircle className="h-4 w-4 mr-1" />
              False Alarm
            </Button>
          </div>
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}