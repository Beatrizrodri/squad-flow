import { createBrowserRouter, Navigate } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { SquadsPage } from '../pages/Squads'
import { DashboardPage } from '../pages/DashBoard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: 'squads',
        element: <SquadsPage />
      },
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ]
  }
])
