# Dilshod Zayniddinov — Portfolio

Professional freelance developer portfolio built with Next.js 16, Tailwind CSS, and next-intl for i18n.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Styling:** Tailwind CSS v4
- **i18n:** next-intl (uz/en/ru)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Validation:** Zod-compatible patterns
- **Backend:** Server Actions → Telegram Bot API

## Getting Started

```bash
npm install
```

Create `.env.local` from the example:

```bash
cp .env.local.example .env.local
```

Add your Telegram bot credentials to `.env.local`:

```
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
├── [locale]/
│   ├── layout.tsx          # Root layout with font, theme, i18n provider
│   └── page.tsx            # Home page composing all sections
├── actions.ts              # Server actions (lead form submission)
components/
├── ui/                     # Reusable primitives (Button, Card, Input, etc.)
├── sections/               # Page sections (Hero, Services, Projects, etc.)
data/
├── projects.ts             # Case studies (swap placeholders for real data)
├── services.ts             # Service cards
├── process.ts              # Process timeline
├── estimator.ts            # Pricing data
lib/
├── estimator.ts            # Cost calculation logic
├── telegram.ts             # Telegram Bot API helper
├── utils.ts                # cn() utility
messages/
├── uz.json                 # Uzbek translations
├── en.json                 # English translations
├── ru.json                 # Russian translations
i18n/
├── routing.ts              # Locale routing config
├── request.ts              # Request config for next-intl
├── navigation.ts           # Link, redirect, usePathname
types/
└── index.ts                # TypeScript interfaces
```

## Customizing Content

### Projects

Edit `data/projects.ts` to replace placeholder projects with real case studies. Each project has:

- `id`, `slug`, `category` (web/mobile/bot/mini-app/design)
- `client`, `duration`, `stack`
- `summary`, `architecture`, `challenges`
- `screenshots` (replace SVGs in `public/projects/`)

### Translations

All UI text lives in `messages/{uz,en,ru}.json`. No hardcoded strings in components.

### Estimator Pricing

Edit `data/estimator.ts` to adjust base prices and feature costs.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | Yes | Telegram bot token from @BotFather |
| `TELEGRAM_CHAT_ID` | Yes | Chat/group ID where leads are sent |

## Deployment

Deploy to Vercel:

```bash
npm run build
```

Or push to a Git repository connected to Vercel.

## License

All rights reserved.
