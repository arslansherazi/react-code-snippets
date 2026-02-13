import { useEffect, useRef, useState } from "react"
import Dialog from "../components/Dialog"
import { useUser } from "../contexts/UserContext"

export default function Settings() {
  const { user, loading, updateUserData } = useUser()
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [submittedData, setSubmittedData] = useState<{
    email: string
    password: string
  } | null>(null)

  useEffect(() => {
    if (user?.email) {
      setForm((prev) => ({ ...prev, email: user.email }))
    }
  }, [user])

  useEffect(() => {
    emailInputRef.current?.focus()
  }, [])

  // Dynamic key update keeps untouched fields as-is
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    // Prevent browser's default submit refresh
    e.preventDefault()
    if (user && form.email !== user.email) {
      await updateUserData({ email: form.email })
    }
    setSubmittedData({ ...form })
    setIsDialogOpen(true)
  }

  const dialogContent = submittedData ? (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-medium text-gray-600">Email:</p>
        <p className="text-base text-gray-800">{submittedData.email}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">Password:</p>
        <p className="text-base text-gray-800">
          {submittedData.password.replace(/./g, "•")}
        </p>
      </div>
    </div>
  ) : null

  return (
    <div className="max-w-2xl mx-auto">
      {/* Page header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

      {/* Settings form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 space-y-4"
      >
        {/* Email field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                passwordInputRef.current?.focus()
              }
            }}
            ref={emailInputRef}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Password field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            ref={passwordInputRef}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Submit action */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors shadow-md mt-4"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>

      {/* Result dialog */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Form Submitted Successfully"
      >
        {dialogContent}
      </Dialog>
    </div>
  )
}
