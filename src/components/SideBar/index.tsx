import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import Logo from '../../assets/LogoSquadFlow.png'
import { IoNotificationsOutline } from 'react-icons/io5'
import {
  LuUsers,
  LuChartPie,
  LuFolder,
  LuSettings,
  LuLayoutDashboard
} from 'react-icons/lu'

export function SideBar() {
  const navigate = useNavigate()

  const handleNavigateToDashboard = (): void => {
    navigate('/')
  }

  const handleNavigateToSquads = (): void => {
    navigate('/squads')
  }

  const handleNavigateToProjects = (): void => {
    navigate('/projects')
  }

  const handleNavigateToAllocation = (): void => {
    navigate('/allocation')
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <img src={Logo} alt="" />
        </div>

        <div className={styles.options}>
          <button className={styles.option} onClick={handleNavigateToDashboard}>
            <LuLayoutDashboard size={22} /> Dashboard
          </button>

          <button className={styles.option} onClick={handleNavigateToSquads}>
            <LuUsers size={22} /> Squads
          </button>

          <button className={styles.option} onClick={handleNavigateToProjects}>
            <LuFolder size={22} /> Projects
          </button>

          <button
            className={styles.option}
            onClick={handleNavigateToAllocation}
          >
            <LuChartPie size={22} /> Allocations
          </button>

          <button className={styles.option}>
            <IoNotificationsOutline size={22} /> Notifications
          </button>

          <button className={styles.option}>
            <LuSettings size={22} /> Settings
          </button>
        </div>
      </div>
    </>
  )
}
