import './styles/globalStyles.css'
import styles from './App.module.scss'
import { SideBar } from './components/SideBar'
import { Header } from './components/Header'
import { AllocationOverview } from './components/AllocationOverview'
import { ResourceUtilizationChart } from './components/ResourceUtilizationChart'
import { AlertsDescription } from './components/AlertsDescription'
import { AllocationTable } from './components/AllocationTable'

export function App() {
  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.content}>
        <Header />
        <div className={styles.boardContainer}>
          <div className={styles.dashboardColumn}>
            <AllocationOverview />
            <AlertsDescription />
            <AllocationTable />
          </div>
          <div className={styles.dashboardColumn}>
            <ResourceUtilizationChart />
          </div>
        </div>
      </div>
    </div>
  )
}
