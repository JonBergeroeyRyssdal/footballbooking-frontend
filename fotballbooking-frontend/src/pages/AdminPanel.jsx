function AdminPanel() {
  return (
    <div className="container mt-4">
      <h2>Admin-panel</h2>
      <ul>
        <li>Antall brukere: 124</li>
        <li>Antall eiere: 23</li>
        <li>Rapporterte problemer: 0</li>
      </ul>
      <button className="btn btn-danger">Suspender bruker</button>
    </div>
  )
}

export default AdminPanel