import React from 'react';
import { cn } from '@/lib/utils';
import { AlertOctagon, RotateCcw } from 'lucide-react';
import { Button } from './Button';

export interface ErrorStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorState({
  title = 'Unable to Load Data',
  description = 'An unexpected error occurred while communicating with the academic server. Please check your connection and try again.',
  onRetry,
  retryLabel = 'Retry Request',
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        'p-8 rounded-2xl border border-danger-500/30 bg-danger-500/5 text-center flex flex-col items-center justify-center space-y-4 max-w-md mx-auto',
        className
      )}
      {...props}
    >
      <div className="w-12 h-12 rounded-2xl bg-danger-500/15 border border-danger-500/30 text-danger-500 flex items-center justify-center">
        <AlertOctagon className="w-6 h-6 stroke-[2]" />
      </div>

      <div className="space-y-1">
        <h4 className="type-h4 text-white font-display">{title}</h4>
        <p className="type-body-sm text-slate-300">{description}</p>
      </div>

      {onRetry && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onRetry}
          leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          className="border-slate-700 hover:border-slate-600"
        >
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
