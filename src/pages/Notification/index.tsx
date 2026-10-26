import { useEffect, useMemo, useState } from 'react'
import { NotificationCard } from '../../components/NotificationCard'
import styles from './styles.module.scss'
import type { Notification } from '../../types'
import { notificationService } from '../../services/notificationService'

type FilterTab = 'all' | 'unread' | 'read'

export function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [activeTab, setActiveTab] = useState<FilterTab>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNotifications = async () => {
    try {
      setIsLoading(true)
      const data = await notificationService.getAll()
      const list = Array.isArray(data) ? data : (data as any)?.data || []
      setNotifications(list)
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

  const handleToggleRead = async (id: string | number) => {
    const target = notifications.find(n => n.id === id)
    if (!target) return

    const nextReadState = !target.isRead

    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: nextReadState } : n))
    )
  }

  const handleDelete = async (id: string | number) => {
    const backup = [...notifications]
    setNotifications(prev => prev.filter(n => n.id !== id))

    try {
      if (notificationService.delete) {
        await notificationService.delete(id)
      }
    } catch (err) {
      console.error('Error deleting notification:', err)
      setNotifications(backup)
    }
  }

  const filteredNotifications = useMemo(() => {
    switch (activeTab) {
      case 'unread':
        return notifications.filter(n => !n.isRead)
      case 'read':
        return notifications.filter(n => n.isRead)
      default:
        return notifications
    }
  }, [notifications, activeTab])

  if (isLoading) {
    return <div className={styles.loading}>Loading notifications...</div>
  }

  if (error) {
    return <div className={styles.error}>{error}</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Notifications Management</h2>

        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tabButton} ${
              activeTab === 'all' ? styles.active : ''
            }`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button
            type="button"
            className={`${styles.tabButton} ${
              activeTab === 'unread' ? styles.active : ''
            }`}
            onClick={() => setActiveTab('unread')}
          >
            Unread
          </button>
          <button
            type="button"
            className={`${styles.tabButton} ${
              activeTab === 'read' ? styles.active : ''
            }`}
            onClick={() => setActiveTab('read')}
          >
            Read
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notification => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onToggleRead={handleToggleRead}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className={styles.emptyState}>No notifications in this tab.</div>
        )}
      </div>
    </div>
  )
}
