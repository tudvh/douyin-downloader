import { Wrench } from 'lucide-react'
import { useTranslations } from 'next-intl'

export const DouyinImage = () => {
  const t = useTranslations()

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {t('detail_page_heading', { platform: t('douyin'), type: t('images') })}
          </h1>
          <p className="text-sm text-muted-foreground md:text-base">
            {t('detail_page_description')}
          </p>
        </div>
      </div>

      <div className="flex min-h-[40vh] animate-in flex-col items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/20 bg-muted/10 p-8 text-center fade-in-50">
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
          <Wrench className="size-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-medium text-foreground">{t('page_under_development')}</h3>
      </div>
    </div>
  )
}
