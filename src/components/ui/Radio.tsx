import React from 'react';
import { cn } from '@/lib/utils';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, description, disabled, id, ...props }, ref) => {
    const inputId = id || `radio-${React.useId()}`;

    return (
      <div className={cn('flex items-start gap-2.5 select-none', className)}>
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            ref={ref}
            type="radio"
            id={inputId}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <div className="w-4 h-4 rounded-full border border-slate-700 bg-slate-900 transition-all peer-checked:border-brand-500 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500/50 peer-disabled:opacity-50 flex items-center justify-center cursor-pointer peer-disabled:cursor-not-allowed">
            <div className="w-2 h-2 rounded-full bg-brand-500 opacity-0 peer-checked:opacity-100 transition-opacity" />
          </div>
        </div>
        {(label || description) && (
          <label htmlFor={inputId} className="cursor-pointer text-xs space-y-0.5">
            {label && <div className="font-medium text-slate-200">{label}</div>}
            {description && <div className="text-slate-400 text-[11px] leading-relaxed">{description}</div>}
          </label>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';
