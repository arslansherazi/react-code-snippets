import { useState } from "react"
import Dialog from "../components/Dialog"

export default function Settings() {
  // Form state to store email and password input values
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  // Dialog visibility state
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [submittedData, setSubmittedData] = useState<{
    email: string
    password: string
  } | null>(null)

  // Update form state when user types in input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submission - save data and show dialog
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmittedData({ ...form })
    setIsDialogOpen(true)
    console.log("Form submitted:", form)
  }

  // Dialog content showing submitted email and masked password
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
      {/* Page title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

      {/* Settings form with email and password fields */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 space-y-4"
      >
        {/* Email input field */}
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
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Password input field */}
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
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors shadow-md mt-4"
        >
          Save
        </button>
      </form>

      {/* Dialog component to display submitted form data */}
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
