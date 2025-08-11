import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Booking() {
  const [allPitches, setAllPitches] = useState([])
  const [searchCity, setSearchCity] = useState('')
  const [searchSize, setSearchSize] = useState('')
  const [searchTime, setSearchTime] = useState('')
  const [searchDate, setSearchDate] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPitches = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/pitches/available')
        console.log('✅ Data mottatt fra backend:', res.data)
        setAllPitches(res.data)
      } catch (err) {
        console.error('❌ Feil ved henting av baner:', err)
      }
    }
    fetchPitches()
  }, [])

  // Åpne banesiden (ingen innlogging tvunget her)
  const handleBookClick = (id) => {
    navigate(`/pitches/${id}`)
  }

  const filteredPitches = allPitches.filter(pitch => (
    (!searchCity || pitch.location?.toLowerCase().includes(searchCity.toLowerCase())) &&
    (!searchSize || pitch.size === searchSize)
  ))

  return (
    <div className="container mt-5">
      <h2 className="mb-4">⚽ Book en fotballbane</h2>

      {/* Søkeform */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="By (f.eks. Oslo)"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={searchSize}
                onChange={(e) => setSearchSize(e.target.value)}
              >
                <option value="">Alle størrelser</option>
                <option value="5er">5er</option>
                <option value="7er">7er</option>
                <option value="11er">11er</option>
              </select>
            </div>
            <div className="col-md-3">
              <input
                type="time"
                className="form-control"
                value={searchTime}
                onChange={(e) => setSearchTime(e.target.value)}
                disabled
              />
            </div>
            <div className="col-md-3">
              <input
                type="date"
                className="form-control"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      {/* Resultater */}
      {filteredPitches.length > 0 ? (
        <div className="row g-4">
          {filteredPitches.map(pitch => (
            <div key={pitch.id} className="col-md-6">
              <div className="card shadow-sm h-100">
                {pitch.image && (
                  <img
                    src={pitch.image}
                    alt={pitch.name}
                    className="card-img-top"
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{pitch.name}</h5>
                    <p className="card-text">
                      <strong>By:</strong> {pitch.location}<br />
                      <strong>Størrelse:</strong> {pitch.size}<br />
                      <strong>Pris:</strong> {pitch.price} kr<br />
                      <strong>Underlag:</strong> {pitch.surface}<br />
                      <strong>Garderobe:</strong> {pitch.hasLockerRoom ? 'Ja' : 'Nei'}<br />
                      <strong>Eier:</strong> {pitch.ownerName}
                    </p>
                  </div>
                  <div className="mt-3">
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => handleBookClick(pitch.id)}
                    >
                      📅 Book nå
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info">Ingen baner funnet.</div>
      )}
    </div>
  )
}

export default Booking







