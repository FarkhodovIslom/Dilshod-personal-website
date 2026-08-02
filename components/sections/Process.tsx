'use client';

import {useTranslations} from 'next-intl';
import {MessageSquare, FileText, Code, Rocket} from 'lucide-react';
import {processSteps} from '@/data/process';
import Section from '@/components/ui/Section';
import ScrollReveal from '@/components/ui/ScrollReveal';

const iconMap: Record<string, React.ComponentType<{size?: number; className?: string}>> = {
  MessageSquare,
  FileText,
  Code,
  Rocket
};

export default function Process() {
  const t = useTranslations('process');

  return (
    <Section id="process" className="bg-[var(--bg-secondary)]">
      <ScrollReveal direction="up" delay={0}>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)]">
            {t('title')}
          </h2>
          <p className="mt-2 text-[var(--text-secondary)]">{t('subtitle')}</p>
        </div>
      </ScrollReveal>

      <div className="relative mx-auto max-w-3xl">
        <div className="absolute left-6 top-0 h-full w-0.5 bg-[var(--border-default)] sm:left-1/2 sm:-translate-x-1/2" />

        <div className="space-y-12">
          {processSteps.map((item, index) => {
            const Icon = iconMap[item.icon];
            const isEven = item.step % 2 === 0;

            return (
              <ScrollReveal
                key={item.step}
                direction={isEven ? 'left' : 'right'}
                delay={index * 100}
              >
                <div
                  className={`relative flex items-start gap-6 sm:gap-0 ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[var(--accent)] bg-[var(--bg-elevated)] text-[var(--accent)] sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                    {Icon && <Icon size={20} />}
                  </div>

                  <div
                    className={`sm:w-[calc(50%-2rem)] ${
                      isEven ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'
                    } pl-0 sm:pl-0`}
                  >
                    <h3 className="mb-1 text-lg font-semibold text-[var(--text-primary)]">
                      {t(`steps.${item.step}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                      {t(`steps.${item.step}.description`)}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
