import { request } from './api'
import type { Notification } from '../types'

export const notificationService = {
  getAll: (): Promise<Notification[]> =>
    request<Notification[]>('/notifications')
}
