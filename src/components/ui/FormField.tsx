import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

export interface FormFieldProps {
  label?: React.ReactNode;
  required?: boolean;
  helperText?: React.ReactNode;
  error?: string | null;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  required = false,
  helperText,
  error,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-1.5 w-full', className)}>
      {label && (
        <label className="block text-xs font-semibold text-slate-300">
          {label}
          {required && <span className="text-rose-400 ml-1 font-bold">*</span>}
        </label>
      )}

      <div>{children}</div>

      {error ? (
        <div className="flex items-center gap-1.5 text-danger-500 text-xs mt-1 animate-fadeIn">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      ) : helperText ? (
        <div className="text-slate-400 text-xs mt-1">{helperText}</div>
      ) : null}
    </div>
  );
}
