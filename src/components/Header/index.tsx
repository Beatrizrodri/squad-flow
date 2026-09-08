import styles from './styles.module.scss'
import { IoNotificationsOutline } from 'react-icons/io5'
import { LuUserRound, LuSearch } from 'react-icons/lu'

export function Header() {
  return (
    <div className={styles.container}>
      <h1>SquadFlow Dashboard</h1>
      <div className={styles.content}>
        <div className={styles.searchContainer}>
          <LuSearch className={styles.searchIcon} size={18} />
          <input
            type="search"
            placeholder="Search..."
            className={styles.searchInput}
          />
        </div>

        <button className={styles.notificationButton}>
          <IoNotificationsOutline size={28} />
        </button>

        <button type="button" className={styles.userButton}>
          <div className={styles.avatar}>
            <LuUserRound size={24} />
          </div>
          <span className={styles.userName}>User name</span>
        </button>
      </div>
    </div>
  )
}
