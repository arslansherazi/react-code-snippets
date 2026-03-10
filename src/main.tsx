import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import './index.css'
import { router } from "./router"
import { AuthProvider } from "./contexts/AuthContext"
import { UserProvider } from "./contexts/UserContext"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </AuthProvider>
  </StrictMode>
)
