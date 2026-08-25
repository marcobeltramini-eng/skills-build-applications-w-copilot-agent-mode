import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

const getEntries = (payload) => {
  if (Array.isArray(payload)) {
    const globalBoard = payload.find((board) => board.scope === 'global')
    return globalBoard?.entries ?? payload[0]?.entries ?? []
  }
  if (Array.isArray(payload?.results)) {
    const globalBoard = payload.results.find((board) => board.scope === 'global')
    return globalBoard?.entries ?? payload.results[0]?.entries ?? []
  }
  return []
}

export default function Leaderboard() {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((payload) => setEntries(getEntries(payload)))
      .catch(() => setEntries([]))
  }, [])

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      <ol className="list-group list-group-numbered">
        {entries.map((entry) => (
          <li className="list-group-item" key={entry.user ?? `${entry.rank}-${entry.score}`}>
            Rank {entry.rank}: {entry.score} points {entry.teamName ? `(${entry.teamName})` : ''}
          </li>
        ))}
      </ol>
    </section>
  )
}
