import ResourceView from './ResourceView'

export default function Users({ apiBaseUrl }) {
  return <ResourceView apiBaseUrl={apiBaseUrl} endpoint="users" title="Users" />
}
