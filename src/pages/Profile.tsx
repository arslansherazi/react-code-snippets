type Props = {
  user?: {
    name: string
    age: number
  }
}

// Profile component: Displays user information or empty state message
export default function Profile({ user }: Props) {
  // Show empty state if no user data provided
  if (!user)
    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile Page</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">No user data available</p>
        </div>
      </div>
    )

  // Display user profile information
  return (
    <div className="max-w-2xl mx-auto">
      {/* Page title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
      {/* User info card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {user.name}
        </h2>
        <p className="text-lg text-gray-600">Age: {user.age}</p>
      </div>
    </div>
  )
}
