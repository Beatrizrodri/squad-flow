import './styles/globalStyles.css'
import styles from './App.module.scss'
import { SideBar } from './components/SideBar'
import { Header } from './components/Header'
import { AllocationOverview } from './components/AllocationOverview'
import { ResourceUtilizationChart } from './components/ResourceUtilizationChart'

export function App() {
  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.content}>
        <Header />
        <div className={styles.boardContent}>
          <AllocationOverview />
          <ResourceUtilizationChart />
        </div>
      </div>
    </div>
  )
}
