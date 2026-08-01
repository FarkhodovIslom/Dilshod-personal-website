'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {ArrowDown} from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section
      id="hero"
      className="flex min-h-[85vh] items-center justify-center px-4"
    >
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5, ease: 'easeOut'}}
        >
          <p className="mb-4 text-lg text-[var(--text-muted)]">
            {t('greeting')}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl md:text-6xl">
            {t('name')}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl">
            {t('tagline')}
          </p>
        </motion.div>

        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5, delay: 0.2, ease: 'easeOut'}}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a href="#contact">
            <Button size="lg">{t('ctaPrimary')}</Button>
          </a>
          <a href="#projects">
            <Button variant="secondary" size="lg">
              {t('ctaSecondary')}
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.5, delay: 0.6}}
          className="mt-16"
        >
          <a
            href="#services"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
          >
            <ArrowDown size={16} className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
