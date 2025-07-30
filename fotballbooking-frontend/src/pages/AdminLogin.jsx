import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        return alert(data.message || 'Innlogging feilet.')
      }

      if (!data.token || !data.user) {
        return alert('Ugyldig respons fra server.')
      }

      if (data.user.role !== 'admin') {
        return alert('Du har ikke administratorrettigheter.')
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      alert('Innlogging vellykket!')
      navigate('/admin')
    } catch (err) {
      console.error(err)
      alert('Tilkoblingsfeil eller serverfeil.')
    }
  }

  return (
    <div className="container mt-4">
      <h2>Admin innlogging</h2>
      <form onSubmit={handleSubmit}>
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

        <button type="submit" className="btn btn-danger">Logg inn som admin</button>
      </form>
    </div>
  )
}

export default AdminLogin
