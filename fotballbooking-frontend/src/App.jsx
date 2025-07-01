// src/App.jsx
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import OwnerDashboard from './pages/OwnerDashboard'
import OwnerLogin from './pages/OwnerLogin'
import OwnerRegister from './pages/OwnerRegister'
import TenantBooking from './pages/TenantBooking'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <div className="container mt-4">
      <nav className="mb-4">
        <Link className="btn btn-outline-primary me-2" to="/">Hjem</Link>
        <Link className="btn btn-outline-success me-2" to="/owner">Eier</Link>
        <Link className="btn btn-outline-warning" to="/book">Leie</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/owner/login" element={<OwnerLogin />} />
        <Route path="/owner/register" element={<OwnerRegister />} />
        <Route path="/book" element={<TenantBooking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App



