import ResourceView from './ResourceView'

export default function Activities({ apiBaseUrl }) {
  return <ResourceView apiBaseUrl={apiBaseUrl} endpoint="activities" title="Activities" />
}
