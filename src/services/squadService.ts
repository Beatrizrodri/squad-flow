import type { Squad, StatusType } from '../types'

const BASE_URL = 'http://localhost:3000'

export const squadService = {
  async getAll(): Promise<Squad[]> {
    const res = await fetch(`${BASE_URL}/squads`)
    if (!res.ok) throw new Error('Error listing squads')
    return res.json()
  },

  async updateStatus(id: string | number, status: StatusType): Promise<Squad> {
    const res = await fetch(`${BASE_URL}/squads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
    if (!res.ok) throw new Error('Error updating squad status')
    return res.json()
  },

  async delete(id: string | number): Promise<void> {
    const res = await fetch(`${BASE_URL}/squads/${id}`, {
      method: 'DELETE'
    })
    if (!res.ok) throw new Error('Error deleting squad')
  }
}
