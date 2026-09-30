import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { BarChart } from '@mui/x-charts/BarChart'
import { resourceService } from '../../services/resourceService'
import type { ResourceUtilizationItem } from '../../types'
import styles from './styles.module.scss'

export function ResourceUtilizationChart() {
  const [resources, setResources] = useState<ResourceUtilizationItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    resourceService
      .getAll()
      .then(data => setResources(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const xLabels = resources.map(item => item.role)

  const data = resources.map(item => {
    if (!item.total || item.total <= 0) return 0
    return Math.round((item.utilized / item.total) * 100)
  })

  const totalUtilized = resources.reduce((acc, curr) => acc + curr.utilized, 0)
  const totalCapacity = resources.reduce((acc, curr) => acc + curr.total, 0)
  const averageUtilized =
    totalCapacity > 0 ? Math.round((totalUtilized / totalCapacity) * 100) : 0

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Resource Utilization</h1>
        <span>Utilized: {averageUtilized}%</span>
      </div>
      <div className={styles.content}>
        <Box
          sx={{
            width: '100%',
            height: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {loading ? (
            <CircularProgress size={32} />
          ) : (
            <BarChart
              series={[
                {
                  data: data,
                  label: 'Percentage',
                  id: 'percentage',
                  color: '#9ea5b3',
                  valueFormatter: value => `${value ?? 0}%`
                }
              ]}
              xAxis={[
                {
                  data: xLabels,
                  scaleType: 'band',
                  height: 28
                }
              ]}
              yAxis={[
                {
                  width: 50,
                  max: 100,
                  valueFormatter: (value: number | null) => `${value ?? 0}%`
                }
              ]}
              hideLegend
            />
          )}
        </Box>
      </div>
    </div>
  )
}
