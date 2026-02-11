import { Outlet } from "react-router-dom"
import Layout from "./components/Layout"

// Root component: Wraps all routes with Layout and renders child routes via Outlet
export default function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
