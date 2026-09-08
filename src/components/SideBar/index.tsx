import styles from './styles.module.scss'
import Logo from '../../assets/LogoSquadFlow.png'
import {
  LuUsers,
  LuChartPie,
  LuFileText,
  LuFolder,
  LuSettings
} from 'react-icons/lu'

export function SideBar() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <img src={Logo} alt="" />
        </div>
        <div className={styles.options}>
          <button className={styles.option}>
            <LuUsers size={22} /> Squads
          </button>
          <button className={styles.option}>
            <LuFolder size={22} /> Projects
          </button>
          <button className={styles.option}>
            <LuChartPie size={22} /> Allocations
          </button>
          <button className={styles.option}>
            <LuFileText size={22} /> Reports
          </button>
          <button className={styles.option}>
            <LuSettings size={22} /> Settings
          </button>
        </div>
      </div>
    </>
  )
}
