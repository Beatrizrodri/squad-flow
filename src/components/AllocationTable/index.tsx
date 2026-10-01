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

export function AllocationTable() {
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
          setMembers(data)
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
  }, [])

  const isAllocated = (availability: string): boolean => {
    return availability.toLowerCase().includes('100%')
  }

  return (
    <div className={styles.container}>
      <Paper elevation={1} sx={{ borderRadius: 2, overflow: 'hidden' }}>
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

        <TableContainer sx={{ maxHeight: 350, minHeight: 180 }}>
          {isLoading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 200
              }}
            >
              <CircularProgress size={36} sx={{ color: '#1a365d' }} />
            </Box>
          ) : errorMessage ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography color="error" variant="body2">
                {errorMessage}
              </Typography>
            </Box>
          ) : (
            <Table stickyHeader aria-label="individual availability table">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: '#222',
                      backgroundColor: '#fafafa',
                      width: 70
                    }}
                  >
                    Avatars
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: '#222',
                      backgroundColor: '#fafafa'
                    }}
                  >
                    Names
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: '#222',
                      backgroundColor: '#fafafa'
                    }}
                  >
                    Roles
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 700,
                      color: '#222',
                      backgroundColor: '#fafafa',
                      minWidth: 150
                    }}
                  >
                    Availability
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {members.map((row: MemberAvailability) => {
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
                            width: 40,
                            height: 40
                          }}
                        >
                          <LuUserRound size={22} />
                        </Avatar>
                      </TableCell>

                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: 600, color: '#111827' }}
                      >
                        {row.name}
                      </TableCell>

                      <TableCell sx={{ color: '#4b5563' }}>
                        {row.role}
                      </TableCell>

                      <TableCell sx={{ minWidth: 150 }}>
                        <Chip
                          label={row.availability}
                          size="small"
                          sx={{
                            width: '100%',
                            height: 'auto',
                            py: 0.75,
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
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Paper>
    </div>
  )
}
