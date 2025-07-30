import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginUser() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('Starter innlogging…')

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()
      console.log('Svar fra backend:', data)

      if (!res.ok) {
        return alert(data.message || 'Ugyldig innlogging.')
      }

      if (!data.token || !data.user) {
        return alert('Manglende data fra server.')
      }

      if (data.user.role !== 'user') {
        return alert('Du har ikke tilgang til brukerinnlogging. Bruk riktig innlogging for din rolle.')
      }

      // ✅ Alt ok – logg inn
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      console.log('Token og bruker lagret')
      navigate('/dashboard')
    } catch (err) {
      console.error('Nettverksfeil eller annen feil:', err)
      alert('Nettverksfeil')
    }
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
            autoComplete="email"
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
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="btn btn-primary">Logg inn</button>
      </form>

      <hr />

      <p>Har du ikke bruker?</p>
      <button
        className="btn btn-outline-secondary"
        onClick={() => navigate('/register')}
      >
        Registrer deg
      </button>
    </div>
  )
}

export default LoginUser

