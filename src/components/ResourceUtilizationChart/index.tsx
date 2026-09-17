import Box from '@mui/material/Box'
import { BarChart } from '@mui/x-charts/BarChart'
import styles from './styles.module.scss'

const data = [92, 70, 100, 50, 80, 95]

const xLabels = [
  'Developers',
  'Designers',
  'QAs',
  'PMs',
  'Supervisor',
  'Software Engineer'
]

export function ResourceUtilizationChart() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Resource Utilization</h1>
        <span>Utilized: 70%</span>
      </div>
      <div className={styles.content}>
        <Box sx={{ width: '100%', height: 300 }}>
          <BarChart
            series={[
              {
                data: data,
                label: 'Percentage',
                id: 'percentage',
                color: '#9ea5b3'
              }
            ]}
            xAxis={[
              {
                data: xLabels,
                height: 28
              }
            ]}
            yAxis={[
              {
                width: 50
                // valueFormatter: (value) => `${value}%`,
              }
            ]}
            hideLegend
          />
        </Box>
      </div>
    </div>
  )
}
