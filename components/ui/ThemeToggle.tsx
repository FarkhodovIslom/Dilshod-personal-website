'use client';

import {useCallback, useSyncExternalStore} from 'react';
import {Moon, Sun} from 'lucide-react';
import {motion} from 'framer-motion';

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

  const toggle = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const doc = document;
    const currentTheme = doc.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || rect.left + rect.width / 2;
    const y = e.clientY || rect.top + rect.height / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const startViewTransition = (doc as unknown as { startViewTransition?: (cb: () => void) => any }).startViewTransition;

    if (typeof startViewTransition === 'function') {
      const transition = startViewTransition.call(doc, () => {
        doc.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
      });

      transition.ready.then(() => {
        doc.documentElement.animate(
          [
            { clipPath: `circle(0px at ${x}px ${y}px)` },
            { clipPath: `circle(${endRadius}px at ${x}px ${y}px)` }
          ],
          {
            duration: 650,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            pseudoElement: '::view-transition-new(root)'
          }
        );
      });
    } else {
      // Fallback smooth radial ripple overlay for browsers without View Transitions
      const overlay = doc.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.left = `${x}px`;
      overlay.style.top = `${y}px`;
      overlay.style.width = '2px';
      overlay.style.height = '2px';
      overlay.style.borderRadius = '50%';
      overlay.style.backgroundColor = nextTheme === 'dark' ? '#0D1117' : '#FAFAF7';
      overlay.style.zIndex = '999999';
      overlay.style.pointerEvents = 'none';
      overlay.style.transform = 'translate(-50%, -50%) scale(0)';
      overlay.style.transition = 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1)';
      doc.body.appendChild(overlay);

      requestAnimationFrame(() => {
        const scaleFactor = Math.ceil(endRadius * 2);
        overlay.style.transform = `translate(-50%, -50%) scale(${scaleFactor})`;
      });

      setTimeout(() => {
        doc.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
        overlay.style.transition = 'opacity 200ms ease';
        overlay.style.opacity = '0';
        setTimeout(() => {
          overlay.remove();
        }, 200);
      }, 550);
    }
  }, []);

  return (
    <button
      onClick={toggle}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-95"
      aria-label="Toggle theme"
      suppressHydrationWarning
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 90, scale: 0.7, opacity: 0 }}
        transition={{ duration: 0.35, ease: 'backOut' }}
        suppressHydrationWarning
      >
        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
      </motion.span>
    </button>
  );
}
