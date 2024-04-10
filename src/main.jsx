import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import HomePage from './pages/HomePage'
import ProfilesPage from './pages/ProfilesPage'

import './style.scss'
import NotFoundPage from './pages/NotFoundPage'
import SignInUpPage from './pages/SignInUpPage'

const router = createBrowserRouter([
  { 
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/profile',
    element: <ProfilesPage />,
  },
  {
    path: '/sign-in',
    element: <SignInUpPage />, 
  },


])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
