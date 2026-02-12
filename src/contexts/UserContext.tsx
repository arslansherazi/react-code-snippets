import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { fetchUser, updateUser, type User } from "../services/api"

type UserContextValue = {
  user: User | null
  loading: boolean
  error: string | null
  refreshUser: () => Promise<void>
  updateUserData: (changes: Partial<User>) => Promise<void>
}

const UserContext = createContext<UserContextValue | null>(null)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshUser = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchUser()
      setUser(data)
    } catch {
      setError("Failed to load user data")
    } finally {
      setLoading(false)
    }
  }

  const updateUserData = async (changes: Partial<User>) => {
    try {
      setLoading(true)
      setError(null)
      const data = await updateUser(changes)
      setUser(data)
    } catch {
      setError("Failed to update user data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshUser()
  }, []) // this will run only once when the component is mounted

  const value = useMemo( // useMemo is used to memoize the value so that it is not recalculated on every render
    () => ({ user, loading, error, refreshUser, updateUserData }),
    [user, loading, error],
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error("useUser must be used inside UserProvider")
  return context
}
