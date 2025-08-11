// src/pages/Owner/MyPitches.jsx
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

function MyPitches() {
  const [pitches, setPitches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const token = localStorage.getItem('token')
        console.log('Token i storage:', token ? '[finnes]' : '[mangler]')

        const res = await axios.get('http://localhost:5000/api/pitches/mine', {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        })

        if (alive) setPitches(res.data || [])
      } catch (err) {
        const status = err?.response?.status
        const msg = err?.response?.data?.message || err?.response?.data?.error || err.message

        // Valgfritt: send bruker til innlogging ved 401
        if (status === 401) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          window.location.href = '/owner/login'
          return
        }

        if (alive) setError(msg)
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => { alive = false }
  }, [])

  if (loading) return <div className="container mt-5">Laster…</div>
  if (error)   return <div className="container mt-5 alert alert-danger">Kunne ikke hente baner: {String(error)}</div>

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📋 Mine baner</h2>

      {pitches.length === 0 && (
        <div className="alert alert-info">
          Ingen baner funnet. <Link to="/owner/pitches/add">Legg til en bane</Link>.
        </div>
      )}

      <div className="row g-4">
        {pitches.map(pitch => (
          <div key={pitch.id} className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{pitch.name}</h5>
                  <p className="card-text">
                    <strong>Størrelse:</strong> {pitch.size}<br />
                    <strong>Lokasjon:</strong> {pitch.location}
                  </p>
                </div>
                <div className="mt-3">
                  <Link to={`/owner/pitches/${pitch.id}`} className="btn btn-outline-primary w-100">
                    🔍 Se detaljer
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyPitches



