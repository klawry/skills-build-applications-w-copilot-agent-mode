import ResourceView from './ResourceView'

export default function Leaderboard({ apiBaseUrl }) {
  return <ResourceView apiBaseUrl={apiBaseUrl} endpoint="leaderboard" title="Leaderboard" />
}
