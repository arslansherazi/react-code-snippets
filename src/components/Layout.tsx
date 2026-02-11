import Navbar from "./Navbar"

type Props = {
  children: React.ReactNode
}

// Layout component: Provides consistent page structure with Navbar and content area
export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
