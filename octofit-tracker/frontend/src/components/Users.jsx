import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

const getItems = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  return []
}

export default function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((payload) => setUsers(getItems(payload)))
      .catch(() => setUsers([]))
  }, [])

  return (
    <section>
      <h2 className="h4 mb-3">Users</h2>
      <ul className="list-group">
        {users.map((user) => (
          <li className="list-group-item" key={user._id ?? user.email}>
            <div className="fw-semibold">{user.name}</div>
            <div>{user.email}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}
