import { useEffect, useState } from 'react'
import axios from 'axios'

function AdminPitchList() {
  const [pitches, setPitches] = useState([])

  useEffect(() => {
    const fetchPitches = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:5000/api/pitches/available', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setPitches(res.data)
      } catch (err) {
        console.error('Feil ved henting av baner:', err)
      }
    }

    fetchPitches()
  }, [])

  return (
    <div className="container mt-5">
      <h2>Alle baner</h2>
      <div className="row g-4">
        {pitches.map(pitch => (
          <div key={pitch.id} className="col-md-6">
            <div className="card shadow-sm h-100">
              {pitch.image && (
                <img
                  src={pitch.image}
                  className="card-img-top"
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{pitch.name}</h5>
                <p>
                  <strong>By:</strong> {pitch.location}<br />
                  <strong>Størrelse:</strong> {pitch.size}<br />
                  <strong>Pris:</strong> {pitch.price} kr<br />
                  <strong>Underlag:</strong> {pitch.surface}<br />
                  <strong>Garderobe:</strong> {pitch.hasLockerRoom ? 'Ja' : 'Nei'}<br />
                  <strong>Eier:</strong> {pitch.ownerName}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminPitchList
