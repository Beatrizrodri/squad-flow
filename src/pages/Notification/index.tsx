import { useEffect, useState } from 'react'
import { NotificationCard } from '../../components/NotificationCard'
import styles from './styles.module.scss'
import type { Notification } from '../../types'
import { notificationService } from '../../services/notificationService'

export function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNotifications = async () => {
    try {
      setIsLoading(true)
      const data = await notificationService.getAll()
      setNotifications(data)
    } catch (err) {
      console.error('Error fetching notifications:', err)
      setError('Unable to load the notifications.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  if (isLoading) {
    return <div className="loading">Loading projects...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Notifications Management</h2>

      <div className={styles.content}>
        {notifications.map(notification => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  )
}
