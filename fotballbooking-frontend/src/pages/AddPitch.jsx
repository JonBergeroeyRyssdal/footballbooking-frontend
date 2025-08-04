import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddPitch() {
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    location: ''
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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
        <button type="submit" className="btn btn-success">Lagre bane</button>
      </form>
    </div>
  )
}

export default AddPitch
