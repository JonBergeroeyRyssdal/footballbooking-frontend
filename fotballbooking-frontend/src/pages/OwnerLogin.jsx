import { useState } from 'react'

function OwnerLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Senere: send `formData` til backend
    console.log('Prøver å logge inn med:', formData)
    alert('Innlogging simulert!')
  }

  return (
    <div className="container">
      <h2 className="mb-4">Logg inn som baneier</h2>
      <form onSubmit={handleSubmit}>
        {/* E-post */}
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

        {/* Passord */}
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

