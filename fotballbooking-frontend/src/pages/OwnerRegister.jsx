import { useState } from 'react'

function OwnerRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert('Passordene matcher ikke.')
      return
    }

    // Senere: send `formData` til backend her
    console.log('Sendes til server:', formData)
    alert('Registrert! (simulert)')
  }

  return (
    <div className="container">
      <h2 className="mb-4">Registrer deg som baneier</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Navn</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

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

        <div className="mb-3">
          <label className="form-label">Bekreft passord</label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">Registrer</button>
      </form>
    </div>
  )
}

export default OwnerRegister

