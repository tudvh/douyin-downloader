export interface IParseResult {
  url: string
  id: string
  status: 'pending' | 'success' | 'failed'
  data?: IDouyinVideo
  error?: string
}

export interface IDouyinVideo {
  id: string
  desc: string
  love_count: number
  author: Author
  cover_url: string
  fps: number
  width: number
  height: number
  urls: string[]
}

export interface Author {
  id: string
  avatar_url: string
  nickname: string
}
