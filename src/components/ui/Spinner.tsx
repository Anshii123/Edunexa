import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  label?: string;
}

export function Spinner({ size = 'md', label, className, ...props }: SpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  return (
    <div
      role="status"
      className={cn('inline-flex flex-col items-center justify-center gap-2 text-brand-400', className)}
      {...props}
    >
      <Loader2 className={cn('animate-spin stroke-[2.2]', sizes[size])} />
      {label && <span className="text-xs font-medium text-slate-400">{label}</span>}
      <span className="sr-only">{label || 'Loading...'}</span>
    </div>
  );
}
