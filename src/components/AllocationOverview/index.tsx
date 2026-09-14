import * as React from 'react'
import { PieChart } from '@mui/x-charts/PieChart'
import { useDrawingArea } from '@mui/x-charts/hooks'
import styles from './styles.module.scss'

const mock = {
  title: 'SQUAD ALLOCATION OVERVIEW',
  squadsTotal: 15,
  membersTotal: 98,
  active: 12,
  available: 5,
  utilized: 15
}

function PieCenterHtml({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea()

  const boxSize = 130

  return (
    <foreignObject
      x={left + width / 2 - boxSize / 2}
      y={top + height / 2 - boxSize / 2}
      width={boxSize}
      height={boxSize}
    >
      <div className={styles.centerWrapper}>{children}</div>
    </foreignObject>
  )
}

export function AllocationOverview() {
  const data = [
    { value: mock.active, label: `Active: ${mock.active}`, color: '#1d446c' },
    {
      value: mock.available,
      label: `Available: ${mock.available}`,
      color: '#5b728d'
    },
    {
      value: mock.utilized,
      label: `Utilized: ${mock.utilized}%`,
      color: '#9ea5b3'
    }
  ]

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{mock.title}</h2>

      <div>
        <PieChart
          series={[
            {
              data,
              innerRadius: 92,
              paddingAngle: 1
            }
          ]}
          width={240}
          height={240}
          slotProps={{
            legend: {
              direction: 'vertical',
              position: {
                vertical: 'middle',
                horizontal: 'end'
              },
              sx: {
                gap: '20px',
                fontFamily: 'Poppins',
                fontSize: 16,
                fontWeight: '500'
              }
            }
          }}
        >
          <PieCenterHtml>
            <div className={styles.centerContainer}>
              <div className={styles.statBlock}>
                <span className={styles.statValue}>{mock.squadsTotal}</span>
                <span className={styles.statLabel}>Squads</span>
              </div>

              <div className={styles.divider} />

              <div className={styles.statBlock}>
                <span className={styles.statValue}>{mock.membersTotal}</span>
                <span className={styles.statLabel}>Members</span>
              </div>
            </div>
          </PieCenterHtml>
        </PieChart>
      </div>
    </div>
  )
}
