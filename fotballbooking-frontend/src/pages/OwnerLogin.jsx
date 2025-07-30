import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function OwnerLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:5000/api/owners/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        alert('Innlogging vellykket!')
        navigate('/owner/dashboard') // Endre til ønsket rute etter innlogging
      } else {
        alert(data.message || 'Innlogging feilet.')
      }
    } catch (err) {
      console.error(err)
      alert('Feil ved tilkobling til server.')
    }
  }

  return (
    <div className="container">
      <h2 className="mb-4">Logg inn som baneier</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">E-post</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Passord</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Logg inn</button>
      </form>
    </div>
  )
}

export default OwnerLogin

