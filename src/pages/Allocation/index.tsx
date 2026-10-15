import { AllocationTable } from '../../components/AllocationTable'
import styles from './styles.module.scss'

export function AllocationPage() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Allocation Overview</h3>

      <AllocationTable height={750} showTitle={false} />
    </div>
  )
}
