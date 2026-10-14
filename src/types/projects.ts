export type ProjectPriority =
  | 'High Priority'
  | 'Medium Priority'
  | 'Low Priority'

export type ProjectStatus =
  | 'On Track'
  | 'At Risk'
  | 'Delayed'
  | 'In Progress'
  | 'In Planning'

export interface ProjectSquad {
  id: number
  name: string
  members_count: number
  capacity_percentage: number
}

export interface Project {
  id: number
  name: string
  description: string
  client: string
  priority: ProjectPriority
  status: ProjectStatus
  deadline: string
  progress: number
  squad: ProjectSquad
}
