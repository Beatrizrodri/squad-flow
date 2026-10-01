// src/components/AllocationOverview/index.tsx
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { PieChart } from '@mui/x-charts/PieChart'
import { useDrawingArea } from '@mui/x-charts/hooks'

import { allocationService } from '../../services/allocationService'
import type { SquadAllocationOverview } from '../../types'
import styles from './styles.module.scss'

interface PieCenterHtmlProps {
  children: ReactNode
}

function PieCenterHtml({ children }: PieCenterHtmlProps) {
  const { width, height, left, top } = useDrawingArea()
  const boxSize = 280

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
  const [overview, setOverview] = useState<SquadAllocationOverview | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchOverview(): Promise<void> {
      try {
        setIsLoading(true)
        setErrorMessage(null)
        const data = await allocationService.getOverview()
        if (isMounted) {
          setOverview(data)
        }
      } catch (err) {
        if (isMounted) {
          setErrorMessage(
            'Não foi possível carregar a visão geral de alocação.'
          )
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void fetchOverview()

    return () => {
      isMounted = false
    }
  }, [])

  if (isLoading) {
    return (
      <div className={styles.card}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 300
          }}
        >
          <CircularProgress size={36} sx={{ color: '#1d446c' }} />
        </Box>
      </div>
    )
  }

  if (errorMessage || !overview) {
    return (
      <div className={styles.card}>
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="error" variant="body2">
            {errorMessage ?? 'Nenhum dado encontrado.'}
          </Typography>
        </Box>
      </div>
    )
  }

  const chartData = [
    {
      value: overview.active,
      label: `Active: ${overview.active}`,
      color: '#1d446c'
    },
    {
      value: overview.available,
      label: `Available: ${overview.available}`,
      color: '#5b728d'
    },
    {
      value: overview.utilized,
      label: `Utilized: ${overview.utilized}%`,
      color: '#9ea5b3'
    }
  ]

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Squad Allocation Overview</h2>

      <div className={styles.content}>
        <PieChart
          series={[
            {
              data: chartData,
              innerRadius: 96,
              paddingAngle: 1
            }
          ]}
          width={250}
          height={250}
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
                fontSize: 18,
                fontWeight: '500',
                marginLeft: '34px'
              }
            }
          }}
        >
          <PieCenterHtml>
            <div className={styles.centerContainer}>
              <div className={styles.statBlock}>
                <span className={styles.statValue}>{overview.squadsTotal}</span>
                <span className={styles.statLabel}>Squads</span>
              </div>

              <div className={styles.divider} />

              <div className={styles.statBlock}>
                <span className={styles.statValue}>
                  {overview.membersTotal}
                </span>
                <span className={styles.statLabel}>Members</span>
              </div>
            </div>
          </PieCenterHtml>
        </PieChart>
      </div>
    </div>
  )
}
