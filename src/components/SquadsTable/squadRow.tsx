import { useState, type MouseEvent } from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { ConfirmDialog } from '../ConfirmDialog'

import {
  LuUserRound,
  LuChevronDown,
  LuChevronUp,
  LuPencil,
  LuTrash2
} from 'react-icons/lu'

import type { Squad, StatusType } from '../../types'
import { AllocationTable } from '../AllocationTable'
import { AVAILABLE_STATUSES, STATUS_STYLES } from './constants'

interface SquadRowProps {
  row: Squad
  expandable?: boolean
  editable?: boolean
  deletable?: boolean
  totalColumns: number
  onUpdateStatus?: (squadId: string | number, newStatus: StatusType) => void
  onDeleteSquad?: (squadId: string | number) => void
}

export function SquadRow({
  row,
  expandable = false,
  editable = false,
  deletable = false,
  totalColumns,
  onUpdateStatus,
  onDeleteSquad
}: SquadRowProps) {
  const [open, setOpen] = useState(false)
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const currentStatus = STATUS_STYLES[row.status]
  const isMenuOpen = Boolean(menuAnchorEl)

  const handleOpenMenu = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setMenuAnchorEl(e.currentTarget)
  }

  const handleCloseMenu = () => setMenuAnchorEl(null)

  const handleSelectStatus = (newStatus: StatusType) => {
    handleCloseMenu()
    if (newStatus !== row.status && onUpdateStatus) {
      onUpdateStatus(row.id, newStatus)
    }
  }

  const handleOpenDeleteDialog = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setDeleteDialogOpen(true)
  }

  const handleCloseDeleteDialog = () => setDeleteDialogOpen(false)

  const handleConfirmDelete = () => {
    setDeleteDialogOpen(false)
    onDeleteSquad?.(row.id)
  }

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
          <TableCell sx={{ width: 44, px: 1 }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(prev => !prev)}
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

        {editable && (
          <TableCell align="center" sx={{ width: 50, px: 1 }}>
            <IconButton
              size="small"
              onClick={handleOpenMenu}
              sx={{
                color: '#64748b',
                '&:hover': { color: '#1a365d', bgcolor: '#f1f5f9' }
              }}
              aria-label="edit status"
            >
              <LuPencil size={18} />
            </IconButton>

            <Menu
              anchorEl={menuAnchorEl}
              open={isMenuOpen}
              onClose={handleCloseMenu}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              slotProps={{
                paper: {
                  sx: { minWidth: 140, boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }
                }
              }}
            >
              {AVAILABLE_STATUSES.map(status => (
                <MenuItem
                  key={status}
                  selected={status === row.status}
                  onClick={() => handleSelectStatus(status)}
                  sx={{ fontSize: '0.875rem', py: 1 }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: STATUS_STYLES[status].dot,
                      mr: 1.5
                    }}
                  />
                  {status}
                </MenuItem>
              ))}
            </Menu>
          </TableCell>
        )}

        {deletable && (
          <TableCell align="center" sx={{ width: 50, px: 1 }}>
            <IconButton
              size="small"
              onClick={handleOpenDeleteDialog}
              sx={{ '&:hover': { color: '#b91c1c', bgcolor: '#fee2e2' } }}
              aria-label="delete squad"
            >
              <LuTrash2 size={18} />
            </IconButton>

            <ConfirmDialog
              open={deleteDialogOpen}
              title="Excluir Squad"
              description={
                <>
                  Tem certeza que deseja excluir o squad{' '}
                  <strong>{row.name}</strong>? Esta ação não pode ser desfeita.
                </>
              }
              confirmLabel="Excluir"
              confirmColor="error"
              onClose={handleCloseDeleteDialog}
              onConfirm={handleConfirmDelete}
            />
          </TableCell>
        )}
      </TableRow>

      {expandable && (
        <TableRow>
          <TableCell
            style={{
              paddingBottom: 0,
              paddingTop: 0,
              backgroundColor: '#f8fafc'
            }}
            colSpan={totalColumns}
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
