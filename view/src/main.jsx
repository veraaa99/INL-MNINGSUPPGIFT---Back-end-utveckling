import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import RootLayout from './layouts/RootLayout.jsx'
import AuthorizedLayout from './layouts/AuthorizedLayout.jsx'
import UserLayout from './layouts/UserLayout.jsx'

import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import UserProfilePage from './pages/UserProfilePage.jsx'
import ProductDetailsPage from './pages/ProductDetailsPage.jsx'
import MessagePage from './pages/MessagePage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'

import ProductContextProvider from './contexts/ProductContext.jsx'
import UserContextProvider from './contexts/UserContext.jsx'
import ShoppingCartContextProvider from './contexts/ShoppingCartContext.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { 
        index: true, 
        element: <HomePage />,
      },
      {
        path: 'products',
        element: <ProductsPage />
      },
      {
        path: 'products/:id',
        element: <ProductDetailsPage />
      },
      {
        path: 'messages',
        element: <MessagePage />
      },
      
      {
        element: <AuthorizedLayout />,
        children: [
          {
            path: 'login',
            element: <LoginPage />
          },
          {
            path: 'register',
            element: <RegisterPage />
          }
        ]
      },

      { 
        element: <UserLayout />,
        children: [
          {
            path: 'profile',
            element: <UserProfilePage />
          },
          {
            path: 'orders',
            element: <CheckoutPage />
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
      <ShoppingCartContextProvider>
        <ProductContextProvider>
          <RouterProvider router={router} />
        </ProductContextProvider>
      </ShoppingCartContextProvider>
    </UserContextProvider>
  </StrictMode>
)
