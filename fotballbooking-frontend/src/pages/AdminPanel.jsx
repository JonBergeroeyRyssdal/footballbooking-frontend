function AdminPanel() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">🛠️ Admin-panel</h2>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">👥 Brukere</h5>
              <p className="display-6 fw-bold">124</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">🏟️ Eiendomseiere</h5>
              <p className="display-6 fw-bold">23</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">🚨 Rapporter</h5>
              <p className="display-6 fw-bold text-success">0</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center">
        <button className="btn btn-outline-danger btn-lg">
          🚫 Suspender bruker
        </button>
      </div>
    </div>
  )
}

export default AdminPanel
