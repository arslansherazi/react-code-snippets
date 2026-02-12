import { Link, useLocation } from "react-router-dom"

export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-6">
          {/* Navigation links with active-state styling */}
          <Link
            to="/"
            className={`px-4 py-2 rounded-md transition-colors ${
              location.pathname === "/"
                ? "bg-blue-700 font-semibold"
                : "hover:bg-blue-500"
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/profile"
            className={`px-4 py-2 rounded-md transition-colors ${
              location.pathname === "/profile"
                ? "bg-blue-700 font-semibold"
                : "hover:bg-blue-500"
            }`}
          >
            Profile
          </Link>
          <Link
            to="/settings"
            className={`px-4 py-2 rounded-md transition-colors ${
              location.pathname === "/settings"
                ? "bg-blue-700 font-semibold"
                : "hover:bg-blue-500"
            }`}
          >
            Settings
          </Link>
        </div>
      </div>
    </nav>
  )
}
