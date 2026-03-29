import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const videoUrl = searchParams.get('url')

    if (!videoUrl) {
      return NextResponse.json({ error: 'Video URL parameter is required' }, { status: 400 })
    }

    let parsedUrl: URL
    try {
      parsedUrl = new URL(videoUrl)
    } catch {
      return NextResponse.json({ error: 'Invalid video URL' }, { status: 400 })
    }

    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return NextResponse.json({ error: 'Only http/https URLs are allowed' }, { status: 400 })
    }

    const upstreamHeaders: Record<string, string> = {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      Referer: 'https://www.douyin.com/',
    }

    const range = request.headers.get('range')
    if (range) upstreamHeaders.Range = range

    const response = await fetch(videoUrl, {
      headers: upstreamHeaders,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const videoData = await response.arrayBuffer()

    return new NextResponse(videoData, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'video/mp4',
        ...(response.headers.get('Content-Length')
          ? { 'Content-Length': response.headers.get('Content-Length') as string }
          : {}),
        ...(response.headers.get('Accept-Ranges')
          ? { 'Accept-Ranges': response.headers.get('Accept-Ranges') as string }
          : {}),
        ...(response.headers.get('Content-Range')
          ? { 'Content-Range': response.headers.get('Content-Range') as string }
          : {}),
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('Error proxying video:', error)
    return NextResponse.json({ error: 'Failed to load video' }, { status: 500 })
  }
}
