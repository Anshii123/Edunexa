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
          'w-full rounded-xl bg-white border text-[#111827] placeholder-[#9CA3AF] text-sm p-3.5 transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed resize-y shadow-xs',
          error
            ? 'border-rose-500 focus:border-rose-600 focus:ring-2 focus:ring-rose-500/20'
            : 'border-black/[0.12] hover:border-black/[0.2] focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-500/20',
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
