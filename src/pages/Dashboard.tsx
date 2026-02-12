import ProfileCard from "../components/ProfileCard"
import { useUser } from "../contexts/UserContext"

export default function Dashboard() {
  const { user, loading, error, updateUserData } = useUser()

  if (loading && !user) return <p className="text-gray-600">Loading user...</p>
  if (error) return <p className="text-red-600">{error}</p>
  if (!user) return <p className="text-gray-600">No user data available</p>

  const isAdult = user.age >= 18

  return (
    <div className="max-w-2xl mx-auto">
      {/* Page header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* User summary */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <ProfileCard user={user} />
      </div>

      {/* Status section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <p className="text-lg text-gray-700 mb-2">
          Status:{" "}
          <span
            className={`font-semibold ${
              isAdult ? "text-green-600" : "text-orange-600"
            }`}
          >
            {isAdult ? "Adult" : "Minor"}
          </span>
        </p>
      </div>

      {/* Action */}
      <button
        onClick={() => updateUserData({ age: user.age + 1 })}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors shadow-md"
      >
        Increase Age
      </button>
    </div>
  )
}
