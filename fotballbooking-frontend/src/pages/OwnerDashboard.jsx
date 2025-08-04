import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function OwnerDashboard() {
  const [pitches, setPitches] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    if (token && user) {
      const parsedUser = JSON.parse(user)
      if (parsedUser.role === 'owner') {
        setIsLoggedIn(true)

        // 🔄 Hent banene fra backend
        fetch('http://localhost:5000/api/pitches/mine', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(res => res.json())
          .then(data => setPitches(data))
          .catch(err => {
            console.error('Feil ved henting av baner:', err)
            alert('Kunne ikke hente baner.')
          })

      } else {
        alert('Kun baneiere har tilgang.')
        navigate('/')
      }
    } else {
      setIsLoggedIn(false)
    }
  }, [navigate])

  if (!isLoggedIn) {
    return (
      <div className="container mt-5">
        <h2>🚫 Ikke logget inn</h2>
        <p>Du må være logget inn som baneier for å se dette panelet.</p>
        <Link className="btn btn-primary" to="/owner/login">Gå til innlogging</Link>
      </div>
    )
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🎯 Eierpanel</h2>

      <Link to="/owner/add-pitch" className="btn btn-outline-primary mb-4">
        ➕ Legg til ny bane
      </Link>

      {/* Liste over baner */}
      <h4 className="mb-3">📋 Mine baner</h4>
      {pitches.length > 0 ? (
        <div className="row g-4">
          {pitches.map(pitch => (
            <div key={pitch.id} className="col-md-6">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{pitch.name}</h5>
                  <p className="card-text">
                    <strong>Størrelse:</strong> {pitch.size}<br />
                    <strong>Lokasjon:</strong> {pitch.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info">Ingen baner lagt til ennå.</div>
      )}
    </div>
  )
}

export default OwnerDashboard




