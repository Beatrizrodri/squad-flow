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
import { LuUserRound } from 'react-icons/lu'
import styles from './styles.module.scss'

type StatusType = 'On Track' | 'At Risk' | 'Delayed'

interface Squads {
  id: string | number
  name: string
  members: number
  capacity: number
  project: string
  status: StatusType
}

const rows: Squads[] = [
  {
    id: 1,
    name: 'Faicon',
    members: 4,
    capacity: 85,
    project: 'Amazon',
    status: 'On Track'
  },
  {
    id: 2,
    name: 'Apex Lab',
    members: 6,
    capacity: 100,
    project: 'Netflix',
    status: 'At Risk'
  },
  {
    id: 3,
    name: 'Orbit Code',
    members: 3,
    capacity: 45,
    project: 'Spotify',
    status: 'Delayed'
  },
  {
    id: 4,
    name: 'Vortex Dev',
    members: 8,
    capacity: 90,
    project: 'Tesla',
    status: 'On Track'
  },
  {
    id: 5,
    name: 'Hyper Squad',
    members: 5,
    capacity: 30,
    project: 'Uber',
    status: 'At Risk'
  },
  {
    id: 6,
    name: 'Byte Wave',
    members: 2,
    capacity: 60,
    project: 'Airbnb',
    status: 'On Track'
  }
]

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
  Delayed: {
    bg: '#fdeeed',
    text: '#d32f2f',
    dot: '#d32f2f',
    border: '#ef9a9a'
  }
}

export function SquadsTable() {
  return (
    <div className={styles.container}>
      <Paper elevation={1} sx={{ borderRadius: 2, overflow: 'hidden' }}>
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
            Active Squads
          </Typography>
        </Box>

        <TableContainer sx={{ maxHeight: 350 }}>
          <Table stickyHeader aria-label="active squads table">
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
              {rows.map(row => {
                const currentStatus = statusStyles[row.status]

                return (
                  <TableRow
                    key={row.id}
                    hover
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      <Avatar
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

                    <TableCell
                      align="center"
                      sx={{ color: '#4b5563', fontWeight: 500 }}
                    >
                      {row.members}
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{ color: '#4b5563', fontWeight: 600 }}
                    >
                      {row.capacity}%
                    </TableCell>

                    <TableCell sx={{ color: '#4b5563' }}>
                      {row.project}
                    </TableCell>

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
                              backgroundColor: currentStatus.dot,
                              marginLeft: '6px !important'
                            }}
                          />
                        }
                        sx={{
                          backgroundColor: currentStatus.bg,
                          color: currentStatus.text,
                          border: `1px solid ${currentStatus.border}`,
                          fontWeight: 600,
                          fontSize: '0.8125rem',
                          borderRadius: '6px',
                          height: 28,
                          '& .MuiChip-label': {
                            paddingLeft: '6px',
                            paddingRight: '10px'
                          }
                        }}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
}
