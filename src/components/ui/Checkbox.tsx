import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, disabled, id, ...props }, ref) => {
    const inputId = id || `checkbox-${React.useId()}`;

    return (
      <div className={cn('flex items-start gap-2.5 select-none', className)}>
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            ref={ref}
            type="checkbox"
            id={inputId}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <div className="w-4 h-4 rounded-md border border-slate-700 bg-slate-900 transition-all peer-checked:bg-brand-600 peer-checked:border-brand-500 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500/50 peer-disabled:opacity-50 flex items-center justify-center text-white cursor-pointer peer-disabled:cursor-not-allowed">
            <Check className="w-3 h-3 stroke-[3] opacity-0 peer-checked:opacity-100 transition-opacity" />
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

Checkbox.displayName = 'Checkbox';
