import { createBrowserRouter } from 'react-router-dom'
import App from '@/App'
import { RootLayout } from '@/layouts/RootLayout'
import { SamplePage } from '@/pages/SamplePage'
import { UsersPage } from './pages/UsersPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <App /> },
      { path: 'sample', element: <SamplePage /> },
      { path: 'users', element: <UsersPage /> },
    ],
  },
])
