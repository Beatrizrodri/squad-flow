import styles from './styles.module.scss'
import { IoNotificationsOutline } from 'react-icons/io5'
import { LuUserRound } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'

export function Header() {
  const navigate = useNavigate()

  const handleNavigateToNotifications = (): void => {
    navigate('/notifications')
  }

  return (
    <div className={styles.container}>
      <h1>SquadFlow Dashboard</h1>

      <div className={styles.content}>
        <button type="button" className={styles.userButton}>
          <div className={styles.avatar}>
            <LuUserRound size={24} />
          </div>

          <span className={styles.userName}>User name</span>
        </button>

        <button
          className={styles.notificationButton}
          onClick={handleNavigateToNotifications}
        >
          <IoNotificationsOutline size={28} />
        </button>
      </div>
    </div>
  )
}
