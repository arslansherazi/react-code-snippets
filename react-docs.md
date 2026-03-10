# React Concepts Guide

Mental models of React (with Vite + React Router).

---

## 1. Components & JSX

### What is a component?

A component is a reusable piece of UI. Think of it as a building block: define it once and use it many times.

**Props** – Data passed into a component (like function arguments). The component cannot change props; they come from the parent.

```tsx
// Parent passes a name; child displays it
function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}</h1>
}

// Usage
<Greeting name="Ali" />
```

**JSX** – HTML-like syntax inside JavaScript. Use curly braces `{ }` to put any JavaScript expression inside.

```tsx
// Simple example: show a message and a number
function Welcome() {
  const message = "Welcome back"
  const count = 5
  return (
    <div>
      <p>{message}</p>
      <p>Items: {count}</p>
    </div>
  )
}
```

**Note:** Return a single root element. Use `<></>` (Fragment) to avoid an extra wrapper div.

---

## 2. State: useState

### What is state?

State is the component’s “memory”. When state changes, React re-renders the component so the screen stays in sync.

**When to use:** When something on screen can change (e.g. counter, form input, open/close).

```tsx
// Simple counter: number that goes up on button click
function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Add one</button>
    </div>
  )
}
```

**Rule:** Don’t change state directly. Always use the setter (`setCount`, `setUser`, etc.).

```tsx
// ✅ Correct: pass a new value
setCount(count + 1)

// ❌ Wrong: mutating state
count = count + 1
```

### Updating objects (e.g. form data)

Use the spread operator to copy the old object and override one field.

```tsx
const [user, setUser] = useState({ name: "Ali", age: 25 })

// User types in a form; update only "name", keep "age"
setUser({ ...user, name: "New Name" })

// Same idea: update only "age"
setUser({ ...user, age: 26 })
```

**Example:** A form with email and password – one state object `{ email, password }`; on each keystroke use `setForm({ ...form, [fieldName]: value })`.

---

## 3. Side effects: useEffect

### What is a side effect?

Something that reaches “outside” the component: calling an API, starting a timer, reading from localStorage. To avoid running that on every render, React provides `useEffect`.

**When to use:** Fetching data when the page loads, subscribing to something, or running code when a value (e.g. ID) changes.

```tsx
// Simple example: fetch a user when the component appears on screen
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then(setUser)
  }, [userId]) // Run again if userId changes

  if (!user) return <p>Loading...</p>
  return <p>{user.name}</p>
}
```

**Dependency array (the `[ ]` at the end):**

- `[]` – Run once when the component mounts (e.g. load data on page load).
- `[userId]` – Run when `userId` changes.
- No array – Runs after every render (rarely needed).

**Cleanup:** When starting something (e.g. a timer), return a function that stops it.

```tsx
useEffect(() => {
  const id = setInterval(() => console.log("tick"), 1000)
  return () => clearInterval(id) // cleanup when component unmounts
}, [])
```

---

## 4. Context: useContext

### What is context?

Context allows sharing data with many components without passing props through every level (that’s “prop drilling”). Think of it as a shared box: a value is set at the top, and any component below can read it.

**When to use:** Theme (dark/light), logged-in user, language – data that many parts of the app need.

**Step 1 – Create the context and a provider:**

```tsx
const ThemeContext = createContext<"light" | "dark">("light")

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}
```

**Step 2 – Wrap the app (or a part of it) with the provider:**

```tsx
// In main.tsx or App.tsx
<ThemeProvider>
  <App />
</ThemeProvider>
```

**Step 3 – Consume the value in any child with a custom hook:**

```tsx
export function useTheme() {
  const value = useContext(ThemeContext)
  if (value === undefined) throw new Error("useTheme used outside ThemeProvider")
  return value
}

// In any component
function Header() {
  const theme = useTheme()
  return <div>Current theme: {theme}</div>
}
```

**Simple example:** A “user” context that holds `{ name, email }` so Dashboard, Profile, and Settings can all show the user without receiving props from App.

---

## 5. Refs: useRef

### What is a ref?

A ref is a reference to something that doesn’t need to trigger a re-render when it changes. Most often it’s a reference to a DOM element (e.g. an input).

**When to use:** Focusing an input, measuring an element, or keeping a previous value or timer ID.

```tsx
// Simple example: focus the email input when the form appears
function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  return (
    <form>
      <input ref={emailRef} type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
    </form>
  )
}
```

**Rule:** Read or set `ref.current`; changing it does not cause a re-render.

---

## 6. React Router

### How does routing work?

The URL path decides which component is shown. Define a list of paths and the component for each; the router does the rest.

**Link** – Like a normal link, but the app doesn’t reload the whole page; only the content area updates.

```tsx
import { Link } from "react-router-dom"

<Link to="/">Home</Link>
<Link to="/profile">Profile</Link>
```

**Navigate** – Redirects. Useful for “if not logged in, send to login page”.

```tsx
import { Navigate } from "react-router-dom"

if (!isLoggedIn) return <Navigate to="/login" replace />
```

**useNavigate()** – Redirect from code (e.g. after login or logout).

```tsx
const navigate = useNavigate()
navigate("/login")
```

**useLocation()** – Exposes the current path (e.g. to highlight the active nav link).

```tsx
const location = useLocation()
location.pathname // "/" or "/profile" etc.
```

### Nested routes and Outlet

**Outlet** – A placeholder where the “child” route’s page is rendered. This allows a layout (e.g. navbar + sidebar) where the inner content changes with the URL.

```tsx
// Layout: same navbar, content below changes
function AppLayout() {
  return (
    <div>
      <NavBar />
      <main>
        <Outlet />   {/* Dashboard, Profile, or Settings renders here */}
      </main>
    </div>
  )
}
```

**Simple example:** Path `/` shows Dashboard, `/profile` shows Profile, but both sit inside the same layout with the same navbar; `<Outlet />` is where Dashboard or Profile appears.

---

## 7. Composition: children and wrappers

### Children prop

JSX can be passed into a component as `children`. The component decides where to render it (e.g. inside a card or a modal).

```tsx
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="card">
      {children}
    </div>
  )
}

// Usage
<Card>
  <p>Anything here appears inside the card</p>
</Card>
```

### Wrapper pattern (e.g. protected route)

A wrapper component either shows its children or does something else (e.g. redirect).

```tsx
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}
```

**Example:** Wrap the “logged-in” routes with `<ProtectedRoute>`. If the user isn’t logged in, they see the login page; if they are, they see the normal app.

---

## 8. Forms and events

### Controlled inputs

The input’s value comes from state, and every keystroke updates that state. So React “controls” the input (single source of truth).

```tsx
function SimpleForm() {
  const [email, setEmail] = useState("")

  return (
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  )
}
```

### Form submit

By default, submitting a form reloads the page. In a React app the submit is typically handled in JavaScript by calling `e.preventDefault()`.

```tsx
function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()  // Stop page reload
    console.log({ email, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Log in</button>
    </form>
  )
}
```

### Event types (TypeScript)

- `onChange` on input → `React.ChangeEvent<HTMLInputElement>`
- `onSubmit` on form → `React.SyntheticEvent<HTMLFormElement>`
- `onClick` on button → `React.MouseEvent<HTMLButtonElement>`

---

## 9. Data fetching (client-side)

In a React SPA, data is typically fetched in the browser with `fetch` (or similar), often inside `useEffect`.

**Simple pattern:** Load data when the component mounts; show loading, then data or error.

```tsx
function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  return (
    <ul>
      {users.map((u) => <li key={u.id}>{u.name}</li>)}
    </ul>
  )
}
```

**When data is shared (e.g. current user):** Put the fetch logic in a Context provider and expose it with a hook (e.g. `useUser()`). Pages use the hook instead of fetching on their own.

---

## 10. Quick reference

| Hook / idea      | In simple terms |
|------------------|------------------|
| **useState**     | Component memory; change it and the UI updates. |
| **useEffect**    | Run code after render (e.g. fetch data, subscribe). |
| **useContext**   | Read shared data from a provider above. |
| **useRef**       | Keep a value or DOM ref without causing re-renders. |
| **useMemo**      | Remember a computed value so it’s not recalculated every render. |
| **useCallback**  | Remember a function (useful when passing to child components). |

### Rules of thumb

- **State** – Only what this component (or its children) need to show or change. Lift state up when a parent or sibling needs it.
- **Context** – For data that many components need (theme, user, auth).
- **useEffect** – List the values used inside it in the dependency array; add cleanup when starting timers or subscriptions.
- **Router** – Use `<Link>` for navigation; use `<Navigate>` or `navigate()` for redirects; use `<Outlet />` where the child route should render.
