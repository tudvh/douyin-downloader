import moment from 'moment'

export const DOUYIN_VIDEO_URL_REGEX = /https?:\/\/(?:www\.)?douyin\.com\/video\/\d+/g

export const DOUYIN_VIDEO_ID_REGEX = /^https?:\/\/(?:www\.)?douyin\.com\/video\/(\d+)(?:\?.*)?$/

export const DOUYIN_VIDEO = {
  MP4_FILE_NAME: (index: number, id: string) => `douyin-video_${index}_${id}.mp4`,
  ZIP_FILE_NAME: () => `douyin-videos_${moment().format('YYYYMMDDHHmmss')}.zip`,
  DOUYIN_USER_URL: (id: string) => `https://douyin.com/user/${id}`,
  VIDEO_ELEMENT_ID: (url: string) => `video-${url}`,
}
