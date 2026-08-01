import {TextareaHTMLAttributes, forwardRef} from 'react';
import {cn} from '@/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({label, error, className, id, ...props}, ref) => {
    const textareaId = id ?? label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={textareaId}
          className="text-sm font-medium text-[var(--text-primary)]"
        >
          {label}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'min-h-[120px] rounded-md border bg-transparent px-3 py-2 text-sm text-[var(--text-primary)]',
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

Textarea.displayName = 'Textarea';

export default Textarea;
