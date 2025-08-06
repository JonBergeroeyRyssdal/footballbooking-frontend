import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddPitch() {
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    location: '',
    price: '',
    surface: '',
    hasLockerRoom: false,
    image: ''
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value
    setFormData(prev => ({ ...prev, [name]: newValue }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')

    try {
      const res = await fetch('http://localhost:5000/api/pitches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (res.ok) {
        alert('Bane lagt til!')
        navigate('/owner/dashboard')
      } else {
        alert(data.message || 'Feil ved lagring')
      }
    } catch (err) {
      console.error(err)
      alert('Serverfeil')
    }
  }

  return (
    <div className="container mt-5">
      <h2>➕ Legg til ny bane</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Navn</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Størrelse</label>
          <select className="form-select" name="size" value={formData.size} onChange={handleChange} required>
            <option value="">Velg størrelse</option>
            <option value="5er">5er</option>
            <option value="7er">7er</option>
            <option value="11er">11er</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Lokasjon</label>
          <input type="text" className="form-control" name="location" value={formData.location} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Pris (NOK per time)</label>
          <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Dekke</label>
          <select className="form-select" name="surface" value={formData.surface} onChange={handleChange} required>
            <option value="">Velg dekke</option>
            <option value="kunstgress">Kunstgress</option>
            <option value="gress">Gress</option>
            <option value="grus">Grus</option>
            <option value="annet">Annet</option>
          </select>
        </div>

        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" name="hasLockerRoom" checked={formData.hasLockerRoom} onChange={handleChange} />
          <label className="form-check-label">Har garderobe</label>
        </div>

        <div className="mb-3">
          <label className="form-label">Bilde-URL</label>
          <input type="text" className="form-control" name="image" value={formData.image} onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-success">Lagre bane</button>
      </form>
    </div>
  )
}

export default AddPitch

