import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function OwnerDashboard() {
  const [pitches, setPitches] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    location: '',
    availableTimes: '',
    availableDates: '',
  })

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  // 🔐 Sjekk om bruker er logget inn (token i localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    if (token && user) {
      const parsedUser = JSON.parse(user)
      if (parsedUser.role === 'owner') {
        setIsLoggedIn(true)
      } else {
        alert('Kun baneiere har tilgang.')
        navigate('/')
      }
    } else {
      setIsLoggedIn(false)
    }
  }, [navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleAddPitch = (e) => {
    e.preventDefault()
    const newPitch = {
      ...formData,
      id: Date.now(),
      availableTimes: formData.availableTimes.split(',').map(t => t.trim()),
      availableDates: formData.availableDates.split(',').map(d => d.trim()),
    }
    setPitches([...pitches, newPitch])
    setFormData({
      name: '',
      size: '',
      location: '',
      availableTimes: '',
      availableDates: '',
    })
  }

  if (!isLoggedIn) {
    return (
      <div className="container mt-5">
        <h2>Ikke logget inn</h2>
        <p>Du må være logget inn som baneier for å se dette panelet.</p>
        <Link className="btn btn-primary" to="/owner/login">Gå til innlogging</Link>
      </div>
    )
  }

  return (
    <div className="container">
      <h2 className="mb-4">Eierpanel</h2>

      {/* Skjema for å legge til ny bane */}
      <form onSubmit={handleAddPitch} className="mb-4">
        <h4>Legg til ny bane</h4>
        <div className="mb-3">
          <label className="form-label">Navn på bane</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Størrelse (5er, 7er, 11er)</label>
          <input
            type="text"
            className="form-control"
            name="size"
            value={formData.size}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Lokasjon</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ledige tider (kommaseparert)</label>
          <input
            type="text"
            className="form-control"
            name="availableTimes"
            value={formData.availableTimes}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ledige datoer (YYYY-MM-DD, kommaseparert)</label>
          <input
            type="text"
            className="form-control"
            name="availableDates"
            value={formData.availableDates}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-success">Legg til bane</button>
      </form>

      {/* Liste over baner */}
      <h4>Mine baner</h4>
      {pitches.length > 0 ? (
        pitches.map(pitch => (
          <div key={pitch.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{pitch.name}</h5>
              <p className="card-text">
                Størrelse: {pitch.size} <br />
                Lokasjon: {pitch.location} <br />
                Ledige tider: {pitch.availableTimes.join(', ')} <br />
                Ledige datoer: {pitch.availableDates.join(', ')}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>Ingen baner lagt til ennå.</p>
      )}
    </div>
  )
}

export default OwnerDashboard


