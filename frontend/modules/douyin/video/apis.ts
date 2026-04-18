import { API_ROUTES } from '@/configs'
import apiClient from '@/services/client'
import { IDouyinVideo } from '@/types/douyin'

export class DouyinVideoService {
  static async getVideo(id: string, signal?: AbortSignal) {
    const { data } = await apiClient.get<IDouyinVideo>(API_ROUTES.DOUYIN.VIDEO(id), { signal })
    return data
  }
}
