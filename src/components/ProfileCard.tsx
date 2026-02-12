type Props = {
  user: {
    name: string
    age: number
    email?: string
  }
}

export default function ProfileCard({ user }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{user.name}</h2>
      <p className="text-lg text-gray-600">Age: {user.age}</p>
      {user.email ? <p className="text-lg text-gray-600">Email: {user.email}</p> : null}
    </div>
  )
}
