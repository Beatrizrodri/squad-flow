import { useState, type MouseEvent } from 'react'
import { LuCheck, LuEye, LuTrash2, LuUserRound } from 'react-icons/lu'
import type { Notification, NotificationPriority } from '../../types'
import styles from './styles.module.scss'
import { ConfirmDialog } from '../ConfirmDialog'

interface NotificationProps {
  notification: Notification
  onToggleRead?: (id: string | number) => void
  onDelete?: (id: string | number) => void
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
  Low: { color: '#24a0c5' },
  Medium: { color: '#1fa700' },
  High: { color: '#ffb300' },
  Critical: { color: '#ff0000' },
  Default: { color: 'transparent' }
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

export function NotificationCard({
  notification,
  onToggleRead,
  onDelete
}: NotificationProps) {
  const { id, title, priority, author, description, sentAt, isRead } =
    notification

  const indicatorColor =
    priority && PriorityStyles[priority]
      ? PriorityStyles[priority].color
      : PriorityStyles.Default.color

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleOpenDeleteDialog = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setDeleteDialogOpen(true)
  }

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false)
  }

  const handleConfirmDelete = () => {
    onDelete?.(id)
    setDeleteDialogOpen(false)
  }

  return (
    <div
      className={`${styles.container} ${isRead ? styles.isRead : ''}`}
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
          <span className={styles.date}>{formatBrazilianDate(sentAt)}</span>
        </div>
        <span className={styles.text}>{description}</span>
      </div>

      <div className={styles.options}>
        <button
          type="button"
          className={`${styles.readButton} ${isRead ? styles.readActive : ''}`}
          onClick={() => onToggleRead?.(id)}
          title={isRead ? 'Mark as unread' : 'Mark as read'}
        >
          {isRead ? (
            <>
              <LuCheck size={16} /> Read
            </>
          ) : (
            <>
              <LuEye size={16} /> Mark as read
            </>
          )}
        </button>

        <button
          type="button"
          className={styles.deleteButton}
          onClick={handleOpenDeleteDialog}
          title="Delete notification"
        >
          <LuTrash2 size={20} />
        </button>

        <ConfirmDialog
          open={deleteDialogOpen}
          title="Delete notification"
          description={
            <>
              Are you sure you want to delete the notification{' '}
              <strong>{title}</strong>? This action cannot be undone.
            </>
          }
          confirmLabel="Delete"
          confirmColor="error"
          onClose={handleCloseDeleteDialog}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </div>
  )
}
