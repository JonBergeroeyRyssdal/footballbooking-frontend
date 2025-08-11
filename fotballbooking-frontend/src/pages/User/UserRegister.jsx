import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ← LEGG TIL DETTE

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
    const navigate = useNavigate() // ← LEGG TIL DETTE

  const handleRegister = async (e) => {
  e.preventDefault()

  try {
    const res = await fetch('http://localhost:5000/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, phone }),
    })

    const data = await res.json()

    if (res.ok) {
      alert('Bruker registrert med ID: ' + data.userId)
      navigate("/login") // ← SEND VIDERE TIL LOGIN-SIDEN
    } else {
      alert('Feil: ' + data.error)
    }
  } catch (error) {
    console.error('Nettverksfeil:', error)
    alert('Noe gikk galt ved registrering')
  }
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
        <div className="mb-3">
          <label className="form-label">Telefon</label>
          <input
            type="text"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Registrer
        </button>
      </form>
    </div>
  );
}

export default Register;
