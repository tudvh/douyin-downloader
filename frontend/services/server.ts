import axios from 'axios'

import { getServerEnv } from '@/envs/server'

export const serverApi = axios.create({
  baseURL: getServerEnv('APP_API_URL'),
  headers: {
    'Content-Type': 'application/json',
  },
})

export default serverApi
