import { request } from './api'
import type { ResourceUtilizationItem } from '../types'

export const resourceService = {
  getAll: () => request<ResourceUtilizationItem[]>('/resources')
}
