export type StatusType = 'On Track' | 'At Risk' | 'Delayed'

export interface Squad {
  id: string | number
  name: string
  members: number
  capacity: number
  project: string
  status: StatusType
}

export type CreateSquadDTO = Omit<Squad, 'id'>
