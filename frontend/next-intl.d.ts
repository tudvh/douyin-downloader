import enMessages from './messages/en.json'
import esMessages from './messages/es.json'
import jaMessages from './messages/ja.json'
import viMessages from './messages/vi.json'
import zhCNMessages from './messages/zh-CN.json'
import zhTWMessages from './messages/zh-TW.json'

type CommonKeys = keyof typeof enMessages &
  keyof typeof esMessages &
  keyof typeof jaMessages &
  keyof typeof viMessages &
  keyof typeof zhCNMessages &
  keyof typeof zhTWMessages

type Messages = Record<CommonKeys, string>

const _localeValidation = {
  en: enMessages,
  ja: jaMessages,
  es: esMessages,
  vi: viMessages,
  'zh-CN': zhCNMessages,
  'zh-TW': zhTWMessages,
} satisfies Record<string, Messages>

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages {}
}

declare module 'use-intl' {
  interface AppConfig {
    Messages: Messages
  }
}
