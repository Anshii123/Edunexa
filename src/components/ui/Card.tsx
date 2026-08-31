import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass' | 'interactive' | 'editorial';
}

export function Card({ className, variant = 'default', children, ...props }: CardProps) {
  const variants = {
    default: 'bg-white border border-stone-200/90 shadow-card',
    elevated: 'bg-white border border-stone-200 shadow-card-hover',
    glass: 'bg-white/95 backdrop-blur-sm border border-stone-200/90 shadow-card',
    interactive: 'bg-white border border-stone-200/90 shadow-card hover:shadow-card-hover hover:border-stone-300 transition-all cursor-pointer',
    editorial: 'bg-white border-l-4 border-l-brand-800 border-y border-r border-stone-200 shadow-card',
  };

  return (
    <div className={cn('rounded-2xl overflow-hidden transition-all', variants[variant], className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6 pb-3 space-y-1.5', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('type-h3 text-charcoal-900 font-display', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('type-body-sm text-stone-600 leading-relaxed', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6 pt-3', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6 pt-3 border-t border-stone-100 flex items-center justify-between', className)} {...props}>
      {children}
    </div>
  );
}

