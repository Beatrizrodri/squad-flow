import { createBrowserRouter, Navigate } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { SquadsPage } from '../pages/Squads'
import { DashboardPage } from '../pages/DashBoard'
import { ProjectsPage } from '../pages/Projects'

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
        path: 'projects',
        element: <ProjectsPage />
      },
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ]
  }
])
