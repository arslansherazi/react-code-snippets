import { useState } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function Login() {
  const { isAuthenticated, authLoading, login } = useAuth()
  const [form, setForm] = useState({ username: "", password: "" })
  const [error, setError] = useState("")

  if (isAuthenticated) return <Navigate to="/" replace />

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    const ok = await login(form.username, form.password)
    if (!ok) setError("Invalid credentials")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      {/* Login card */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-4"
      >
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Login</h1>
          <p className="text-sm text-gray-500 mt-1">
            Use username: testuser, password: test123
          </p>
        </div>

        {/* Username field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            value={form.username}
            onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Password field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        {/* Submit action */}
        <button
          type="submit"
          disabled={authLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          {authLoading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  )
}
