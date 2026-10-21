export type NotificationPriority = 'Low' | 'Medium' | 'High' | 'Critical'

export type Notification = {
  id: number
  title: string
  author: string
  description: string
  sentAt: string
  isRead: boolean
  priority: NotificationPriority
}
