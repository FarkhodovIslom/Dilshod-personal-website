'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {estimate} from '@/lib/estimator';
import {projectTypes, features} from '@/data/estimator';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function Estimator() {
  const t = useTranslations('estimator');
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const result = projectType ? estimate(projectType, selectedFeatures) : null;

  const toggleFeature = (key: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );
  };

  const handleOrder = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (
    <Section id="estimator">
      <ScrollReveal direction="up" delay={0}>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)]">
            {t('title')}
          </h2>
          <p className="mt-2 text-[var(--text-secondary)]">{t('subtitle')}</p>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={100} className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  step >= s
                    ? 'bg-[var(--accent)] text-[var(--bg-primary)]'
                    : 'border border-[var(--border-default)] text-[var(--text-muted)]'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`h-0.5 w-12 transition-colors ${
                    step > s ? 'bg-[var(--accent)]' : 'bg-[var(--border-default)]'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-center text-lg font-semibold text-[var(--text-primary)]">
              {t('step1.title')}
            </h3>
            <p className="text-center text-sm text-[var(--text-secondary)]">
              {t('step1.subtitle')}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {projectTypes.map((pt) => (
                <button
                  key={pt.key}
                  onClick={() => setProjectType(pt.key)}
                  className={`cursor-pointer rounded-xl border p-4 text-left transition-colors ${
                    projectType === pt.key
                      ? 'border-[var(--accent)] bg-[var(--accent-muted)]'
                      : 'border-[var(--border-default)] bg-[var(--bg-elevated)] hover:border-[var(--border-hover)]'
                  }`}
                >
                  <span className="font-medium text-[var(--text-primary)]">
                    {t(`step1.types.${pt.key}`)}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex justify-center pt-4">
              <Button
                onClick={() => setStep(2)}
                disabled={!projectType}
              >
                {t('next')}
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-center text-lg font-semibold text-[var(--text-primary)]">
              {t('step2.title')}
            </h3>
            <p className="text-center text-sm text-[var(--text-secondary)]">
              {t('step2.subtitle')}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <button
                  key={feature.key}
                  onClick={() => toggleFeature(feature.key)}
                  className={`cursor-pointer flex items-center gap-3 rounded-xl border p-4 text-left transition-colors ${
                    selectedFeatures.includes(feature.key)
                      ? 'border-[var(--accent)] bg-[var(--accent-muted)]'
                      : 'border-[var(--border-default)] bg-[var(--bg-elevated)] hover:border-[var(--border-hover)]'
                  }`}
                >
                  <div
                    className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-colors ${
                      selectedFeatures.includes(feature.key)
                        ? 'border-[var(--accent)] bg-[var(--accent)]'
                        : 'border-[var(--border-default)]'
                    }`}
                  >
                    {selectedFeatures.includes(feature.key) && (
                      <svg
                        className="h-3 w-3 text-[var(--bg-primary)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {t(`step2.features.${feature.key}`)}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex justify-center gap-3 pt-4">
              <Button variant="secondary" onClick={() => setStep(1)}>
                {t('back')}
              </Button>
              <Button onClick={() => setStep(3)}>
                {t('next')}
              </Button>
            </div>
          </div>
        )}

        {step === 3 && result && (
          <div className="space-y-6">
            <h3 className="text-center text-lg font-semibold text-[var(--text-primary)]">
              {t('step3.title')}
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6 text-center">
                <p className="text-sm text-[var(--text-muted)]">
                  {t('step3.priceRange')}
                </p>
                <p className="mt-1 text-2xl font-bold text-[var(--accent)]">
                  ${result.priceMin.toLocaleString()} — ${result.priceMax.toLocaleString()}
                </p>
              </div>
              <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6 text-center">
                <p className="text-sm text-[var(--text-muted)]">
                  {t('step3.timeline')}
                </p>
                <p className="mt-1 text-2xl font-bold text-[var(--accent)]">
                  {result.weeksMin} — {result.weeksMax} {t('step3.weeks')}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6">
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                {t('step3.breakdown')}
              </h4>
              <div className="space-y-2">
                {result.breakdown.map((item, index) => {
                  const label = index === 0
                    ? t(`step1.types.${item.label}` as Parameters<typeof t>[0])
                    : t(`step2.features.${item.label}` as Parameters<typeof t>[0]);
                  return (
                    <div
                      key={item.label}
                      className="flex items-center justify-between border-b border-[var(--border-default)] pb-2 text-sm last:border-0"
                    >
                      <span className="text-[var(--text-secondary)]">
                        {label}
                      </span>
                      <span className="font-medium text-[var(--text-primary)]">
                        ${item.min.toLocaleString()} — ${item.max.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <Button variant="secondary" onClick={() => setStep(2)}>
                {t('back')}
              </Button>
              <Button onClick={handleOrder}>
                {t('step3.orderNow')}
              </Button>
            </div>
          </div>
        )}
      </ScrollReveal>
    </Section>
  );
}
