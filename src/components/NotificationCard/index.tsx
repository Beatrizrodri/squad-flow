import { LuTrash2, LuUserRound } from 'react-icons/lu'
import type { Notification, NotificationPriority } from '../../types'
import { LuEye } from 'react-icons/lu'
import styles from './styles.module.scss'

interface NotificationProps {
  notification: Notification
}

export const AvailablePriority: NotificationPriority[] = [
  'Low',
  'Medium',
  'High',
  'Critical'
]

export const PriorityStyles: Record<
  NotificationPriority | 'Default',
  { color: string }
> = {
  Low: {
    color: '#24a0c5'
  },
  Medium: {
    color: '#1fa700'
  },
  High: {
    color: '#ffb300'
  },
  Critical: {
    color: '#ff0000'
  },
  Default: {
    color: 'transparent'
  }
}

function formatBrazilianDate(isoDateString?: string | null): string {
  if (!isoDateString) return ''

  const date = new Date(isoDateString)

  if (isNaN(date.getTime())) return ''

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

export function NotificationCard({ notification }: NotificationProps) {
  const { title, priority, author, description, sentAt } = notification

  const indicatorColor =
    priority && PriorityStyles[priority]
      ? PriorityStyles[priority].color
      : PriorityStyles.Default.color

  return (
    <div
      className={styles.container}
      style={{ borderLeftColor: indicatorColor }}
    >
      <div className={styles.author}>
        <div className={styles.avatar}>
          <LuUserRound size={24} />
        </div>
        <span className={styles.authorName}>{author}</span>
      </div>

      <div className={styles.description}>
        <div className={styles.headerDescription}>
          <h1 className={styles.title}>{title}</h1>
          <span>{formatBrazilianDate(sentAt)}</span>
        </div>
        <span>{description}</span>
      </div>

      <div className={styles.options}>
        <button className={styles.readButton}>
          <LuEye size={16} /> Mark as read
        </button>
        <button className={styles.deleteButton}>
          <LuTrash2 size={20} />
        </button>
      </div>
    </div>
  )
}
