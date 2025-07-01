import { useState } from 'react'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleRegister = (e) => {
    e.preventDefault()
    alert(`Registrerer: ${name} (${email})`)
    // TODO: Legg til registreringslogikk
  }

  return (
    <div className="container mt-4">
      <h2>Registrer ny bruker</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">Navn</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">E-post</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Passord</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Registrer</button>
      </form>
    </div>
  )
}

export default Register
