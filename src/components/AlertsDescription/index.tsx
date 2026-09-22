import { IoAlertCircle } from 'react-icons/io5'
import styles from './styles.module.scss'

export function AlertsDescription() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Alerts Description</h1>
      <span>
        <IoAlertCircle color="green" /> Update notification.
      </span>
      <span>
        <IoAlertCircle color="yellow" /> Resolution is required within a
        specific timeframe.
      </span>
      <span>
        <IoAlertCircle color="orange" /> Resolution must be reached as soon as
        possible.
      </span>
      <span>
        <IoAlertCircle color="red" /> Resolution must be immediate.
      </span>
    </div>
  )
}
