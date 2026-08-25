import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

const getItems = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  return []
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((payload) => setWorkouts(getItems(payload)))
      .catch(() => setWorkouts([]))
  }, [])

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      <ul className="list-group">
        {workouts.map((workout) => (
          <li className="list-group-item" key={workout._id ?? workout.name}>
            <div className="fw-semibold">{workout.name}</div>
            <div>{workout.description}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}
