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
import { LuUserRound } from 'react-icons/lu'
import styles from './styles.module.scss'

interface MemberAvailability {
  id: string | number
  name: string
  role: string
  availability: string
}

const rows: MemberAvailability[] = [
  {
    id: 1,
    name: 'Maria Silva',
    role: 'UI/UX',
    availability: 'Available\n10h/week'
  },
  {
    id: 2,
    name: 'João Santos',
    role: 'DevOps',
    availability: '100% Allocated'
  },
  {
    id: 3,
    name: 'Lucas Souza',
    role: 'Frontend',
    availability: 'Available\n20h/week'
  },
  {
    id: 4,
    name: 'Ana Costa',
    role: 'Backend',
    availability: '100% Allocated'
  },
  {
    id: 5,
    name: 'Carlos Oliveira',
    role: 'QA / Tester',
    availability: 'Available\n5h/week'
  },
  {
    id: 6,
    name: 'Beatriz Lima',
    role: 'Product Manager',
    availability: '100% Allocated'
  }
]

export function AllocationTable() {
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
            Individual Availability
          </Typography>
        </Box>

        <TableContainer sx={{ maxHeight: 350 }}>
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
                  sx={{
                    fontWeight: 700,
                    color: '#222',
                    backgroundColor: '#fafafa'
                  }}
                >
                  Availability
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map(row => (
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

                  <TableCell sx={{ color: '#4b5563' }}>{row.role}</TableCell>

                  <TableCell
                    sx={{
                      whiteSpace: 'pre-line',
                      color: '#374151',
                      lineHeight: 1.3
                    }}
                  >
                    {row.availability}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
}
