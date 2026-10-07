import { AllocationOverview } from '../../components/AllocationOverview'
import { ResourceUtilizationChart } from '../../components/ResourceUtilizationChart'
import { AlertsDescription } from '../../components/AlertsDescription'
import { AllocationTable } from '../../components/AllocationTable'
import { SquadsTable } from '../../components/SquadsTable'
import '../../styles/globalStyles.css'
import styles from './styles.module.scss'

export function DashboardPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.boardContainer}>
          <div className={styles.dashboardColumn}>
            <AllocationOverview />
            <AlertsDescription />
            <AllocationTable maxHeight={180} />
          </div>
          <div className={styles.dashboardColumn}>
            <ResourceUtilizationChart />
            <SquadsTable maxHeight={350} title="Squads" />
          </div>
        </div>
      </div>
    </div>
  )
}
