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
import CircularProgress from '@mui/material/CircularProgress'
import Chip from '@mui/material/Chip'
import { LuUserRound } from 'react-icons/lu'

import { memberService } from '../../services/memberService'
import type { MemberAvailability } from '../../types'
import styles from './styles.module.scss'

interface AllocationTableProps {
  squadId?: string | number
  embedded?: boolean
  showTitle?: boolean
  maxHeight?: number | string
}

export function AllocationTable({
  squadId,
  embedded = false,
  showTitle = true,
  maxHeight = 350
}: AllocationTableProps) {
  const [members, setMembers] = useState<MemberAvailability[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchMembers(): Promise<void> {
      try {
        setIsLoading(true)
        setErrorMessage(null)
        const data = await memberService.getAll()

        if (isMounted) {
          const displayedMembers =
            squadId !== undefined && squadId !== null
              ? data.filter(
                  member => String(member.squadId) === String(squadId)
                )
              : data

          setMembers(displayedMembers)
        }
      } catch (err) {
        if (isMounted) {
          setErrorMessage(
            'Não foi possível carregar a disponibilidade dos membros.'
          )
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void fetchMembers()

    return () => {
      isMounted = false
    }
  }, [squadId])

  const isAllocated = (availability: string): boolean => {
    return availability.toLowerCase().includes('100%')
  }

  const tableContent = (
    <TableContainer sx={{ maxHeight, minHeight: 120 }}>
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 140
          }}
        >
          <CircularProgress size={30} sx={{ color: '#1a365d' }} />
        </Box>
      ) : errorMessage ? (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="error" variant="body2">
            {errorMessage}
          </Typography>
        </Box>
      ) : (
        <Table
          size={embedded ? 'small' : 'medium'}
          stickyHeader
          aria-label="individual availability table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 700,
                  color: '#475569',
                  backgroundColor: '#f1f5f9',
                  width: 60
                }}
              >
                Avatars
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  color: '#475569',
                  backgroundColor: '#f1f5f9'
                }}
              >
                Names
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  color: '#475569',
                  backgroundColor: '#f1f5f9'
                }}
              >
                Roles
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  color: '#475569',
                  backgroundColor: '#f1f5f9',
                  minWidth: 150
                }}
              >
                Availability
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {members.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                  sx={{ py: 3, color: '#64748b', fontSize: '0.875rem' }}
                >
                  Nenhum membro encontrado.
                </TableCell>
              </TableRow>
            ) : (
              members.map((row: MemberAvailability) => {
                const fullyAllocated = isAllocated(row.availability)

                return (
                  <TableRow
                    key={row.id}
                    hover
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      <Avatar
                        src={row.avatarUrl}
                        sx={{
                          bgcolor: '#1a365d',
                          color: '#ffffff',
                          width: embedded ? 32 : 40,
                          height: embedded ? 32 : 40
                        }}
                      >
                        <LuUserRound size={embedded ? 18 : 22} />
                      </Avatar>
                    </TableCell>

                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: 600, color: '#111827' }}
                    >
                      {row.name}
                    </TableCell>

                    <TableCell sx={{ color: '#4b5563' }}>{row.role}</TableCell>

                    <TableCell sx={{ minWidth: 150 }}>
                      <Chip
                        label={row.availability}
                        size="small"
                        sx={{
                          width: '100%',
                          height: 'auto',
                          py: 0.5,
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          borderRadius: 4,
                          border: '1px solid',
                          backgroundColor: fullyAllocated
                            ? '#f3f4f6'
                            : '#edf7ed',
                          color: fullyAllocated ? '#4b5563' : '#2e7d32',
                          borderColor: fullyAllocated ? '#e5e7eb' : '#c8e6c9',
                          '& .MuiChip-label': {
                            width: '100%',
                            whiteSpace: 'pre-line',
                            lineHeight: 1.3,
                            textAlign: 'center',
                            px: 1
                          }
                        }}
                      />
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  )

  if (embedded) {
    return (
      <Box
        sx={{
          width: '100%',
          bgcolor: '#ffffff',
          borderRadius: 1.5,
          border: '1px solid #e2e8f0',
          overflow: 'hidden'
        }}
      >
        {tableContent}
      </Box>
    )
  }

  return (
    <div className={styles.container}>
      <Paper elevation={1} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {showTitle && (
          <Box sx={{ px: 2, py: 1.5 }}>
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
              Individual Availability
            </Typography>
          </Box>
        )}
        {tableContent}
      </Paper>
    </div>
  )
}
