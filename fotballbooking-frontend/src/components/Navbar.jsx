import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Navbar() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      setUser(null)
    }
  }, [location]) // Oppdater ved rutenavigasjon

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/', { state: { loggedOut: true } })
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">Fotballbooking</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Public */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Hjem</Link>
            </li>
            <li className="nav-item">
              {/* Hvis du heller vil ha en søkeside senere, bytt til f.eks. /search */}
              <Link className="nav-link" to="/user/book">Leie</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">Om oss</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Kontakt</Link>
            </li>

            {/* Ikke innlogget */}
            {!user && (
              <>
                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                    Bruker
                  </span>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/user/login">Logg inn</Link></li>
                    <li><Link className="dropdown-item" to="/user/register">Registrer</Link></li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                    Eier
                  </span>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/owner/login">Logg inn</Link></li>
                    <li><Link className="dropdown-item" to="/owner/register">Registrer</Link></li>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/admin/login">Admin</Link>
                </li>
              </>
            )}

            {/* Innlogget tenant */}
            {user && user.role === 'user' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/user/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/user/bookings">Mine bookinger</Link>
                </li>
              </>
            )}

            {/* Innlogget owner */}
            {user && user.role === 'owner' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/owner/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/owner/pitches">Mine baner</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/owner/pitches/add">Legg til bane</Link>
                </li>
              </>
            )}

            {/* Innlogget admin */}
            {user && user.role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin/dashboard">Adminpanel</Link>
              </li>
            )}

            {/* Felles logg ut-knapp for alle roller */}
            {user && (
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-outline-danger ms-2">Logg ut</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar



