import { useState } from "react"
import ProfileCard from "./Profile"

export default function Dashboard() {
  const [user, setUser] = useState({
    name: "Ali",
    age: 25,
  })

  const isAdult = user.age >= 18

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <ProfileCard user={user} />
      </div>

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

      <button
        onClick={() => setUser((prev) => ({ ...prev, age: prev.age + 1 }))}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors shadow-md"
      >
        Increase Age
      </button>
    </div>
  )
}
