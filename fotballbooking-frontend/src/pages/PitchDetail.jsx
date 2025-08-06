// src/pages/PitchDetail.jsx
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

function PitchDetail() {
  const { id } = useParams()
  const [pitch, setPitch] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    const token = localStorage.getItem('token')

    const fetchPitch = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/pitches/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!res.ok) throw new Error('Kunne ikke hente baneinformasjon')

        const data = await res.json()
        setPitch(data)
      } catch (error) {
        console.error(error)
        alert('Feil ved henting av bane')
      }
    }

    fetchPitch()
  }, [id])

  const handleDateClick = (date) => {
    setSelectedDate(date)
    // Fremtidig: hent tilgjengelighet/booking for valgt dato
  }

  if (!pitch) return <p>Laster baneinformasjon ...</p>

  return (
    <div className="container mt-5">
      <h2>{pitch.name}</h2>
      <p><strong>Størrelse:</strong> {pitch.size}</p>
      <p><strong>Lokasjon:</strong> {pitch.location}</p>
      <p><strong>Dekke:</strong> {pitch.surface || 'Ikke oppgitt'}</p>
      <p><strong>Garderober:</strong> {pitch.hasLockerRoom ? 'Ja' : 'Nei'}</p>
      <p><strong>Pris per time:</strong> {pitch.price ? `${pitch.price} kr` : 'Ikke satt'}</p>

      {pitch.image && (
        <img
          src={pitch.image}
          alt="Bilde av banen"
          className="img-fluid mb-3"
          style={{ maxHeight: '300px', objectFit: 'cover' }}
        />
      )}

      <h4 className="mt-4">📅 Kalender – velg dato for tilgjengelighet</h4>
      <Calendar value={selectedDate} onClickDay={handleDateClick} />

      <div className="mt-4">
        <button className="btn btn-warning mt-3">Rediger tilgjengelighet (kommer)</button>
      </div>
    </div>
  )
}

export default PitchDetail


