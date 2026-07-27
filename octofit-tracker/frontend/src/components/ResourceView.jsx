import { useEffect, useState } from 'react'

function normalizeItems(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  if (Array.isArray(payload?.data?.items)) {
    return payload.data.items
  }

  return []
}

function extractPagination(payload) {
  if (!payload || Array.isArray(payload)) {
    return null
  }

  const source = payload.pagination ?? payload.meta ?? payload
  const page = Number(source.page ?? source.currentPage ?? source.current_page)
  const totalPages = Number(source.totalPages ?? source.total_pages)
  const total = Number(source.total ?? source.count ?? source.totalItems ?? source.total_items)

  if (!Number.isFinite(page) && !Number.isFinite(totalPages) && !Number.isFinite(total)) {
    return null
  }

  return {
    page: Number.isFinite(page) ? page : null,
    totalPages: Number.isFinite(totalPages) ? totalPages : null,
    total: Number.isFinite(total) ? total : null,
  }
}

function formatValue(value) {
  if (value === null || value === undefined) {
    return '-'
  }

  if (typeof value === 'object') {
    try {
      return JSON.stringify(value)
    } catch {
      return String(value)
    }
  }

  return String(value)
}

export default function ResourceView({ apiBaseUrl, endpoint, title }) {
  const [rows, setRows] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(`${apiBaseUrl}/${endpoint}/`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setRows(normalizeItems(payload))
        setPagination(extractPagination(payload))
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load data.')
        }
      } finally {
        setLoading(false)
      }
    }

    load()

    return () => controller.abort()
  }, [apiBaseUrl, endpoint])

  const columns = rows.length > 0 ? Object.keys(rows[0]) : []

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h2 className="h4 mb-0">{title}</h2>
        <code>{`${apiBaseUrl}/${endpoint}/`}</code>
      </div>

      {loading && <p className="text-secondary mb-0">Loading {title.toLowerCase()}...</p>}

      {!loading && error && (
        <div className="alert alert-danger mb-0" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && rows.length === 0 && (
        <div className="alert alert-info mb-0" role="alert">
          No records returned.
        </div>
      )}

      {!loading && !error && rows.length > 0 && (
        <>
          <p className="text-secondary mb-2">
            Showing {rows.length} {rows.length === 1 ? 'record' : 'records'}
          </p>

          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column} scope="col">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => {
                  const rowKey = row._id ?? row.id ?? `${endpoint}-${index}`
                  return (
                    <tr key={rowKey}>
                      {columns.map((column) => (
                        <td key={`${rowKey}-${column}`}>{formatValue(row[column])}</td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {!loading && !error && pagination && (
        <p className="small text-secondary mb-0">
          {pagination.page !== null ? `Page ${pagination.page}` : 'Page unavailable'}
          {pagination.totalPages !== null ? ` of ${pagination.totalPages}` : ''}
          {pagination.total !== null ? ` • Total ${pagination.total}` : ''}
        </p>
      )}
    </div>
  )
}
