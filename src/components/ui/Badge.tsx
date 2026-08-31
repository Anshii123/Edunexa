import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'brand' | 'gold' | 'emerald' | 'rose' | 'slate' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  pulse?: boolean;
}

export function Badge({
  className,
  variant = 'default',
  size = 'md',
  dot = false,
  pulse = false,
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default: 'bg-stone-100 text-stone-700 border border-stone-200',
    brand: 'bg-brand-50 text-brand-900 border border-brand-200/80 font-medium',
    gold: 'bg-amber-50 text-amber-900 border border-amber-200/80 font-medium',
    emerald: 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-medium',
    rose: 'bg-rose-50 text-rose-800 border border-rose-200/80 font-medium',
    slate: 'bg-stone-100 text-stone-600 border border-stone-200',
    outline: 'bg-transparent text-stone-700 border border-stone-300',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px] gap-1 rounded-md tracking-wider',
    md: 'px-2.5 py-1 text-xs gap-1.5 rounded-lg tracking-wide',
    lg: 'px-3.5 py-1.5 text-xs gap-2 rounded-xl font-medium tracking-wide',
  };

  const dotColors = {
    default: 'bg-stone-500',
    brand: 'bg-brand-600',
    gold: 'bg-amber-600',
    emerald: 'bg-emerald-600',
    rose: 'bg-rose-600',
    slate: 'bg-stone-500',
    outline: 'bg-stone-500',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium select-none transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          {pulse && (
            <span
              className={cn(
                'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
                dotColors[variant]
              )}
            />
          )}
          <span className={cn('relative inline-flex rounded-full h-1.5 w-1.5', dotColors[variant])} />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
}

