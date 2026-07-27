import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api'
  const usingFallback = !codespaceName

  return (
    <main className="container py-4 py-md-5">
      <header className="app-header mb-4">
        <p className="eyebrow mb-2">Octofit Tracker</p>
        <h1 className="display-6 fw-semibold mb-2">Presentation Tier Dashboard</h1>
        <p className="text-secondary mb-1">React 19 + React Router + Vite environment configuration</p>
        <p className="mb-0">
          <span className="badge text-bg-light border me-2">API</span>
          <code>{apiBaseUrl}</code>
        </p>
      </header>

      {usingFallback && (
        <div className="alert alert-warning" role="alert">
          <strong>VITE_CODESPACE_NAME is not set.</strong> Using localhost fallback to avoid invalid
          <code className="ms-1">https://undefined-8000.app.github.dev</code> URLs.
        </div>
      )}

      <nav className="nav nav-pills nav-wrap mb-4">
        <NavLink to="/users" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Users
        </NavLink>
        <NavLink to="/activities" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Activities
        </NavLink>
        <NavLink to="/teams" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Teams
        </NavLink>
        <NavLink to="/leaderboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Leaderboard
        </NavLink>
        <NavLink to="/workouts" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Workouts
        </NavLink>
      </nav>

      <section className="card shadow-sm">
        <div className="card-body">
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<Users apiBaseUrl={apiBaseUrl} />} />
            <Route path="/activities" element={<Activities apiBaseUrl={apiBaseUrl} />} />
            <Route path="/teams" element={<Teams apiBaseUrl={apiBaseUrl} />} />
            <Route path="/leaderboard" element={<Leaderboard apiBaseUrl={apiBaseUrl} />} />
            <Route path="/workouts" element={<Workouts apiBaseUrl={apiBaseUrl} />} />
            <Route path="*" element={<Navigate to="/users" replace />} />
          </Routes>
        </div>
      </section>
    </main>
  )
}

export default App
