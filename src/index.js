import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css'
import pages from './pages'
import { store } from './store'

const router = createBrowserRouter([
  {
    path: '/',
    element: <pages.Register />
  },
  {
    path: '/login',
    element: <pages.Login />
  },
  {
    path: '/dashboard',
    element: <pages.Dashboard />
  },
  {
    path: '/confirm',
    element: <pages.Confirm />
  },
  {
    path: '/forgot',
    element: <pages.Forgot />
  },
  {
    path: '/posts',
    element: <pages.Posts />
  },
  {
    path: '/users',
    element: <pages.Users />
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
