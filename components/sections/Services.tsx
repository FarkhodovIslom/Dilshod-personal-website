'use client';

import {useTranslations} from 'next-intl';
import {Globe, Smartphone, Bot, AppWindow, Palette} from 'lucide-react';
import {services} from '@/data/services';
import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import ScrollReveal from '@/components/ui/ScrollReveal';

const iconMap: Record<string, React.ComponentType<{size?: number; className?: string}>> = {
  Globe,
  Smartphone,
  Bot,
  AppWindow,
  Palette
};

export default function Services() {
  const t = useTranslations('services');

  return (
    <Section id="services">
      <ScrollReveal direction="up" delay={0}>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)]">
            {t('title')}
          </h2>
          <p className="mt-2 text-[var(--text-secondary)]">{t('subtitle')}</p>
        </div>
      </ScrollReveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const Icon = iconMap[service.icon];
          return (
            <ScrollReveal key={service.key} direction="up" delay={index * 80}>
              <Card hover className="h-full">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-muted)] text-[var(--accent)]">
                  {Icon && <Icon size={24} />}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[var(--text-primary)]">
                  {t(`items.${service.key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {t(`items.${service.key}.description`)}
                </p>
              </Card>
            </ScrollReveal>
          );
        })}
      </div>
    </Section>
  );
}
