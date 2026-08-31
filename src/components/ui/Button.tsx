import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold' | 'danger' | 'subtle';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 focus-ring select-none tracking-tight';

    const variants = {
      primary:
        'bg-brand-900 hover:bg-brand-800 active:bg-brand-950 text-white shadow-sm border border-brand-950/20',
      secondary:
        'bg-stone-100 hover:bg-stone-200/90 active:bg-stone-300 text-stone-800 border border-stone-200/80 shadow-subtle',
      outline:
        'bg-transparent hover:bg-stone-100 text-stone-800 border border-stone-300 hover:border-stone-400',
      ghost:
        'bg-transparent hover:bg-stone-100 text-stone-700 hover:text-stone-950',
      gold:
        'bg-merit-600 hover:bg-merit-700 active:bg-merit-800 text-white font-semibold shadow-sm border border-merit-700/30',
      danger:
        'bg-rose-600 hover:bg-rose-700 text-white shadow-sm',
      subtle:
        'bg-brand-50 hover:bg-brand-100 text-brand-900 border border-brand-200/60',
    };

    const sizes = {
      xs: 'px-3 py-1 text-xs gap-1.5 rounded-lg',
      sm: 'px-3.5 py-1.5 text-xs gap-2 rounded-lg',
      md: 'px-5 py-2.5 text-sm gap-2 rounded-xl',
      lg: 'px-6 py-3 text-base gap-2.5 rounded-xl',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

