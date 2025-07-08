import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function getAlarmTypeColor(type: string): string {
  const colors = {
    fire: 'text-red-600 bg-red-50',
    intrusion: 'text-orange-600 bg-orange-50',
    medical: 'text-blue-600 bg-blue-50',
    panic: 'text-purple-600 bg-purple-50',
    technical: 'text-gray-600 bg-gray-50'
  };
  return colors[type as keyof typeof colors] || colors.technical;
}

export function getPriorityColor(priority: string): string {
  const colors = {
    critical: 'text-red-700 bg-red-100 border-red-200',
    high: 'text-orange-700 bg-orange-100 border-orange-200',
    medium: 'text-yellow-700 bg-yellow-100 border-yellow-200',
    low: 'text-green-700 bg-green-100 border-green-200'
  };
  return colors[priority as keyof typeof colors] || colors.medium;
}

export function getStatusColor(status: string): string {
  const colors = {
    new: 'text-red-700 bg-red-100',
    acknowledged: 'text-yellow-700 bg-yellow-100',
    in_progress: 'text-blue-700 bg-blue-100',
    dispatched: 'text-purple-700 bg-purple-100',
    resolved: 'text-green-700 bg-green-100',
    false_alarm: 'text-gray-700 bg-gray-100'
  };
  return colors[status as keyof typeof colors] || colors.new;
}