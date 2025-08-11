import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

function AdminPanel() {
  const navigate = useNavigate()
  const [counts, setCounts] = useState({ userCount: 0, ownerCount: 0, pitchCount: 0 })

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:5000/api/admin/counts', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setCounts(res.data)
      } catch (err) {
        console.error('Feil ved henting av tellinger:', err)
      }
    }

    fetchCounts()
  }, [])

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🛠️ Admin-panel</h2>

      <div className="row g-4">
        <div className="col-md-4">
          <div
            className="card shadow-sm"
            onClick={() => navigate('/admin/users')}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-body text-center">
              <h5 className="card-title">👥 Brukere</h5>
              <p className="display-6 fw-bold">{counts.userCount}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="card shadow-sm"
            onClick={() => navigate('/admin/owners')}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-body text-center">
              <h5 className="card-title">🏟️ Eiendomseiere</h5>
              <p className="display-6 fw-bold">{counts.ownerCount}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="card shadow-sm"
            onClick={() => navigate('/admin/pitches')}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-body text-center">
              <h5 className="card-title">⚽ Baner</h5>
              <p className="display-6 fw-bold">{counts.pitchCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center">
        <button className="btn btn-outline-danger btn-lg">🚫 Suspender bruker</button>
      </div>
    </div>
  )
}

export default AdminPanel


