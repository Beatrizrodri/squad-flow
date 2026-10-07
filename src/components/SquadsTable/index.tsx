import { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import { squadService } from '../../services/squadService'
import type { Squad, StatusType } from '../../types'
import { SquadRow } from './squadRow'
import styles from './styles.module.scss'

interface SquadsTableProps {
  title?: string
  maxHeight?: number | string
  className?: string
  expandable?: boolean
  editable?: boolean
  deletable?: boolean
  onUpdateStatus?: (squadId: string | number, newStatus: StatusType) => void
  onDeleteSquad?: (squadId: string | number) => void
}

export function SquadsTable({
  title,
  maxHeight = 'auto',
  className,
  expandable = false,
  editable = false,
  deletable = false,
  onUpdateStatus,
  onDeleteSquad
}: SquadsTableProps) {
  const [rows, setRows] = useState<Squad[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [feedbackError, setFeedbackError] = useState<string | null>(null)

  let totalColumns = 6
  if (expandable) totalColumns += 1
  if (editable) totalColumns += 1
  if (deletable) totalColumns += 1

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

  const handleUpdateStatus = async (
    squadId: string | number,
    newStatus: StatusType
  ) => {
    const previousRows = [...rows]
    setRows(prev =>
      prev.map(squad =>
        squad.id === squadId ? { ...squad, status: newStatus } : squad
      )
    )

    try {
      await squadService.updateStatus(squadId, newStatus)
      onUpdateStatus?.(squadId, newStatus)
    } catch {
      setRows(previousRows)
      setFeedbackError('Erro ao atualizar o status na API.')
    }
  }

  const handleDeleteSquad = async (squadId: string | number) => {
    const previousRows = [...rows]

    setRows(prev => prev.filter(squad => squad.id !== squadId))

    try {
      await squadService.delete(squadId)
      onDeleteSquad?.(squadId)
    } catch {
      setRows(previousRows)
      setFeedbackError('Erro ao deletar o squad na API.')
    }
  }

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
                  <TableCell sx={{ backgroundColor: '#fafafa', width: 44 }} />
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
                {editable && (
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 700,
                      color: '#222',
                      backgroundColor: '#fafafa',
                      width: 50
                    }}
                  >
                    Edit
                  </TableCell>
                )}
                {deletable && (
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 700,
                      color: '#222',
                      backgroundColor: '#fafafa',
                      width: 50
                    }}
                  >
                    Delete
                  </TableCell>
                )}
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
                  <SquadRow
                    key={row.id}
                    row={row}
                    expandable={expandable}
                    editable={editable}
                    deletable={deletable}
                    totalColumns={totalColumns}
                    onUpdateStatus={handleUpdateStatus}
                    onDeleteSquad={handleDeleteSquad}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Snackbar
        open={Boolean(feedbackError)}
        autoHideDuration={4000}
        onClose={() => setFeedbackError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setFeedbackError(null)}
          severity="error"
          sx={{ width: '100%' }}
        >
          {feedbackError}
        </Alert>
      </Snackbar>
    </div>
  )
}
