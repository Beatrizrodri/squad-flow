import Switch from '@mui/material/Switch'
import { LuUserRound } from 'react-icons/lu'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import type { User } from '../../types'
import { userService } from '../../services/userService'

export function SettingsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await userService.getSettings()
        setUser(data)
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  if (isLoading) {
    return <div>Carregando...</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Settings (Profile & Preferences)</h2>
        <span>
          Menage your personal information, role, details and interface
          settings.
        </span>
      </div>
      <div className={styles.content}>
        <div className={styles.profileDetails}>
          <div className={styles.user}>
            <div className={styles.avatar}>
              <LuUserRound size={60} />
            </div>

            <div className={styles.profileInformation}>
              <span className={styles.userName}>{user?.name}</span>
              <span className={styles.role}>{user?.role}</span>
              <span>{user?.biography}</span>
            </div>
          </div>

          <div className={styles.contentInformation}>
            <div className={styles.userInformation}>
              <span>Full Name</span>
              <input
                className={styles.input}
                type="text"
                value={user?.name || ''}
                onChange={e =>
                  setUser(prev =>
                    prev ? { ...prev, name: e.target.value } : null
                  )
                }
              />
            </div>

            <div className={styles.userInformation}>
              <span>Email</span>
              <input
                className={styles.input}
                type="text"
                value={user?.email || ''}
                onChange={e =>
                  setUser(prev =>
                    prev ? { ...prev, email: e.target.value } : null
                  )
                }
              />
            </div>

            <div className={styles.userInformation}>
              <span>Role</span>
              <input
                className={styles.input}
                type="text"
                value={user?.role || ''}
                onChange={e =>
                  setUser(prev =>
                    prev ? { ...prev, role: e.target.value } : null
                  )
                }
              />
            </div>

            <div className={styles.userInformation}>
              <span>Phone Number</span>
              <input
                className={styles.input}
                type="number"
                value={user?.phone || ''}
              />
            </div>
          </div>
          <div className={styles.options}>
            <button className={styles.cancelButton}>Cancel</button>
            <button className={styles.confirmButton}>Salve</button>
          </div>
        </div>

        <div className={styles.preferencesSettings}>
          <h2>Preferences</h2>
          <div className={styles.userInformation}>
            <span>Language</span>
            <select className={styles.input} />
          </div>

          <div className={styles.userInformation}>
            <span>Timezone</span>
            <select className={styles.input} />
          </div>

          <div className={styles.theme}>
            <h2>Theme</h2>
            <div className={styles.themeOptions}>
              <button>Light</button>
              <button>Dark</button>
            </div>
          </div>

          <div className={styles.notificationSettings}>
            <h2>Notification</h2>
            <div>
              <span>Receive only high-priority notifications</span>
              <Switch slotProps={{ input: { 'aria-label': 'controlled' } }} />
            </div>

            <div>
              <span>Delete notifications that have already been read</span>
              <Switch slotProps={{ input: { 'aria-label': 'controlled' } }} />
            </div>

            <div>
              <span>Receive automatic notifications</span>
              <Switch slotProps={{ input: { 'aria-label': 'controlled' } }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
