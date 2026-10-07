import { SquadsTable } from '../../components/SquadsTable'
import styles from './styles.module.scss'

export function SquadsPage() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Squads Management</h3>

      <SquadsTable maxHeight={720} expandable={true} />
    </div>
  )
}
