export type User = {
  id: number
  name: string
  age: number
  email: string
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const fetchUser = async (): Promise<User> => {
  await delay(1000)

  return {
    id: 1,
    name: "Ali",
    age: 25,
    email: "ali@example.com",
  }
}

export const updateUser = async (userData: Partial<User>): Promise<User> => {
  await delay(800)

  return {
    id: 1,
    name: userData.name || "Ali",
    age: userData.age || 25,
    email: userData.email || "ali@example.com",
  }
}
