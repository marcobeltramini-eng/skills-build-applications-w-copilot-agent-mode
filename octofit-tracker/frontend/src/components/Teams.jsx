import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

const getItems = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  return []
}

export default function Teams() {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((payload) => setTeams(getItems(payload)))
      .catch(() => setTeams([]))
  }, [])

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      <ul className="list-group">
        {teams.map((team) => (
          <li className="list-group-item" key={team._id ?? team.name}>
            <div className="fw-semibold">{team.name}</div>
            <div>{team.description}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}
