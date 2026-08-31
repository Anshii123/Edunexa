import React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error = false, rows = 3, disabled, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        disabled={disabled}
        className={cn(
          'w-full rounded-xl bg-slate-900/90 border text-slate-100 placeholder-slate-500 text-sm p-3.5 transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed resize-y',
          error
            ? 'border-danger-500/80 focus:border-danger-500 focus:ring-1 focus:ring-danger-500/50'
            : 'border-slate-800 hover:border-slate-700 focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50',
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
