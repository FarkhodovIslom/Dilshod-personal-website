import {useTranslations} from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-default)] bg-[var(--bg-secondary)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6">
        <p className="text-sm text-[var(--text-muted)]">
          &copy; {year} Dilshod Zayniddinov. {t('rights')}
        </p>
        <p className="text-sm text-[var(--text-muted)]">
          {t('madeWith')}
        </p>
      </div>
    </footer>
  );
}
