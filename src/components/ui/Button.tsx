import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95';
  
  const variants = {
    primary: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 focus:ring-primary/20',
    secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 focus:ring-secondary/20',
    outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground focus:ring-primary/20',
    ghost: 'hover:bg-accent hover:text-accent-foreground focus:ring-accent/20',
    danger: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 focus:ring-destructive/20'
  };
  
  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-9 px-4 text-sm',
    lg: 'h-10 px-6 text-base'
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}