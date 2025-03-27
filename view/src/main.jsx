import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import RootLayout from './layouts/RootLayout.jsx'
import AuthorizedLayout from './layouts/AuthorizedLayout.jsx'
import PrivateLayout from './layouts/PrivateLayout.jsx'

import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Products from './pages/Products.jsx'
import UserProfile from './pages/UserProfile.jsx'
import Order from './pages/Order.jsx'
import ProductDetails from './pages/ProductDetails.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { 
        index: true, 
        element: <Home />,
      },
      {
        path: 'products',
        element: <Products />
      },
      {
        path: 'products:id',
        element: <ProductDetails />
      },
      
      {
        element: <AuthorizedLayout />,
        children: [
          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'register',
            element: <Register />
          }
        ]
      },

      { 
        element: <PrivateLayout />,
        children: [
          {
            path: 'profile',
            element: <UserProfile />
          },
          {
            path: 'order',
            element: <Order />
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
