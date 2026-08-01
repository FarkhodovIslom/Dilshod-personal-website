'use client';

import {useCallback, useSyncExternalStore} from 'react';
import {Moon, Sun} from 'lucide-react';

function getSnapshot(): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'light';
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'dark' || attr === 'light') return attr;
  return 'light';
}

function getServerSnapshot(): 'light' | 'dark' {
  return 'light';
}

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
  return () => observer.disconnect();
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }, []);

  return (
    <button
      onClick={toggle}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
      aria-label="Toggle theme"
      suppressHydrationWarning
    >
      <span suppressHydrationWarning>
        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
      </span>
    </button>
  );
}
