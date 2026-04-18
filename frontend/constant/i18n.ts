export const LOCALES = ['vi', 'en', 'ja', 'es', 'zh-CN', 'zh-TW'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'
