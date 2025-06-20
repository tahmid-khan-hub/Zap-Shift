import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/router.jsx'
import AuthProvider from './Contexts/AuthContext/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='urbanist max-w-[1500px] mx-auto'>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  </StrictMode>,
)
