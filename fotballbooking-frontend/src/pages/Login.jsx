import { useState } from 'react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    alert('Pålogging forsøkt: ' + email)
    // Her legger du til autentisering senere
  }

  return (
    <div className="container mt-4">
      <h2>Logg inn som bruker</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit" className="btn btn-primary">Logg inn</button>
      </form>
    </div>
  )
}

export default Login
