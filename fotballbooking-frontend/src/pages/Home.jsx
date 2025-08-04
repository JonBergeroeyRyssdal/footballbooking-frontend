import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Home() {
  const images = [
    "https://images.unsplash.com/photo-1608051931686-4272d18e03e2",
    "https://images.unsplash.com/photo-1618730178618-2e3eac04557d",
    "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
  ]

  const location = useLocation()
  const [showLoggedOut, setShowLoggedOut] = useState(location.state?.loggedOut || false)

  useEffect(() => {
    if (showLoggedOut) {
      const timer = setTimeout(() => setShowLoggedOut(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showLoggedOut])

  return (
    <div className="container py-5">
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

      {/* Search Filters */}
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

      {/* Featured Fields */}
      <div>
        <h3 className="mb-4">Utvalgte baner</h3>
        <div className="row g-4">
          {images.map((img, i) => (
            <div className="col-md-4" key={i}>
              <div className="card h-100 shadow-sm">
                <img
                  src={`${img}?w=400&h=250&fit=crop`}
                  className="card-img-top"
                  alt={`Bane ${i + 1}`}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Bane {i + 1}</h5>
                  <p className="card-text text-muted">
                    Oslo, 11er-bane – Kunstgress med flomlys.
                  </p>
                  <Link to="/book" className="mt-auto btn btn-outline-primary">
                    Se tilgjengelighet
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
