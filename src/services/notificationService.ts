import type { Notification } from '../types'

const BASE_URL = 'http://localhost:3000'

export const notificationService = {
  async getAll(): Promise<Notification[]> {
    const res = await fetch(`${BASE_URL}/notifications`)
    if (!res.ok) throw new Error('Error listing notifications')
    return res.json()
  },

  async delete(id: string | number): Promise<void> {
    const res = await fetch(`${BASE_URL}/squads/${id}`, {
      method: 'DELETE'
    })
    if (!res.ok) throw new Error('Error deleting notifications')
  }
}
