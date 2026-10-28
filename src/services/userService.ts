import { request } from './api'
import type { User } from '../types'

export const userService = {
  getSettings: (): Promise<User> => {
    return request<User>('/settings')
  },
  getAll: (): Promise<User> => {
    return request<User>('/settings')
  }
}
