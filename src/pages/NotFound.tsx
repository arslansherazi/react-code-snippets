import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      {/* 404 card */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 text-center space-y-3">
        <p className="text-sm font-semibold text-blue-600">404</p>
        <h1 className="text-2xl font-bold text-gray-800">Page not found</h1>
        <p className="text-gray-600">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="inline-block mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-md transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}
