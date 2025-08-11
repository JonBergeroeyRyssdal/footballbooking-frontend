// src/pages/PitchDetail.jsx
import { useParams, Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'

function startOfWeek(date) {
  const d = new Date(date)
  const day = (d.getDay() + 6) % 7 // mandag=0
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() - day)
  return d
}

function addDays(date, days) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function toISODate(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d.toISOString().split('T')[0]
}

function hoursRange(start = 7, end = 22, stepMins = 60) {
  // f.eks. 07:00 til 22:00 (inkl start, ekskl slutt)
  const slots = []
  const base = new Date()
  base.setHours(0, 0, 0, 0)
  for (let h = start; h < end; h++) {
    for (let m = 0; m < 60; m += stepMins) {
      const d = new Date(base)
      d.setHours(h, m, 0, 0)
      const hh = String(h).padStart(2, '0')
      const mm = String(m).padStart(2, '0')
      slots.push({ label: `${hh}:${mm}`, minutesOfDay: h * 60 + m })
    }
  }
  return slots
}

const dtfWeekday = new Intl.DateTimeFormat('nb-NO', { weekday: 'short' })
const dtfDate = new Intl.DateTimeFormat('nb-NO', { day: '2-digit', month: '2-digit' })
const dtfShort = new Intl.DateTimeFormat('nb-NO', { day: '2-digit', month: '2-digit' })

// ISO-ukenummer for en gitt dato (mandag-basert)
function getISOWeek(d) {
  // Bruk UTC for å unngå DST-problemer
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  const dayNum = (date.getUTCDay() + 6) % 7 // 0=mandag
  // Flytt til torsdag i samme uke (ISO referansedag)
  date.setUTCDate(date.getUTCDate() - dayNum + 3)

  // Finn første torsdag i ISO-året
  const firstThursday = new Date(Date.UTC(date.getUTCFullYear(), 0, 4))
  const firstDayNum = (firstThursday.getUTCDay() + 6) % 7
  firstThursday.setUTCDate(firstThursday.getUTCDate() - firstDayNum + 3)

  // Ukenummer og ISO-år
  const weekNo = 1 + Math.round((date - firstThursday) / (7 * 24 * 3600 * 1000))
  const isoYear = date.getUTCFullYear()
  return { week: weekNo, isoYear }
}

function weekRangeLabel(weekStart) {
  const monday = new Date(weekStart)
  const sunday = new Date(weekStart); sunday.setDate(sunday.getDate() + 6)
  return `${dtfShort.format(monday)}–${dtfShort.format(sunday)}`
}

function PitchDetail() {
  const { id } = useParams()
  const [pitch, setPitch] = useState(null)
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()))
  const [selectedSlots, setSelectedSlots] = useState(() => new Set()) // keys: `${isoDate}|${label}`

  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchPitch = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/pitches/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error('Kunne ikke hente baneinformasjon')
        const data = await res.json()
        setPitch(data)
      } catch (err) {
        console.error(err)
        alert('Feil ved henting av bane')
      }
    }
    fetchPitch()
  }, [id, token])

  const weekDays = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart])
  const timeSlots = useMemo(() => hoursRange(7, 22, 60), []) // juster step til 30 for halvtime

  // Ukenummer og visningsrange for aktiv uke
  const { week: isoWeek, isoYear } = useMemo(() => getISOWeek(weekStart), [weekStart])
  const rangeLabel = useMemo(() => weekRangeLabel(weekStart), [weekStart])

  const toggleSlot = (isoDate, label) => {
    const key = `${isoDate}|${label}`
    setSelectedSlots(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const isPast = (isoDate, label) => {
    // deaktiver booking i fortid
    const [h, m] = label.split(':').map(Number)
    const dt = new Date(`${isoDate}T${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:00`)
    return dt < new Date()
  }

  const goPrevWeek = () => setWeekStart(ws => addDays(ws, -7))
  const goNextWeek = () => setWeekStart(ws => addDays(ws, 7))
  const goThisWeek = () => setWeekStart(startOfWeek(new Date()))

  const handleSave = async () => {
    // Klargjort for backend (POST/PUT til /api/pitches/:id/availability)
    // Struktur eksempel:
    // [{ date: '2025-08-11', start: '07:00', end: '08:00' }, ...]
    // Her sender vi timeslots enkeltvis; på server kan du slå sammen sammenhengende perioder.
    const payload = Array.from(selectedSlots).map(key => {
      const [date, time] = key.split('|')
      return { date, start: time, end: time } // utvid gjerne til faktisk sluttid ved 30/60-min slots
    })

    try {
      const res = await fetch(`http://localhost:5000/api/pitches/${id}/availability`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ slots: payload }),
      })
      if (!res.ok) throw new Error('Kunne ikke lagre tilgjengelighet')
      alert('Tilgjengelighet lagret ✅')
    } catch (e) {
      console.error(e)
      alert('Feil ved lagring av tilgjengelighet')
    }
  }

  if (!pitch) return <p className="container mt-5">Laster baneinformasjon ...</p>

  return (
    <div className="container mt-5">
      <style>{`
        .schedule-wrapper {
          overflow: auto;
          border: 1px solid var(--bs-border-color, #dee2e6);
          border-radius: 0.75rem;
        }
        .schedule-table {
          border-collapse: separate;
          border-spacing: 0;
          width: 100%;
          min-width: 800px;
        }
        .schedule-th, .schedule-td, .schedule-time {
          border-bottom: 1px solid #e9ecef;
          border-right: 1px solid #e9ecef;
          padding: 10px;
          text-align: center;
          user-select: none;
        }
        .schedule-th {
          position: sticky;
          top: 0;
          background: #fff;
          z-index: 2;
          font-weight: 600;
        }
        .schedule-time {
          position: sticky;
          left: 0;
          background: #fff;
          font-weight: 500;
          text-align: right;
          min-width: 80px;
          z-index: 1;
        }
        .slot {
          cursor: pointer;
          transition: background-color 0.15s ease, box-shadow 0.15s ease;
        }
        .slot:hover {
          box-shadow: inset 0 0 0 2px rgba(13,110,253,.25);
        }
        .slot.selected {
          background: rgba(13,110,253,.15);
          box-shadow: inset 0 0 0 2px rgba(13,110,253,.5);
        }
        .slot.past {
          background: #f8f9fa;
          color: #adb5bd;
          cursor: not-allowed;
        }
        .schedule-head-date {
          font-size: .9rem;
          color: #6c757d;
        }
        .schedule-head-weekday {
          font-size: 1rem;
        }
      `}</style>

      <Link to="/owner/dashboard" className="btn btn-outline-secondary mb-3">
        ⬅ Tilbake til eierpanelet
      </Link>

      <h2 className="mb-1">{pitch.name}</h2>
      <div className="text-muted mb-3">
        <strong>Størrelse:</strong> {pitch.size} · <strong>Lokasjon:</strong> {pitch.location} ·{' '}
        <strong>Dekke:</strong> {pitch.surface || 'Ikke oppgitt'} ·{' '}
        <strong>Garderober:</strong> {pitch.hasLockerRoom ? 'Ja' : 'Nei'} ·{' '}
        <strong>Pris/time:</strong> {pitch.price ? `${pitch.price} kr` : 'Ikke satt'}
      </div>

      {pitch.image && (
        <img
          src={pitch.image}
          alt="Bilde av banen"
          className="img-fluid rounded mb-4"
          style={{ maxHeight: '300px', objectFit: 'cover' }}
        />
      )}

      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className="d-flex align-items-baseline gap-3">
          <h4 className="mb-0">📅 Tilgjengelighetsrutenett (ukevis)</h4>
          <span className="text-muted">
            Uke {isoWeek}, {isoYear} · {rangeLabel}
          </span>
        </div>
        <div className="btn-group">
          <button className="btn btn-outline-secondary" onClick={goPrevWeek}>← Forrige uke</button>
          <button className="btn btn-outline-secondary" onClick={goThisWeek}>I dag</button>
          <button className="btn btn-outline-secondary" onClick={goNextWeek}>Neste uke →</button>
        </div>
      </div>

      <div className="schedule-wrapper mb-3">
        <table className="schedule-table">
          <thead>
            <tr>
              <th className="schedule-th" style={{ left: 0, position: 'sticky', zIndex: 3 }}></th>
              {weekDays.map((d) => {
                const iso = toISODate(d)
                return (
                  <th key={iso} className="schedule-th">
                    <div className="schedule-head-weekday">{dtfWeekday.format(d)}</div>
                    <div className="schedule-head-date">{dtfDate.format(d)}</div>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map(({ label }) => (
              <tr key={label}>
                <td className="schedule-time">{label}</td>
                {weekDays.map((d) => {
                  const iso = toISODate(d)
                  const key = `${iso}|${label}`
                  const past = isPast(iso, label)
                  const selected = !past && selectedSlots.has(key)
                  const classNames = ['schedule-td', 'slot']
                  if (selected) classNames.push('selected')
                  if (past) classNames.push('past')

                  return (
                    <td
                      key={key}
                      className={classNames.join(' ')}
                      title={past ? 'Tidspunkt i fortid' : 'Klikk for å (av)velge'}
                      onClick={() => !past && toggleSlot(iso, label)}
                    />
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-primary" onClick={handleSave}>Lagre tilgjengelighet</button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => setSelectedSlots(new Set())}
        >
          Tøm valg
        </button>
      </div>

      <p className="text-muted mt-3">
        Tips: Endre tidsoppløsning ved å sette <code>hoursRange(7, 22, 30)</code> for 30‑minutters slots.
      </p>
    </div>
  )
}

export default PitchDetail





