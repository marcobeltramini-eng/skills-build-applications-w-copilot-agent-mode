import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

const getItems = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  return []
}

export default function Activities() {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((payload) => setActivities(getItems(payload)))
      .catch(() => setActivities([]))
  }, [])

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      <ul className="list-group">
        {activities.map((activity) => (
          <li className="list-group-item" key={activity._id ?? `${activity.type}-${activity.timestamp}`}>
            {activity.type} - {activity.durationMinutes} min - {activity.calories} cal
          </li>
        ))}
      </ul>
    </section>
  )
}
