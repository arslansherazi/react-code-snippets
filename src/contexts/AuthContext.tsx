import { createContext, useContext, useMemo, useState } from "react"
import { loginUser } from "../services/api"

type AuthContextValue = {
  isAuthenticated: boolean
  authLoading: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const STORAGE_KEY = "auth_session"
const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem(STORAGE_KEY) === "true",
  )
  const [authLoading, setAuthLoading] = useState(false)

  const login = async (username: string, password: string) => {
    setAuthLoading(true)
    const ok = await loginUser(username, password)
    setAuthLoading(false)
    if (!ok) return false
    setIsAuthenticated(true)
    localStorage.setItem(STORAGE_KEY, "true")
    return true
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem(STORAGE_KEY)
  }

  const value = useMemo(
    () => ({ isAuthenticated, authLoading, login, logout }),
    [isAuthenticated, authLoading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used inside AuthProvider")
  return context
}
