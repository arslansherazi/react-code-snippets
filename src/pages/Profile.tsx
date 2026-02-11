type Props = {
  user?: {
    name: string
    age: number
  }
}

export default function Profile({ user }: Props) {
  if (!user)
    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile Page</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">No user data available</p>
        </div>
      </div>
    )

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {user.name}
        </h2>
        <p className="text-lg text-gray-600">Age: {user.age}</p>
      </div>
    </div>
  )
}
