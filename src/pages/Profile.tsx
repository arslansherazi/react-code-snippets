import { useUser } from "../contexts/UserContext"

export default function Profile() {
  const { user, loading, error } = useUser()

  if (loading && !user) return <p className="text-gray-600">Loading user...</p>
  if (error) return <p className="text-red-600">{error}</p>
  if (!user) return <p className="text-gray-600">No user data available</p>

  return (
    <div className="max-w-2xl mx-auto">
      {/* Page header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
      {/* User details */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {user.name}
        </h2>
        <p className="text-lg text-gray-600">Age: {user.age}</p>
        <p className="text-lg text-gray-600">Email: {user.email}</p>
      </div>
    </div>
  )
}
