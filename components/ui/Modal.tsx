'use client';

import {ReactNode, useEffect, useRef, useCallback} from 'react';
import {X} from 'lucide-react';
import {cn} from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
}

export default function Modal({open, onClose, children, title, className}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      className={cn(
        'backdrop:bg-black/50 backdrop:backdrop-blur-sm',
        'rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-0 shadow-xl',
        'max-h-[85vh] w-full max-w-2xl overflow-hidden',
        'open:animate-in open:fade-in open:zoom-in-95',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-[var(--border-default)] px-6 py-4">
        {title && (
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            {title}
          </h2>
        )}
        <button
          onClick={handleClose}
          className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--accent-muted)] hover:text-[var(--accent)]"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </div>
      <div className="overflow-y-auto px-6 py-4" style={{maxHeight: 'calc(85vh - 80px)'}}>
        {children}
      </div>
    </dialog>
  );
}
