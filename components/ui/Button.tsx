'use client';

import {ButtonHTMLAttributes, forwardRef} from 'react';
import {cn} from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--accent)] text-[var(--bg-primary)] hover:bg-[var(--accent-hover)] font-semibold',
  secondary:
    'border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)]',
  ghost:
    'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--accent-muted)] hover:text-[var(--accent)]'
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm rounded-lg',
  md: 'h-10 px-5 text-sm rounded-xl',
  lg: 'h-12 px-7 text-base rounded-xl'
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({variant = 'primary', size = 'md', className, children, ...props}, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-colors cursor-pointer',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
          'disabled:pointer-events-none disabled:opacity-50',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
