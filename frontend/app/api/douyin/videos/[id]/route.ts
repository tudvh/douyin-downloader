import { NextRequest, NextResponse } from 'next/server'

import { serverApi } from '@/services/server'
import { IDouyinVideo } from '@/types/douyin'

import { DouyinVideoResponse } from './type'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const {
      data: {
        data: { aweme_detail: data },
      },
    } = await serverApi.get<DouyinVideoResponse>('/douyin/web/fetch_one_video', {
      params: {
        aweme_id: id,
      },
    })

    const bitRates = data.video?.bit_rate ?? []
    const variants = bitRates.filter(v => {
      const width = v?.play_addr?.width ?? 0
      const url = v?.play_addr?.url_list?.[0]
      return width > 0 && !!url
    })

    const best =
      variants.length > 0
        ? variants.reduce((best, cur) => {
            const bestW = best?.play_addr?.width ?? 0
            const curW = cur?.play_addr?.width ?? 0

            if (curW > bestW) return cur
            if (curW < bestW) return best

            const bestH = best?.play_addr?.height ?? 0
            const curH = cur?.play_addr?.height ?? 0
            if (curH > bestH) return cur
            if (curH < bestH) return best

            const bestBitrate = best?.bit_rate ?? 0
            const curBitrate = cur?.bit_rate ?? 0
            if (curBitrate > bestBitrate) return cur

            return best
          }, variants[0])
        : undefined

    if (!best) {
      return NextResponse.json({ error: 'No video variants found' }, { status: 404 })
    }

    const response: IDouyinVideo = {
      id: data.aweme_id,
      desc: data.desc,
      love_count: data.statistics.digg_count,
      author: {
        id: data.author.sec_uid,
        avatar_url: data.author.avatar_thumb.url_list[0],
        nickname: data.author.nickname,
      },
      cover_url: data.video.cover_original_scale.url_list[0],
      fps: best.FPS,
      width: best.play_addr.width,
      height: best.play_addr.height,
      urls: best.play_addr.url_list,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error parsing video:', error)
    return NextResponse.json({ error: 'Failed to parse video' }, { status: 500 })
  }
}
