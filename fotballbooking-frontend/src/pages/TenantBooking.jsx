import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const dummyPitches = [
  {
    id: 1,
    name: 'Frogner Stadion',
    city: 'Oslo',
    size: '11er',
    price: 1200,
    availableTimes: ['18:00', '19:00'],
    availableDates: ['2025-07-01', '2025-07-02']
  },
  {
    id: 2,
    name: 'Bislett Mini',
    city: 'Oslo',
    size: '7er',
    price: 800,
    availableTimes: ['17:00', '18:00'],
    availableDates: ['2025-07-01']
  },
  {
    id: 3,
    name: 'Lerkendal Bane 2',
    city: 'Trondheim',
    size: '5er',
    price: 500,
    availableTimes: ['19:00'],
    availableDates: ['2025-07-03']
  }
]

function TenantBooking() {
  const [searchCity, setSearchCity] = useState('')
  const [searchSize, setSearchSize] = useState('')
  const [searchTime, setSearchTime] = useState('')
  const [searchDate, setSearchDate] = useState('')

  const navigate = useNavigate()

  const handleBookClick = () => {
    navigate('/login') // Send brukeren til innlogging
  }

  const filteredPitches = dummyPitches.filter(pitch => {
    return (
      (!searchCity || pitch.city.toLowerCase().includes(searchCity.toLowerCase())) &&
      (!searchSize || pitch.size === searchSize) &&
      (!searchTime || pitch.availableTimes.includes(searchTime)) &&
      (!searchDate || pitch.availableDates.includes(searchDate))
    )
  })

  return (
    <div>
      <h2>Book en fotballbane</h2>

      {/* Søkeform */}
      <div className="mb-4 row g-3">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Søk by (f.eks. Oslo)"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
          />
        </div>
        <div className="col">
          <select className="form-select" value={searchSize} onChange={(e) => setSearchSize(e.target.value)}>
            <option value="">Alle størrelser</option>
            <option value="5er">5er</option>
            <option value="7er">7er</option>
            <option value="11er">11er</option>
          </select>
        </div>
        <div className="col">
          <input
            type="time"
            className="form-control"
            value={searchTime}
            onChange={(e) => setSearchTime(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="date"
            className="form-control"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </div>
      </div>

      {/* Resultater */}
      {filteredPitches.length > 0 ? (
        filteredPitches.map(pitch => (
          <div key={pitch.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{pitch.name}</h5>
              <p className="card-text">
                By: {pitch.city} <br />
                Bane: {pitch.size} <br />
                Pris: {pitch.price} kr <br />
                Ledige tider: {pitch.availableTimes.join(', ')} <br />
                Ledige datoer: {pitch.availableDates.join(', ')}
              </p>
              <button className="btn btn-primary" onClick={handleBookClick}>Book nå</button>
            </div>
          </div>
        ))
      ) : (
        <p>Ingen baner funnet.</p>
      )}
    </div>
  )
}

export default TenantBooking




