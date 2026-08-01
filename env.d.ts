declare namespace NodeJS {
  interface ProcessEnv {
    readonly TELEGRAM_BOT_TOKEN?: string;
    readonly TELEGRAM_CHAT_ID?: string;
  }
}
