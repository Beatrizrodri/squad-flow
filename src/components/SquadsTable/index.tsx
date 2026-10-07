import { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import { LuUserRound, LuChevronDown, LuChevronUp } from 'react-icons/lu'

import { squadService } from '../../services/squadService'
import type { Squad, StatusType } from '../../types'
import { AllocationTable } from '../AllocationTable'
import styles from './styles.module.scss'

const statusStyles: Record<
  StatusType,
  { bg: string; text: string; dot: string; border: string }
> = {
  'On Track': {
    bg: '#e8f5e9',
    text: '#2e7d32',
    dot: '#2e7d32',
    border: '#a5d6a7'
  },
  'At Risk': {
    bg: '#fff8e1',
    text: '#ed6c02',
    dot: '#ed6c02',
    border: '#ffe082'
  },
  Delayed: { bg: '#fdeeed', text: '#d32f2f', dot: '#d32f2f', border: '#ef9a9a' }
}

interface SquadRowProps {
  row: Squad
  expandable?: boolean
}

function SquadRow({ row, expandable = false }: SquadRowProps) {
  const [open, setOpen] = useState(false)
  const currentStatus = statusStyles[row.status]

  return (
    <>
      <TableRow
        hover
        sx={{
          ...(expandable
            ? { '& > *': { borderBottom: 'unset' } }
            : { '&:last-child td, &:last-child th': { border: 0 } })
        }}
      >
        {expandable && (
          <TableCell sx={{ width: 48, px: 1 }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <LuChevronUp size={18} /> : <LuChevronDown size={18} />}
            </IconButton>
          </TableCell>
        )}

        <TableCell>
          <Avatar
            sx={{ bgcolor: '#1a365d', color: '#ffffff', width: 36, height: 36 }}
          >
            <LuUserRound size={20} />
          </Avatar>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          sx={{ fontWeight: 600, color: '#111827' }}
        >
          {row.name}
        </TableCell>
        <TableCell align="center" sx={{ color: '#4b5563', fontWeight: 500 }}>
          {row.members}
        </TableCell>
        <TableCell align="center" sx={{ color: '#4b5563', fontWeight: 600 }}>
          {row.capacity}%
        </TableCell>
        <TableCell sx={{ color: '#4b5563' }}>{row.project}</TableCell>
        <TableCell>
          <Chip
            size="small"
            label={row.status}
            icon={
              <Box
                component="span"
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: currentStatus?.dot ?? '#999',
                  marginLeft: '6px !important'
                }}
              />
            }
            sx={{
              backgroundColor: currentStatus?.bg ?? '#eee',
              color: currentStatus?.text ?? '#333',
              border: `1px solid ${currentStatus?.border ?? '#ccc'}`,
              fontWeight: 600,
              fontSize: '0.8125rem',
              borderRadius: '6px',
              height: 28,
              '& .MuiChip-label': { paddingLeft: '6px', paddingRight: '10px' }
            }}
          />
        </TableCell>
      </TableRow>

      {expandable && (
        <TableRow>
          <TableCell
            style={{
              paddingBottom: 0,
              paddingTop: 0,
              backgroundColor: '#f8fafc'
            }}
            colSpan={7}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ py: 2, px: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    color: '#334155',
                    textTransform: 'uppercase',
                    fontSize: 13,
                    letterSpacing: '0.04em'
                  }}
                >
                  Disponibilidade dos Membros — {row.name}
                </Typography>
                <AllocationTable
                  squadId={row.id}
                  embedded
                  showTitle={false}
                  maxHeight={260}
                />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}

interface SquadsTableProps {
  title?: string
  maxHeight?: number | string
  className?: string
  expandable?: boolean
}

export function SquadsTable({
  title,
  maxHeight = 'auto',
  className,
  expandable = false
}: SquadsTableProps) {
  const [rows, setRows] = useState<Squad[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const totalColumns = expandable ? 7 : 6

  useEffect(() => {
    let isMounted = true
    async function loadData() {
      try {
        setLoading(true)
        setError(null)
        const data = await squadService.getAll()
        if (isMounted) setRows(data)
      } catch {
        if (isMounted) setError('Não foi possível carregar os dados.')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadData()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className={`${styles.container || ''} ${className || ''}`}>
      <Paper elevation={1} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {title && (
          <Box sx={{ px: 2, py: 1 }}>
            <Typography
              className={styles.title}
              variant="h6"
              sx={{
                fontWeight: 800,
                fontSize: 18,
                letterSpacing: '0.04em',
                color: '#1a1a1a',
                textTransform: 'uppercase'
              }}
            >
              {title}
            </Typography>
          </Box>
        )}

        <TableContainer sx={{ maxHeight }}>
          <Table stickyHeader aria-label="active squads table">
            <TableHead>
              <TableRow>
                {expandable && (
                  <TableCell sx={{ backgroundColor: '#fafafa', width: 48 }} />
                )}
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: '#222',
                    backgroundColor: '#fafafa',
                    width: 60
                  }}
                >
                  Avatar
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: '#222',
                    backgroundColor: '#fafafa'
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 700,
                    color: '#222',
                    backgroundColor: '#fafafa'
                  }}
                >
                  Members
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 700,
                    color: '#222',
                    backgroundColor: '#fafafa'
                  }}
                >
                  Capacity
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: '#222',
                    backgroundColor: '#fafafa'
                  }}
                >
                  Project
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: '#222',
                    backgroundColor: '#fafafa'
                  }}
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={totalColumns}
                    align="center"
                    sx={{ py: 4 }}
                  >
                    <CircularProgress size={30} />
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell
                    colSpan={totalColumns}
                    align="center"
                    sx={{ py: 3, color: '#d32f2f' }}
                  >
                    {error}
                  </TableCell>
                </TableRow>
              ) : (
                rows.map(row => (
                  <SquadRow key={row.id} row={row} expandable={expandable} />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
}
