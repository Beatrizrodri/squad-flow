import { IoAlertCircle } from 'react-icons/io5'
import styles from './styles.module.scss'

export function AlertsDescription() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Alerts Description</h1>
      <span>
        <IoAlertCircle color="#1fa700" /> Update notification.
      </span>
      <span>
        <IoAlertCircle color="#ffb300" /> Resolution is required within a
        specific timeframe.
      </span>
      <span>
        <IoAlertCircle color="#ff7300" /> Resolution must be reached as soon as
        possible.
      </span>
      <span>
        <IoAlertCircle color="#ff0000" /> Resolution must be immediate.
      </span>
    </div>
  )
}
