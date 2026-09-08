import './styles/globalStyles.css'
import styles from './App.module.scss'
import { SideBar } from './components/SideBar'
import { Header } from './components/Header'

export function App() {
  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.content}>
        <Header />
        <div className={styles.boardContent}></div>
      </div>
    </div>
  )
}
