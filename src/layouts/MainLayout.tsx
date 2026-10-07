// src/layouts/MainLayout.tsx
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import { SideBar } from '../components/SideBar'
import { Header } from '../components/Header'

export function MainLayout() {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden'
      }}
    >
      <SideBar />

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden'
        }}
      >
        <Header />

        <Box
          component="main"
          sx={{
            height: 'calc(100vh - 80px)',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
