'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {ChevronDown} from 'lucide-react';
import Section from '@/components/ui/Section';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function FAQ() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const faqItems = [1, 2, 3, 4];

  return (
    <Section id="faq" className="bg-[var(--bg-secondary)]">
      <ScrollReveal direction="up" delay={0}>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)]">
            {t('title')}
          </h2>
          <p className="mt-2 text-[var(--text-secondary)]">{t('subtitle')}</p>
        </div>
      </ScrollReveal>

      <div className="mx-auto max-w-3xl space-y-4">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <ScrollReveal key={item} direction="up" delay={index * 80}>
              <div className="overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] transition-colors hover:border-[var(--accent)]">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex w-full items-center justify-between p-6 text-left font-medium text-[var(--text-primary)] cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold sm:text-lg">
                    {t(`items.${item}.q`)}
                  </span>
                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent-muted)] text-[var(--accent)] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base border-t border-[var(--border-default)]/40 mt-2">
                    <p className="pt-4">{t(`items.${item}.a`)}</p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </Section>
  );
}
