import { useParams } from 'react-router-dom'

function PitchDetail() {
  const { id } = useParams()

  // Dummy booking- og tilgjengelighetsinfo
  const dummyPitch = {
    id,
    name: 'Majorstua Kunstgress',
    bookings: ['2025-07-01 18:00', '2025-07-03 19:00'],
    availableTimes: ['17:00', '18:00', '19:00'],
    availableDates: ['2025-07-01', '2025-07-02', '2025-07-03']
  }

  return (
    <div className="container mt-4">
      <h2>Detaljer for {dummyPitch.name}</h2>
      <h4>Bookede tider:</h4>
      <ul>
        {dummyPitch.bookings.map((booking, index) => (
          <li key={index}>{booking}</li>
        ))}
      </ul>

      <h4>Tilgjengelige tider:</h4>
      <p>{dummyPitch.availableTimes.join(', ')}</p>

      <h4>Tilgjengelige datoer:</h4>
      <p>{dummyPitch.availableDates.join(', ')}</p>

      <button className="btn btn-warning mt-3">Rediger tilgjengelighet (kommer)</button>
    </div>
  )
}

export default PitchDetail
