'use client';

import {useActionState} from 'react';
import {useTranslations} from 'next-intl';
import {submitLead, initialState} from '@/app/actions';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function ContactForm() {
  const t = useTranslations('contact');
  const [state, formAction, isPending] = useActionState(submitLead, initialState);

  return (
    <Section id="contact">
      <ScrollReveal direction="up" delay={0}>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)]">
            {t('title')}
          </h2>
          <p className="mt-2 text-[var(--text-secondary)]">{t('subtitle')}</p>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={100} className="mx-auto max-w-lg">
        {state.status === 'success' && (
          <div className="mb-6 rounded-xl border border-[var(--success)] bg-[var(--accent-muted)] p-4 text-sm text-[var(--success)]">
            {t('success')}
          </div>
        )}

        {state.status === 'error' && state.message !== 'validation' && (
          <div className="mb-6 rounded-xl border border-[var(--error)] bg-red-50 p-4 text-sm text-[var(--error)] dark:bg-red-950/30">
            {t('error')}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <Input
            name="name"
            label={t('fields.name')}
            placeholder={t('fields.namePlaceholder')}
            error={state.errors?.name ? t(state.errors.name) : undefined}
          />

          <Input
            name="contact"
            label={t('fields.contact')}
            placeholder={t('fields.contactPlaceholder')}
            error={state.errors?.contact ? t(state.errors.contact) : undefined}
          />

          <Input
            name="projectType"
            label={t('fields.projectType')}
            placeholder={t('fields.projectTypePlaceholder')}
          />

          <Textarea
            name="message"
            label={t('fields.message')}
            placeholder={t('fields.messagePlaceholder')}
            error={state.errors?.message ? t(state.errors.message) : undefined}
          />

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? t('sending') : t('submit')}
          </Button>
        </form>
      </ScrollReveal>
    </Section>
  );
}
