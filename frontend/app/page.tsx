import Link from 'next/link'

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { WEB_ROUTES } from '@/configs/routes'

interface PlatformSectionProps {
  title: string
  videoRoute: string
  imageRoute: string
  description: string
}

function PlatformSection({ title, videoRoute, imageRoute, description }: PlatformSectionProps) {
  return (
    <section aria-labelledby={`${title.toLowerCase()}-heading`} className="flex flex-col gap-4">
      <div>
        <h2
          id={`${title.toLowerCase()}-heading`}
          className="text-xl font-semibold tracking-tight"
          style={{ textWrap: 'balance' } as React.CSSProperties}
        >
          {title}
        </h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="transition-shadow duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-base">Tải Video</CardTitle>
            <CardDescription>Phân tích và tải video từ {title}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={videoRoute}>
              <Button className="w-full">Đến Trang Tải Video</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="transition-shadow duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-base">Tải Ảnh</CardTitle>
            <CardDescription>Phân tích và tải hình ảnh từ {title}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={imageRoute}>
              <Button className="w-full" variant="outline">
                Đến Trang Tải Ảnh
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="container mx-auto max-w-4xl space-y-10">
      <div className="mb-8 text-center">
        <h1
          className="mb-3 text-4xl font-bold tracking-tight"
          style={{ textWrap: 'balance' } as React.CSSProperties}
        >
          Downloader
        </h1>
        <p className="text-lg text-muted-foreground">
          Công cụ tải video và hình ảnh từ Douyin và TikTok một cách dễ dàng
        </p>
      </div>

      <div className="flex flex-col gap-10">
        <PlatformSection
          title="Douyin"
          videoRoute={WEB_ROUTES.DOUYIN.VIDEOS}
          imageRoute={WEB_ROUTES.DOUYIN.IMAGES}
          description="Tải nội dung từ nền tảng Douyin (抖音)"
        />

        <PlatformSection
          title="TikTok"
          videoRoute={WEB_ROUTES.TIKTOK.VIDEOS}
          imageRoute={WEB_ROUTES.TIKTOK.IMAGES}
          description="Tải nội dung từ nền tảng TikTok"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tính Năng</CardTitle>
          <CardDescription>Những gì bạn có thể làm với công cụ này</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Phân tích hàng loạt URL</li>
            <li>• Tải video không có logo</li>
            <li>• Hỗ trợ cả Douyin và TikTok</li>
            <li>• Giao diện thân thiện</li>
          </ul>
        </CardContent>
      </Card>
    </main>
  )
}
