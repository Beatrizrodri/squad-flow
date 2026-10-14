import { useEffect, useState } from 'react'
import type { Project } from '../../types'
import { projectService } from '../../services/projectsService'
import { Card } from '../../components/Card'
import styles from './styles.module.scss'

export const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true)
        const data = await projectService.getAll()
        setProjects(data)
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError('Unable to load the projects.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (isLoading) {
    return <div className="loading">Loading projects...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Projects Overview</h2>

      <div className={styles.content}>
        {projects.map(project => (
          <Card key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
