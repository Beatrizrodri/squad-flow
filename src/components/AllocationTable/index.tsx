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
import { LuArrowUpRight, LuUserRound } from 'react-icons/lu'

import { memberService } from '../../services/memberService'
import type { MemberAvailability } from '../../types'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'

interface AllocationTableProps {
  squadId?: string | number
  embedded?: boolean
  showTitle?: boolean
  maxHeight?: number | string
  height?: number | string
}

export function AllocationTable({
  squadId,
  embedded = false,
  showTitle = true,
  maxHeight = 350,
  height
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
          setErrorMessage('Unable to load member availability.')
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

  const navigate = useNavigate()

  const handleNavigateToAllocation = (): void => {
    navigate('/allocation')
  }

  const tableContent = (
    <TableContainer
      sx={{
        flex: height ? 1 : 'unset',
        height: height ?? 'auto',
        maxHeight: height ? 'none' : maxHeight ?? 350,
        minHeight: 120,
        overflowY: 'auto'
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 140
          }}
        >
          <CircularProgress size={30} sx={{ color: 'var(--theme-btn-active-bg)' }} />
        </Box>
      ) : errorMessage ? (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="error" variant="body2">
            {errorMessage}
          </Typography>
        </Box>
      ) : (
        <Table
          stickyHeader={Boolean(maxHeight && !height)}
          aria-label="individual availability table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 700,
                  color: 'var(--table-header-text)',
                  backgroundColor: 'var(--table-header-bg)',
                  borderColor: 'var(--table-cell-border)',
                  width: 60
                }}
              >
                Avatars
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  color: 'var(--table-header-text)',
                  backgroundColor: 'var(--table-header-bg)',
                  borderColor: 'var(--table-cell-border)'
                }}
              >
                Names
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  color: 'var(--table-header-text)',
                  backgroundColor: 'var(--table-header-bg)',
                  borderColor: 'var(--table-cell-border)'
                }}
              >
                Roles
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  color: 'var(--table-header-text)',
                  backgroundColor: 'var(--table-header-bg)',
                  borderColor: 'var(--table-cell-border)',
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
                  sx={{
                    py: 3,
                    color: 'var(--text-secondary)',
                    fontSize: '0.875rem',
                    borderColor: 'var(--table-cell-border)'
                  }}
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
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': {
                        backgroundColor: 'var(--bg-card-hover) !important'
                      }
                    }}
                  >
                    <TableCell sx={{ borderColor: 'var(--table-cell-border)' }}>
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
                      sx={{
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        borderColor: 'var(--table-cell-border)'
                      }}
                    >
                      {row.name}
                    </TableCell>

                    <TableCell
                      sx={{
                        color: 'var(--text-secondary)',
                        borderColor: 'var(--table-cell-border)'
                      }}
                    >
                      {row.role}
                    </TableCell>

                    <TableCell
                      sx={{
                        minWidth: 150,
                        borderColor: 'var(--table-cell-border)'
                      }}
                    >
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
                            ? 'var(--status-neutral-bg)'
                            : 'var(--status-success-bg)',
                          color: fullyAllocated
                            ? 'var(--status-neutral-text)'
                            : 'var(--status-success-text)',
                          borderColor: fullyAllocated
                            ? 'var(--status-neutral-border)'
                            : 'var(--status-success-border)',
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
          height: height ?? 'auto',
          display: height ? 'flex' : 'block',
          flexDirection: 'column',
          bgcolor: 'var(--bg-card)',
          borderRadius: 1.5,
          border: '1px solid var(--border-color)',
          overflow: 'hidden'
        }}
      >
        {tableContent}
      </Box>
    )
  }

  return (
    <div
      className={styles.container}
      style={{
        height: height
          ? typeof height === 'number'
            ? `${height}px`
            : height
          : undefined
      }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          height: height ? '100%' : 'auto',
          display: height ? 'flex' : 'block',
          flexDirection: 'column',
          bgcolor: 'var(--bg-card)',
          color: 'var(--text-primary)'
        }}
      >
        {showTitle && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              px: 2,
              py: 1.5,
              flexShrink: 0
            }}
          >
            <Typography
              className={styles.title}
              variant="h6"
              sx={{
                fontWeight: 800,
                fontSize: 18,
                letterSpacing: '0.04em',
                color: 'var(--text-primary)',
                textTransform: 'uppercase'
              }}
            >
              Individual Availability
            </Typography>

            <button
              className={styles.redirectionButton}
              onClick={handleNavigateToAllocation}
            >
              <LuArrowUpRight size={24} />
            </button>
          </Box>
        )}
        {tableContent}
      </Paper>
    </div>
  )
}
