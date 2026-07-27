import ResourceView from './ResourceView'

export default function Teams({ apiBaseUrl }) {
  return <ResourceView apiBaseUrl={apiBaseUrl} endpoint="teams" title="Teams" />
}
