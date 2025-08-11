import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function UserDashboard() {
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [editMode, setEditMode] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      if (parsedUser.role === 'user') {
        setUser(parsedUser)
        setFormData({
          name: parsedUser.name,
          email: parsedUser.email,
          phone: parsedUser.phone || ''
        })
      } else {
        navigate('/')
      }
    } else {
      navigate('/loginuser')
    }
  }, [navigate])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`http://localhost:5000/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        alert('Informasjon oppdatert')
        const updatedUser = { ...user, ...formData }
        setUser(updatedUser)
        localStorage.setItem('user', JSON.stringify(updatedUser))
        setEditMode(false)
      } else {
        const data = await res.json()
        alert('Feil: ' + (data.error || 'Ukjent feil'))
      }
    } catch (error) {
      console.error('Feil ved lagring:', error)
      alert('Nettverksfeil')
    }
  }

  if (!user) return null

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Velkommen tilbake, {user.name}!</h2>

      <div className="row g-4">
        {/* Brukerområde */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              Ditt brukerområde
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">📅 <strong>Se dine bookinger</strong></li>
                <li className="list-group-item">⚽ <strong>Utforsk og book ledige baner</strong></li>
                <li className="list-group-item">🔓 <strong>Logg ut</strong> (kommer)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Profilkort */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-secondary text-white">
              Min profil
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Navn</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">E-post</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Telefon</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>

              {editMode ? (
                <div className="d-flex justify-content-between">
                  <button className="btn btn-success" onClick={handleSave}>
                    💾 Lagre
                  </button>
                  <button className="btn btn-outline-secondary" onClick={() => setEditMode(false)}>
                    Avbryt
                  </button>
                </div>
              ) : (
                <button className="btn btn-primary w-100" onClick={() => setEditMode(true)}>
                  ✏️ Rediger info
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard


