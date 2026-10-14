import { useNavigate } from 'react-router-dom'
import LinearProgress from '@mui/material/LinearProgress'
import { AppChip } from '../AppChip'
import type { Project } from '../../types'
import { LuUserRound, LuArrowUpRight } from 'react-icons/lu'
import styles from './styles.module.scss'

interface ProjectCardProps {
  project: Project
}

export function Card({ project }: ProjectCardProps) {
  const {
    name,
    description,
    priority,
    client,
    status,
    deadline,
    progress,
    squad
  } = project

  const navigate = useNavigate()

  const handleNavigateToSquads = (): void => {
    navigate('/squads')
  }

  return (
    <div className={styles.container}>
      <div className={styles.projectDescription}>
        <span>{client}</span>
        <h3>{name}</h3>
        <AppChip label={priority} />
        <p>{description}</p>
      </div>

      <div className={styles.projectDetails}>
        <AppChip label={status} />
        <span>Deadline: {deadline}</span>
        <LinearProgress
          variant="determinate"
          value={project.progress}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: '#b9bfd0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#2c3e54',
              borderRadius: 4
            }
          }}
        />
        <span>{progress}% Completed</span>
      </div>

      <div className={styles.assignedSquad}>
        <div className={styles.squadHeader}>
          <h3>Assigned Squad</h3>
          <button onClick={handleNavigateToSquads}>
            <LuArrowUpRight size={24} />
          </button>
        </div>
        <div className={styles.squadDetails}>
          <div className={styles.squadIcon}>
            <LuUserRound size={24} />
          </div>
          <span>{squad.name}</span>
        </div>
        <div className={styles.squadCapacity}>
          <span>Members: {squad.members_count}</span>
          <span>Capacity: {squad.capacity_percentage}%</span>
        </div>
      </div>
    </div>
  )
}
