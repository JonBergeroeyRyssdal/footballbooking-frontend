import { useState } from 'react'
import { Link } from 'react-router-dom'

function OwnerDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [pitches, setPitches] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    location: '',
    availableTimes: '',
    availableDates: ''
  })

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
      availableDates: formData.availableDates.split(',').map(d => d.trim())
    }
    setPitches([...pitches, newPitch])
    setFormData({
      name: '',
      size: '',
      location: '',
      availableTimes: '',
      availableDates: ''
    })
  }

  if (!isLoggedIn) {
    return (
      <div>
        <h2>Velkommen, eier</h2>
        <p>Velg et alternativ:</p>
        <Link className="btn btn-primary me-3" to="/owner/login">Logg inn</Link>
        <Link className="btn btn-success" to="/owner/register">Registrer deg</Link>
        <hr />
        <button className="btn btn-secondary mt-3" onClick={() => setIsLoggedIn(true)}>
          Midlertidig logg inn (for testing)
        </button>
        
      </div>
    )
  }

  return (
    <div>
      <h2>Eierpanel</h2>

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
      <Link className="btn btn-info me-3" to="/owner/mypitches">Mine baner</Link>
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

