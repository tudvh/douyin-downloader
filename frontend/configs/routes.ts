export const WEB_ROUTES = {
  HOME: '/',
  DOUYIN: {
    VIDEOS: '/douyin/videos',
    IMAGES: '/douyin/images',
  },
  TIKTOK: {
    VIDEOS: '/tiktok/videos',
    IMAGES: '/tiktok/images',
  },
}

export const API_ROUTES = {
  PROXY: {
    VIDEO: (url: string) => `/api/proxy/videos?url=${encodeURIComponent(url)}`,
  },
  DOUYIN: {
    VIDEO: (id: string) => `/douyin/videos/${id}`,
  },
}
