import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { TiktokVideo } from '@/modules/tiktok/video'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t('download_platform_type', { platform: t('tiktok'), type: t('videos') }),
    description: `${t('detail_page_heading', { platform: t('tiktok'), type: t('videos') })}. ${t('detail_page_description')}`,
  }
}

export default function TiktokVideosPage() {
  return <TiktokVideo />
}
