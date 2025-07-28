import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
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
      navigate('/login')
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
    <div className="container mt-4">
      <h2>Velkommen, {user.name}!</h2>
      <p>Din e-post: {user.email}</p>

      <hr />

      <h4>Ditt brukerområde</h4>
      <ul>
        <li>📅 Se dine bookinger</li>
        <li>⚽ Utforsk og book ledige baner</li>
        <li>🔓 Logg ut</li>
      </ul>

      <hr />

      <h4>Min profil</h4>

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
        <>
          <button className="btn btn-success me-2" onClick={handleSave}>
            Lagre
          </button>
          <button className="btn btn-secondary" onClick={() => setEditMode(false)}>
            Avbryt
          </button>
        </>
      ) : (
        <button className="btn btn-primary" onClick={() => setEditMode(true)}>
          Rediger info
        </button>
      )}
    </div>
  )
}

export default Dashboard

