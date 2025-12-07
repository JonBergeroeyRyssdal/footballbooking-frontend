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
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/', { state: { loggedOut: true } })
  }

  // Label i toppen på dropdown – litt "Airbnb style"
  const userLabel = user
    ? user.email || (user.role === 'owner' ? 'Eierkonto' : user.role === 'admin' ? 'Admin' : 'Brukerkonto')
    : 'Konto'

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold" to="/">
          Fotballbooking
        </Link>

        {/* Burger på mobil */}
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

        {/* Nav-innhold */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Venstre side: vanlige lenker */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Hjem</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user/book">Leie</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">Om oss</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Kontakt</Link>
            </li>
          </ul>

          {/* Høyre side: én “profil”-dropdown, Airbnb-style */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <button
                className="btn btn-light border rounded-pill d-flex align-items-center px-3 py-1 nav-link dropdown-toggle"
                id="userMenuDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                type="button"
              >
                {/* Liten “hamburger”-ikon + sirkel som avatar, à la Airbnb */}
                <span className="me-2">
                  <i className="bi bi-list"></i>
                </span>
                <span
                  className="d-inline-flex justify-content-center align-items-center rounded-circle bg-secondary text-white"
                  style={{ width: 32, height: 32, fontSize: 14 }}
                >
                  {user ? (user.email ? user.email[0].toUpperCase() : user.role[0].toUpperCase()) : 'K'}
                </span>
              </button>

              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenuDropdown">
                {/* Topptekst i menyen */}
                <li>
                  <h6 className="dropdown-header">{userLabel}</h6>
                </li>

                {/* Ikke innlogget → vis login/register-valg */}
                {!user && (
                  <>
                    <li><Link className="dropdown-item" to="/user/login">Logg inn som bruker</Link></li>
                    <li><Link className="dropdown-item" to="/user/register">Registrer bruker</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" to="/owner/login">Logg inn som eier</Link></li>
                    <li><Link className="dropdown-item" to="/owner/register">Registrer eier</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" to="/admin/login">Admin-innlogging</Link></li>
                  </>
                )}

                {/* Innlogget bruker */}
                {user && user.role === 'user' && (
                  <>
                    <li><Link className="dropdown-item" to="/user/dashboard">Bruker-dashboard</Link></li>
                    <li><Link className="dropdown-item" to="/user/bookings">Mine bookinger</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        Logg ut
                      </button>
                    </li>
                  </>
                )}

                {/* Innlogget eier */}
                {user && user.role === 'owner' && (
                  <>
                    <li><Link className="dropdown-item" to="/owner/dashboard">Eier-dashboard</Link></li>
                    <li><Link className="dropdown-item" to="/owner/pitches">Mine baner</Link></li>
                    <li><Link className="dropdown-item" to="/owner/pitches/add">Legg til bane</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        Logg ut
                      </button>
                    </li>
                  </>
                )}

                {/* Innlogget admin */}
                {user && user.role === 'admin' && (
                  <>
                    <li><Link className="dropdown-item" to="/admin/dashboard">Adminpanel</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        Logg ut
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar




