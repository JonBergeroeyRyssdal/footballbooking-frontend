// src/components/Navbar.jsx
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Fotballbooking
        </Link>
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

            <li className="nav-item">
              <Link className="nav-link" to="/">Hjem</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/book">Leie</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">Om oss</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Kontakt</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Min profil</Link>
            </li>

            {/* Dropdown: Bruker */}
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                Bruker
              </span>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/loginuser">Logg inn</Link></li>
                <li><Link className="dropdown-item" to="/user/register">Registrer</Link></li>
                <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>
                <li><Link className="dropdown-item" to="/mybookings">Mine bookinger</Link></li>
              </ul>
            </li>

            {/* Dropdown: Eier */}
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                Eier
              </span>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/owner/login">Logg inn</Link></li>
                <li><Link className="dropdown-item" to="/owner/register">Registrer</Link></li>
                <li><Link className="dropdown-item" to="/owner/dashboard">Dashboard</Link></li>
              </ul>
            </li>

            {/* Admin */}
            <li className="nav-item">
              <Link className="nav-link" to="/admin/login">Admin</Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
