// src/pages/Home.jsx
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="text-center">
      <h1>Velkommen til Fotballbooking</h1>
      <p className="lead">Lei eller tilby fotballbaner enkelt og raskt.</p>
      
      <div className="mt-4">
        <Link to="/owner/register" className="btn btn-success me-3">Registrer bane</Link>
        <Link to="/book" className="btn btn-primary">Finn ledig bane</Link>
      </div>
    </div>
  )
}

export default Home
