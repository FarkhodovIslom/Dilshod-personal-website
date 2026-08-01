interface TelegramLead {
  name: string;
  contact: string;
  projectType: string;
  message: string;
}

export async function sendTelegramLead(lead: TelegramLead): Promise<{ok: boolean; error?: string}> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return {ok: false, error: 'TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured'};
  }

  const text = [
    '📬 *New Lead*',
    '',
    `*Name:* ${lead.name}`,
    `*Contact:* ${lead.contact}`,
    `*Project Type:* ${lead.projectType}`,
    '',
    '*Message:*',
    lead.message
  ].join('\n');

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'Markdown'
        })
      }
    );

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return {ok: false, error: `Telegram API error: ${res.status} ${JSON.stringify(data)}`};
    }

    return {ok: true};
  } catch (err) {
    return {ok: false, error: `Network error: ${err instanceof Error ? err.message : 'unknown'}`};
  }
}
