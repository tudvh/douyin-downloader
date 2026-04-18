import { useTranslations } from 'next-intl'

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { Link } from '@/i18n/navigation'

interface PlatformSectionProps {
  title: string
  videoRoute: string
  imageRoute: string
}

export function PlatformSection({ title, videoRoute, imageRoute }: PlatformSectionProps) {
  const t = useTranslations()

  return (
    <section aria-labelledby={`${title.toLowerCase()}-heading`} className="space-y-4">
      <div>
        <h2
          id={`${title.toLowerCase()}-heading`}
          className="text-xl font-semibold tracking-tight"
          style={{ textWrap: 'balance' } as React.CSSProperties}
        >
          {title}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t('download_content_from_platform', { platform: title })}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="transition-shadow duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-base capitalize">
              {t('download_type', { type: t('video') })}
            </CardTitle>
            <CardDescription>
              {t('download_type_from_platform_desc', { type: t('video'), platform: title })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={videoRoute}>
              <Button className="w-full capitalize">
                {t('go_to_type_download_page', { type: t('video') })}
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="transition-shadow duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-base capitalize">
              {t('download_type', { type: t('image') })}
            </CardTitle>
            <CardDescription>
              {t('download_type_from_platform_desc', { type: t('image'), platform: title })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={imageRoute}>
              <Button className="w-full capitalize" variant="outline">
                {t('go_to_type_download_page', { type: t('image') })}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
