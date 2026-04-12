import { API_ROUTES } from '@/configs'
import apiClient from '@/services/client'
import { IDouyinVideo } from '@/types/douyin'

export class DouyinVideoService {
  static async getVideo(id: string) {
    const { data } = await apiClient.get<IDouyinVideo>(API_ROUTES.DOUYIN.VIDEO(id))
    return data
  }
}
