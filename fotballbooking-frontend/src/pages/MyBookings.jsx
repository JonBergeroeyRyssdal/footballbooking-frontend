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

  return (
    <div className="container mt-4">
      <h2>Mine bookinger</h2>

      {bookings.length > 0 ? (
        bookings.map(booking => (
          <div key={booking.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{booking.pitchName}</h5>
              <p className="card-text">
                Dato: {booking.date} <br />
                Klokkeslett: {booking.time} <br />
                Status: {booking.status}
              </p>
              <button className="btn btn-outline-danger">Avbestill</button>
            </div>
          </div>
        ))
      ) : (
        <p>Du har ingen bookinger enda.</p>
      )}
    </div>
  )
}

export default MyBookings
