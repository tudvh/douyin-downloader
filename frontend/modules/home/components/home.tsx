import { useTranslations } from 'next-intl'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { WEB_ROUTES } from '@/configs/routes'

import { PlatformSection } from './platform-section'

export function Home() {
  const t = useTranslations()

  return (
    <main className="container mx-auto max-w-4xl space-y-10">
      <div className="mb-8 text-center">
        <h1
          className="mb-3 text-4xl font-bold tracking-tight"
          style={{ textWrap: 'balance' } as React.CSSProperties}
        >
          Downloader
        </h1>
        <p className="text-lg text-muted-foreground">{t('home_description')}</p>
      </div>

      <div className="flex flex-col gap-10">
        <PlatformSection
          title={t('douyin')}
          videoRoute={WEB_ROUTES.DOUYIN.VIDEOS}
          imageRoute={WEB_ROUTES.DOUYIN.IMAGES}
        />

        <PlatformSection
          title={t('tiktok')}
          videoRoute={WEB_ROUTES.TIKTOK.VIDEOS}
          imageRoute={WEB_ROUTES.TIKTOK.IMAGES}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('features')}</CardTitle>
          <CardDescription>{t('home_features_description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• {t('analyze_batch_urls')}</li>
            <li>• {t('download_video_without_watermark')}</li>
            <li>• {t('supports_both_platforms')}</li>
            <li>• {t('user_friendly_interface')}</li>
          </ul>
        </CardContent>
      </Card>
    </main>
  )
}
