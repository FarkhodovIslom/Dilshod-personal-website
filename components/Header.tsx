'use client';

import {useEffect, useState, useCallback, useRef} from 'react';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import {Menu, X} from 'lucide-react';

const NAV_SECTION_IDS = [
  'hero',
  'services',
  'projects',
  'estimator',
  'process',
  'faq',
  'contact',
] as const;

export default function Header() {
  const t = useTranslations('nav');
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navLinks = [
    {href: '#services',   id: 'services',   label: t('services')},
    {href: '#projects',   id: 'projects',   label: t('projects')},
    {href: '#estimator',  id: 'estimator',  label: t('estimator')},
    {href: '#process',    id: 'process',    label: t('process')},
    {href: '#faq',        id: 'faq',        label: t('faq')},
    {href: '#contact',    id: 'contact',    label: t('contact')},
  ];

  // ─── IntersectionObserver: which section is currently in view ───────────────
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          // Only update active section if we're NOT in the middle of a programmatic scroll
          if (entry?.isIntersecting && !isScrollingRef.current) {
            // If we're in the hero section, clear the active state for navbar links
            if (id === 'hero') {
              setActiveSection('');
            } else {
              setActiveSection(id);
            }
          }
        },
        {
          rootMargin: '-30% 0px -60% 0px', // trigger when section occupies the middle band
          threshold: 0,
        },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ─── Close mobile menu on resize to desktop ─────────────────────────────────
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ─── Close mobile menu + smooth scroll on link click ────────────────────────
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      setMobileOpen(false);
      
      // Immediately set the clicked section as active
      setActiveSection(id === 'hero' ? '' : id);
      
      // Disable IntersectionObserver updates during programmatic scroll
      isScrollingRef.current = true;
      
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
        
        // Re-enable IntersectionObserver after scroll animation completes
        // (smooth scroll typically takes 500-1000ms depending on distance)
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false;
        }, 1000);
      }
    },
    [],
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-default)] bg-[var(--bg-primary)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="text-lg font-bold text-[var(--text-primary)]">
          DZ<span className="text-[var(--accent)]">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.id)}
              className={`relative text-sm transition-colors duration-200 ${
                activeSection === link.id
                  ? 'text-[var(--accent)] font-medium'
                  : 'text-[var(--text-secondary)] hover:text-[var(--accent)]'
              }`}
            >
              {link.label}
              {/* Active underline indicator */}
              <span
                className={`absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-[var(--accent)] transition-all duration-300 ${
                  activeSection === link.id ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                }`}
              />
            </a>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />

          {/* Hamburger button (mobile only) */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-default)] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col border-t border-[var(--border-default)] bg-[var(--bg-primary)]/95 px-4 py-3 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.id)}
              className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                activeSection === link.id
                  ? 'bg-[var(--accent-muted)] text-[var(--accent)]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--accent)]'
              }`}
            >
              {activeSection === link.id && (
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              )}
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
