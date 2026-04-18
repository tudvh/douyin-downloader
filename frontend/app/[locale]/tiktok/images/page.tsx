import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { TiktokImage } from '@/modules/tiktok/image'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t('download_platform_type', { platform: t('tiktok'), type: t('images') }),
    description: `${t('detail_page_heading', { platform: t('tiktok'), type: t('images') })}. ${t('detail_page_description')}`,
  }
}

export default function TiktokImagesPage() {
  return <TiktokImage />
}
