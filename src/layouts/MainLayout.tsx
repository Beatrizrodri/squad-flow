import { Outlet } from 'react-router-dom'
import { SideBar } from '../components/SideBar'
import { Header } from '../components/Header'
import styles from './styles.module.scss'

export function MainLayout() {
  return (
    <div className={styles.container}>
      <SideBar />

      <div className={styles.contentWrapper}>
        <Header />

        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
