import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {
  const [featuredPitches, setFeaturedPitches] = useState([])
  const location = useLocation()
  const [showLoggedOut, setShowLoggedOut] = useState(location.state?.loggedOut || false)

  // Skjul utloggingsmelding etter 3 sekunder
  useEffect(() => {
    if (showLoggedOut) {
      const timer = setTimeout(() => setShowLoggedOut(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showLoggedOut])

  // Hent utvalgte baner fra backend
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/pitches/featured')
        setFeaturedPitches(res.data)
      } catch (err) {
        console.error('❌ Kunne ikke hente utvalgte baner:', err)
      }
    }

    fetchFeatured()
  }, [])

  return (
    <div className="container py-5">
      {/* Utloggingsmelding */}
      {showLoggedOut && (
        <div className="alert alert-success">Du er nå logget ut.</div>
      )}

      {/* Hero / Intro */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Finn din perfekte fotballbane</h1>
        <p className="lead text-muted">
          Søk blant utleide baner nær deg og book på få minutter.
        </p>
      </div>

      {/* Søkeform */}
      <div className="card shadow-sm mb-5 p-4">
        <h4 className="mb-4">Hva leter du etter?</h4>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Sted</label>
            <input type="text" className="form-control" placeholder="F.eks. Oslo, Bergen..." />
          </div>
          <div className="col-md-6">
            <label className="form-label">Banestørrelse</label>
            <select className="form-select">
              <option>Velg størrelse</option>
              <option>7er-bane</option>
              <option>11er-bane</option>
              <option>Futsal / innendørs</option>
            </select>
          </div>
        </div>
        <div className="mt-4 text-end">
          <Link to="/book" className="btn btn-primary btn-lg">
            Søk ledige baner
          </Link>
        </div>
      </div>

      {/* Utvalgte baner */}
      <div>
        <h3 className="mb-4">Utvalgte baner</h3>
        <div className="row g-4">
          {featuredPitches.map((pitch) => (
            <div className="col-md-4" key={pitch.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={`https://source.unsplash.com/400x250/?football,pitch,${pitch.location}`}
                  className="card-img-top"
                  alt={pitch.name}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{pitch.name}</h5>
                  <p className="card-text text-muted">
                    {pitch.location}, {pitch.size} – tilgjengelig for booking.
                  </p>
                  <Link to="/book" className="mt-auto btn btn-outline-primary">
                    Se tilgjengelighet
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Hvis ingen baner */}
          {featuredPitches.length === 0 && (
            <div className="col-12">
              <div className="alert alert-warning">
                Ingen baner ble funnet. Kommer snart!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
