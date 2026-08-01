'use server';

import {sendTelegramLead} from '@/lib/telegram';

interface FormState {
  status: 'idle' | 'success' | 'error';
  message: string;
  errors?: Record<string, string>;
}

const initialState: FormState = {
  status: 'idle',
  message: ''
};

function validate(formData: FormData): {valid: boolean; errors: Record<string, string>} {
  const errors: Record<string, string> = {};

  const name = formData.get('name');
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.name = 'validation.nameRequired';
  }

  const contact = formData.get('contact');
  if (!contact || typeof contact !== 'string' || contact.trim().length === 0) {
    errors.contact = 'validation.contactRequired';
  }

  const message = formData.get('message');
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    errors.message = 'validation.messageRequired';
  }

  return {valid: Object.keys(errors).length === 0, errors};
}

export async function submitLead(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const {valid, errors} = validate(formData);
  if (!valid) {
    return {status: 'error', message: 'validation', errors};
  }

  const lead = {
    name: String(formData.get('name') ?? '').trim(),
    contact: String(formData.get('contact') ?? '').trim(),
    projectType: String(formData.get('projectType') ?? '').trim(),
    message: String(formData.get('message') ?? '').trim()
  };

  const result = await sendTelegramLead(lead);

  if (result.ok) {
    return {status: 'success', message: 'success'};
  }

  return {status: 'error', message: result.error ?? 'error'};
}

export {initialState};
