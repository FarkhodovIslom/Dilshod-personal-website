import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default function Header() {
  const t = useTranslations('nav');

  const navLinks = [
    {href: '#services', label: t('services')},
    {href: '#projects', label: t('projects')},
    {href: '#estimator', label: t('estimator')},
    {href: '#process', label: t('process')},
    {href: '#contact', label: t('contact')}
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-default)] bg-[var(--bg-primary)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold text-[var(--text-primary)]">
          DZ<span className="text-[var(--accent)]">.</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
