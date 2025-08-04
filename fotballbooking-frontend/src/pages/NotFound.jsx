import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-4 text-danger mb-3">404</h1>
      <h3 className="mb-3">Siden finnes ikke</h3>
      <p className="text-muted mb-4">
        Beklager, vi fant ikke det du lette etter. Kanskje du skrev feil adresse?
      </p>
      <Link to="/" className="btn btn-primary">
        ⬅️ Gå til forsiden
      </Link>
    </div>
  )
}

export default NotFound
