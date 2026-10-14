import { request } from './api'
import type { Project } from '../types'

export const projectService = {
  getAll: (): Promise<Project[]> => request<Project[]>('/projects')
}
