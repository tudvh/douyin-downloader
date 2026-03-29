import { toast } from 'react-toastify'

import { API_ROUTES } from '@/configs'
import { HEADER_HEIGHT } from '@/constant'

import { DOUYIN_VIDEO_ID_REGEX, DOUYIN_VIDEO_URL_REGEX } from './constant'

const SCROLL_GAP = 16

export const scrollToElement = (elementId: string): void => {
  const el = document.getElementById(elementId)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT - SCROLL_GAP
  window.scrollTo({ top, behavior: 'smooth' })
}

export const findVideoUrls = (text: string): string[] => {
  const matches = text.match(DOUYIN_VIDEO_URL_REGEX) || []
  return matches
}

export const getVideoId = (url: string): string => {
  const match = url.match(DOUYIN_VIDEO_ID_REGEX)

  if (!match) {
    throw new Error(`Invalid Douyin video URL: ${url}`)
  }

  return match[1]
}

export const validateInput = (input: string, maxUrls: number = 10): string | null => {
  const urls = findVideoUrls(input)
  const totalUrls = urls.length

  if (totalUrls === 0) {
    return 'Không tìm thấy URL hợp lệ. Vui lòng kiểm tra lại nội dung nhập vào.'
  }

  if (totalUrls > maxUrls) {
    return `Quá nhiều URL! Chỉ xử lý được tối đa ${maxUrls} URL. Hiện tại có ${totalUrls} URL.`
  }

  return null
}

export const copyTextToClipboard = async (text: string): Promise<boolean> => {
  if (!text) return false

  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // ignore -> fallback below
  }

  try {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.top = '0'
    textarea.style.left = '0'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(textarea)
    return ok
  } catch {
    return false
  }
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message
  return typeof error === 'string' ? error : 'Unknown error'
}

export const downloadVideoFromUrls = async (urls: string[], filename: string): Promise<void> => {
  if (urls.length === 0) {
    toast.error('Lỗi khi tải video. Đã thử hết các URL. Vui lòng thử lại.')
    return
  }

  const [first, ...rest] = urls
  try {
    const response = await fetch(API_ROUTES.PROXY.VIDEO(first))
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const blob = await response.blob()

    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error(
      `Error downloading video (attempt failed, ${rest.length + 1} URL(s) total):`,
      error,
    )
    return downloadVideoFromUrls(rest, filename)
  }
}
