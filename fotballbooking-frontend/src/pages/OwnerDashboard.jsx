// src/pages/OwnerDashboard.jsx
import { Link } from 'react-router-dom'

function OwnerDashboard() {
  return (
    <div>
      <h2>Velkommen, eier</h2>
      <p>Velg et alternativ:</p>
      <Link className="btn btn-primary me-3" to="/owner/login">Logg inn</Link>
      <Link className="btn btn-success" to="/owner/register">Registrer deg</Link>
    </div>
  )
}

export default OwnerDashboard
