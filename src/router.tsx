import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import Profile from "./pages/Profile"
import Settings from "./pages/Settings"

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "profile", element: <Profile /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
])
