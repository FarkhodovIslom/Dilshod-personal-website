import {InputHTMLAttributes, forwardRef} from 'react';
import {cn} from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({label, error, className, id, ...props}, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-[var(--text-primary)]"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'h-10 rounded-md border bg-transparent px-3 text-sm text-[var(--text-primary)]',
            'placeholder:text-[var(--text-muted)]',
            'transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-1',
            error
              ? 'border-[var(--error)]'
              : 'border-[var(--border-default)] hover:border-[var(--border-hover)]',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-[var(--error)]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
