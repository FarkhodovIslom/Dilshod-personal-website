'use client';

import {useLocale} from 'next-intl';
import {useRouter, usePathname} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';
import {Globe} from 'lucide-react';
import {useState, useRef, useEffect} from 'react';

const LOCALE_LABELS: Record<string, string> = {
  uz: "O'z",
  en: 'En',
  ru: 'Ру'
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, {locale: newLocale});
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="cursor-pointer flex h-9 items-center gap-1.5 rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-2.5 text-sm text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        aria-label="Change language"
      >
        <Globe size={16} />
        <span>{LOCALE_LABELS[locale] ?? locale}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-28 overflow-hidden rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-lg">
          {routing.locales.map((l) => (
            <button
              key={l}
              onClick={() => handleLocaleChange(l)}
              className={`cursor-pointer flex w-full items-center px-3 py-2 text-left text-sm transition-colors hover:bg-[var(--accent-muted)] ${
                l === locale
                  ? 'font-semibold text-[var(--accent)]'
                  : 'text-[var(--text-secondary)]'
              }`}
            >
              {LOCALE_LABELS[l] ?? l}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
