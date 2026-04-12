import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { DouyinVideo } from '@/modules/douyin/video'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t('download_platform_type', { platform: t('douyin'), type: t('videos') }),
    description: `${t('detail_page_heading', { platform: t('douyin'), type: t('videos') })}. ${t('detail_page_description')}`,
  }
}

export default function DouyinVideosPage() {
  return <DouyinVideo />
}
