import ResourceView from './ResourceView'

export default function Workouts({ apiBaseUrl }) {
  return <ResourceView apiBaseUrl={apiBaseUrl} endpoint="workouts" title="Workouts" />
}
