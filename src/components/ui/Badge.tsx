import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
  size?: 'sm' | 'md';
}

export function Badge({ children, variant = 'default', className, size = 'md' }: BadgeProps) {
  const variants = {
    default: 'bg-secondary text-secondary-foreground border-transparent',
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    danger: 'bg-danger/10 text-danger border-danger/20',
    info: 'bg-info/10 text-info border-info/20'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs'
  };

  return (
    <span className={cn(
      'inline-flex items-center rounded-full font-medium border transition-colors',
      variants[variant],
      sizes[size],
      className
    )}>
      {children}
    </span>
  );
}