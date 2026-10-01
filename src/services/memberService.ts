import { request } from './api'
import type { MemberAvailability } from '../types'

export const memberService = {
  getAll: (): Promise<MemberAvailability[]> => {
    return request<MemberAvailability[]>('/members')
  }
}
