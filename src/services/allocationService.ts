import { request } from './api'
import type { SquadAllocationOverview } from '../types'

export const allocationService = {
  getOverview: (): Promise<SquadAllocationOverview> => {
    return request<SquadAllocationOverview>('/allocation-overview')
  }
}
