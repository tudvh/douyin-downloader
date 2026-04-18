import { useTranslations } from 'next-intl'

import { WEB_ROUTES } from '@/configs/routes'
import { APP_NAME } from '@/constant'
import { Link } from '@/i18n/navigation'
import Logo from '@/public/logo.svg'

export function Footer() {
  const t = useTranslations()

  return (
    <footer className="w-full border-t border-border bg-background py-8 text-sm text-muted-foreground">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-8">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
          <Link
            href={WEB_ROUTES.HOME}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Logo className="h-7 w-7 text-foreground" />
            <span className="text-lg font-bold tracking-tight text-foreground">{APP_NAME}</span>
          </Link>
        </div>

        <div className="flex flex-col flex-wrap items-center justify-center gap-3 md:flex-row md:gap-6">
          <Link href={WEB_ROUTES.HOME} className="transition-colors hover:text-foreground">
            {t('terms_of_service')}
          </Link>
          <Link href={WEB_ROUTES.HOME} className="transition-colors hover:text-foreground">
            {t('privacy_policy')}
          </Link>
          <Link href={WEB_ROUTES.HOME} className="transition-colors hover:text-foreground">
            {t('contact_us')}
          </Link>
        </div>
      </div>
    </footer>
  )
}
