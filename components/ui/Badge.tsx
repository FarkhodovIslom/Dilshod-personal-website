import {ReactNode} from 'react';
import {cn} from '@/lib/utils';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'accent';
}

export default function Badge({children, className, variant = 'default'}: BadgeProps) {
  const variantStyles = {
    default:
      'border border-[var(--border-default)] bg-[var(--bg-secondary)] text-[var(--text-secondary)]',
    accent:
      'border border-[var(--accent)] bg-[var(--accent-muted)] text-[var(--accent)]'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
