function MyBookings() {
  const bookings = [
    {
      id: 1,
      pitchName: 'Frogner Stadion',
      date: '2025-07-01',
      time: '18:00',
      status: 'Bekreftet',
    },
    {
      id: 2,
      pitchName: 'Bislett Mini',
      date: '2025-07-03',
      time: '17:00',
      status: 'Avventer',
    }
  ]

  const getStatusBadge = (status) => {
    if (status === 'Bekreftet') return <span className="badge bg-success">{status}</span>
    if (status === 'Avventer') return <span className="badge bg-warning text-dark">{status}</span>
    return <span className="badge bg-secondary">{status}</span>
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Mine bookinger</h2>

      {bookings.length > 0 ? (
        <div className="row g-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-header bg-light fw-bold">{booking.pitchName}</div>
                <div className="card-body">
                  <p className="card-text mb-2">
                    <strong>Dato:</strong> {booking.date}<br />
                    <strong>Klokkeslett:</strong> {booking.time}<br />
                    <strong>Status:</strong> {getStatusBadge(booking.status)}
                  </p>
                  <button className="btn btn-outline-danger btn-sm">Avbestill</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info">Du har ingen bookinger enda.</div>
      )}
    </div>
  )
}

export default MyBookings

