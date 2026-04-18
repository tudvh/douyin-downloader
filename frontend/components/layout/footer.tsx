import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui'
import { WEB_ROUTES } from '@/configs/routes'
import { APP_NAME } from '@/constant'
import { Link } from '@/i18n/navigation'
import Logo from '@/public/logo.svg'

export function Footer() {
  const t = useTranslations()

  return (
    <footer className="w-full border-t border-border bg-background py-8 text-sm text-muted-foreground">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-8">
        <div className="flex cursor-default flex-col items-center gap-4 text-center md:flex-row md:text-left">
          <div className="flex items-center gap-2">
            <Logo className="h-7 w-7 text-foreground" />
            <span className="text-lg font-bold tracking-tight text-foreground">{APP_NAME}</span>
          </div>
        </div>

        <div className="flex flex-col flex-wrap items-center justify-center gap-3 md:flex-row md:gap-6">
          <Button variant="link" asChild className="text-muted-foreground hover:text-foreground">
            <Link href={WEB_ROUTES.HOME}>{t('terms_of_service')}</Link>
          </Button>
          <Button variant="link" asChild className="text-muted-foreground hover:text-foreground">
            <Link href={WEB_ROUTES.HOME}>{t('privacy_policy')}</Link>
          </Button>
          <Button variant="link" asChild className="text-muted-foreground hover:text-foreground">
            <Link href={WEB_ROUTES.HOME}>{t('contact_us')}</Link>
          </Button>
        </div>
      </div>
    </footer>
  )
}
