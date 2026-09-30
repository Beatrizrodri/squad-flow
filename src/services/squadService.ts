import { request } from './api'
import type { Squad } from '../types/squad'

export const squadService = {
  getAll: () => request<Squad[]>('/squads'),

  getById: (id: string | number) => request<Squad>(`/squads/${id}`),

  create: (data: Omit<Squad, 'id'>) =>
    request<Squad>('/squads', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  delete: (id: string | number) =>
    request<void>(`/squads/${id}`, {
      method: 'DELETE'
    })
}
