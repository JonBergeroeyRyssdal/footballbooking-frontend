import { useParams, Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'

/** ---------- helpers for dates/times ---------- */
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
/** Viktig: ikke bruk toISOString() (UTC). Bygg lokal YYYY-MM-DD. */
function toISODate(date) {
  const d = new Date(date)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const da = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${da}`
}
function pad2(n) { return String(n).padStart(2, '0') }

/** Generer tids-slots mellom [startHour, endHour) med step i minutter */
function hoursRange(startHour = 7, endHour = 22, stepMins = 60) {
  const slots = []
  for (let mins = startHour * 60; mins < endHour * 60; mins += stepMins) {
    const h = Math.floor(mins / 60)
    const m = mins % 60
    slots.push({ label: `${pad2(h)}:${pad2(m)}`, minutesOfDay: mins })
  }
  return slots
}

/** ISO uke */
function getISOWeek(d) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  const dayNum = (date.getUTCDay() + 6) % 7 // 0=man
  date.setUTCDate(date.getUTCDate() - dayNum + 3) // torsdag
  const firstThursday = new Date(Date.UTC(date.getUTCFullYear(), 0, 4))
  const firstDayNum = (firstThursday.getUTCDay() + 6) % 7
  firstThursday.setUTCDate(firstThursday.getUTCDate() - firstDayNum + 3)
  const weekNo = 1 + Math.round((date - firstThursday) / (7 * 24 * 3600 * 1000))
  const isoYear = date.getUTCFullYear()
  return { week: weekNo, isoYear }
}
const dtfWeekday = new Intl.DateTimeFormat('nb-NO', { weekday: 'short' })
const dtfDate = new Intl.DateTimeFormat('nb-NO', { day: '2-digit', month: '2-digit' })
const dtfShort = new Intl.DateTimeFormat('nb-NO', { day: '2-digit', month: '2-digit' })
function weekRangeLabel(weekStart) {
  const monday = new Date(weekStart)
  const sunday = new Date(weekStart); sunday.setDate(sunday.getDate() + 6)
  return `${dtfShort.format(monday)}–${dtfShort.format(sunday)}`
}

/** Robust parsing av datetime fra backend som lokal tid (unngå Z/UTC-problemer) */
function parseLocalDateTime(str) {
  // aksepter både 'YYYY-MM-DD HH:MM:SS' og 'YYYY-MM-DDTHH:MM:SS(.sss)?Z?'
  const s = str.replace('T', ' ').replace('Z', '')
  const [datePart, timePart = '00:00:00'] = s.split(' ')
  const [Y, M, D] = datePart.split('-').map(Number)
  const [h = '0', m = '0', sec = '0'] = timePart.split(':').map(Number)
  return new Date(Y, (M - 1), D, Number(h), Number(m), Number(sec) || 0, 0) // lokal tid
}

/** Slå sammen sammenhengende slots per dato til intervaller */
function mergeContiguousSlotsByDate(keys, stepMins) {
  // keys som 'YYYY-MM-DD|HH:MM'
  const byDate = new Map()
  for (const k of keys) {
    const [d, t] = k.split('|')
    if (!byDate.has(d)) byDate.set(d, [])
    byDate.get(d).push(t)
  }
  const intervals = []
  for (const [date, times] of byDate.entries()) {
    // sorter på tid
    const toMinutes = (hhmm) => {
      const [h, m] = hhmm.split(':').map(Number)
      return h * 60 + m
    }
    times.sort((a, b) => toMinutes(a) - toMinutes(b))
    let start = times[0]
    let prev = times[0]
    for (let i = 1; i < times.length; i++) {
      const cur = times[i]
      if (toMinutes(cur) !== toMinutes(prev) + stepMins) {
        // end interval ved prev + step
        const [ph, pm] = prev.split(':').map(Number)
        const endMinutes = ph * 60 + pm + stepMins
        const endHH = pad2(Math.floor(endMinutes / 60))
        const endMM = pad2(endMinutes % 60)
        intervals.push({ date, start: start, end: `${endHH}:${endMM}` })
        start = cur
      }
      prev = cur
    }
    // siste intervall
    const [ph, pm] = prev.split(':').map(Number)
    const endMinutes = ph * 60 + pm + stepMins
    const endHH = pad2(Math.floor(endMinutes / 60))
    const endMM = pad2(endMinutes % 60)
    intervals.push({ date, start: start, end: `${endHH}:${endMM}` })
  }
  return intervals
}

/** Lag sett med slot-keys ('YYYY-MM-DD|HH:MM') fra recurring/single availability for valgt uke */
function computeExistingSlotKeysForWeek({ weekStart, stepMins, recurring, single }) {
  const keys = new Set()
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))
  const timeToKeys = (dateISO, startHHMM, endHHMM) => {
    const [sh, sm] = startHHMM.split(':').map(Number)
    const [eh, em] = endHHMM.split(':').map(Number)
    const startM = sh * 60 + sm
    const endM = eh * 60 + em
    for (let m = startM; m < endM; m += stepMins) {
      const hh = pad2(Math.floor(m / 60))
      const mm = pad2(m % 60)
      keys.add(`${dateISO}|${hh}:${mm}`)
    }
  }

  // recurring: weekday 0= søn .. 6= lør i DB-oppsettet vårt
  // Vi bruker getDay(): 1=man..6=lør, 0=søn -> map til 0=søn..6=lør
  const mapJsToDbWeekday = (jsDay) => (jsDay === 0 ? 0 : jsDay + 0) // js 0=søn -> 0, 1=man->1 osv.

  for (const d of weekDays) {
    const iso = toISODate(d)
    const jsDay = d.getDay() // 0-6
    const dbWd = mapJsToDbWeekday(jsDay)

    for (const r of recurring || []) {
      // r.weekday: 0=søn..6=lør, og sjekk effective_from/to inkl. null
      const inWindow =
        r.weekday === dbWd &&
        (!r.effective_from || iso >= r.effective_from) &&
        (!r.effective_to || iso <= r.effective_to)

      if (inWindow) timeToKeys(iso, r.start_time.slice(0,5), r.end_time.slice(0,5))
    }
  }

  for (const s of (single || [])) {
    const sDate = parseLocalDateTime(s.start_datetime)
    const eDate = parseLocalDateTime(s.end_datetime)
    for (const d of weekDays) {
      const iso = toISODate(d)
      if (iso === toISODate(sDate)) {
        timeToKeys(iso,
          `${pad2(sDate.getHours())}:${pad2(sDate.getMinutes())}`,
          `${pad2(eDate.getHours())}:${pad2(eDate.getMinutes())}`
        )
      }
    }
  }

  return keys
}

function PitchDetail() {
  const { id } = useParams()
  const token = localStorage.getItem('token')

  // UI state
  const [pitch, setPitch] = useState(null)
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()))
  const [stepMins, setStepMins] = useState(60) // 30 eller 60
  const [selectedSlots, setSelectedSlots] = useState(() => new Set())  // brukerens pågående endringer
  const [existingSlots, setExistingSlots] = useState(() => new Set())  // allerede i DB for valgt uke
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // fetch pitch + availability
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // 1) pitch
        const pr = await fetch(`http://localhost:5000/api/pitches/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!pr.ok) throw new Error('Kunne ikke hente bane')
        const pitchData = await pr.json()
        setPitch(pitchData)

        // 2) availability
        const ar = await fetch(`http://localhost:5000/api/availability/${id}`)
        if (!ar.ok) throw new Error('Kunne ikke hente tilgjengelighet')
        const avail = await ar.json() // {recurring, single, blackouts}

        // bygg existingSlots for uke
        const ex = computeExistingSlotKeysForWeek({
          weekStart,
          stepMins,
          recurring: avail.recurring,
          single: avail.single
        })

        setExistingSlots(ex)
        setSelectedSlots(new Set(ex)) // start med eksisterende som valgt
      } catch (e) {
        console.error(e)
        alert('Feil ved henting av bane/tilgjengelighet')
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token, weekStart, stepMins])

  const weekDays = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart])
  const timeSlots = useMemo(() => hoursRange(7, 22, stepMins), [stepMins])
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
    const [h, m] = label.split(':').map(Number)
    const dt = new Date(`${isoDate}T${pad2(h)}:${pad2(m)}:00`)
    return dt < new Date()
  }

  const goPrevWeek = () => setWeekStart(ws => addDays(ws, -7))
  const goNextWeek = () => setWeekStart(ws => addDays(ws, 7))
  const goThisWeek = () => setWeekStart(startOfWeek(new Date()))

  const handleResetToExisting = () => setSelectedSlots(new Set(existingSlots))
  const handleClear = () => setSelectedSlots(new Set())

  const handleSave = async () => {
    // Vi sender KUN nye slots = valgt - eksisterende
    const additions = [...selectedSlots].filter(k => !existingSlots.has(k))
    if (additions.length === 0) {
      alert('Ingen nye tider å lagre.')
      return
    }

    // slå sammen til intervaller per dato
    const intervals = mergeContiguousSlotsByDate(additions, stepMins)

    setSaving(true)
    try {
      // POST som enkeltøkter
      // /api/availability/:pitchId/oneoff { startDatetime, endDatetime }
      const reqs = intervals.map(iv => {
        const startDatetime = `${iv.date} ${iv.start}:00`
        const endDatetime   = `${iv.date} ${iv.end}:00`
        return fetch(`http://localhost:5000/api/availability/${id}/oneoff`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ startDatetime, endDatetime }),
        })
      })
      const results = await Promise.all(reqs)
      if (results.some(r => !r.ok)) {
        throw new Error('En eller flere forespørsler feilet')
      }
      alert('Tilgjengelighet lagret ✅')
      // etter lagring: refetch uke
      setWeekStart(ws => new Date(ws)) // trigger effect pga avhengigheter
    } catch (e) {
      console.error(e)
      alert('Feil ved lagring av tilgjengelighet')
    } finally {
      setSaving(false)
    }
  }

  if (loading || !pitch) return <p className="container mt-5">Laster bane og tilgjengelighet …</p>

  return (
    <div className="container mt-5">
      <style>{`
        .schedule-wrapper {
          overflow: auto;
          border: 1px solid var(--bs-border-color, #dee2e6);
          border-radius: 0.75rem;
        }
        .schedule-table { border-collapse: separate; border-spacing: 0; width: 100%; min-width: 860px; }
        .schedule-th, .schedule-td, .schedule-time {
          border-bottom: 1px solid #e9ecef;
          border-right: 1px solid #e9ecef;
          padding: 10px;
          text-align: center;
          user-select: none;
        }
        .schedule-th { position: sticky; top: 0; background: #fff; z-index: 2; font-weight: 600; }
        .schedule-time { position: sticky; left: 0; background: #fff; font-weight: 500; text-align: right; min-width: 80px; z-index: 1; }
        .slot { cursor: pointer; transition: background-color .15s ease, box-shadow .15s ease; }
        .slot:hover { box-shadow: inset 0 0 0 2px rgba(13,110,253,.25); }
        .slot.selected { background: rgba(13,110,253,.15); box-shadow: inset 0 0 0 2px rgba(13,110,253,.5); }
        .slot.existing { background: rgba(25,135,84,.15); box-shadow: inset 0 0 0 2px rgba(25,135,84,.5); } /* grønn */
        .slot.past { background: #f8f9fa; color: #adb5bd; cursor: not-allowed; }
        .schedule-head-date { font-size: .9rem; color: #6c757d; }
        .schedule-head-weekday { font-size: 1rem; text-transform: capitalize; }
      `}</style>

      <Link to="/owner/dashboard" className="btn btn-outline-secondary mb-3">⬅ Tilbake til eierpanelet</Link>

      <h2 className="mb-1">{pitch.name}</h2>
      <div className="text-muted mb-3">
        <strong>Størrelse:</strong> {pitch.size} · <strong>Lokasjon:</strong> {pitch.location} ·{' '}
        <strong>Dekke:</strong> {pitch.surface || 'Ikke oppgitt'} ·{' '}
        <strong>Garderober:</strong> {pitch.hasLockerRoom ? 'Ja' : 'Nei'} ·{' '}
        <strong>Pris/time:</strong> {pitch.price ? `${pitch.price} kr` : 'Ikke satt'}
      </div>
      {pitch.image && (
        <img src={pitch.image} alt="Bilde av banen" className="img-fluid rounded mb-4"
             style={{ maxHeight: '300px', objectFit: 'cover' }} />
      )}

      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className="d-flex align-items-baseline gap-3">
          <h4 className="mb-0">📅 Tilgjengelighetsrutenett (ukevis)</h4>
          <span className="text-muted">Uke {isoWeek}, {isoYear} · {rangeLabel}</span>
        </div>
        <div className="d-flex gap-2">
          <div className="btn-group me-2">
            <button className="btn btn-outline-secondary" onClick={goPrevWeek}>← Forrige uke</button>
            <button className="btn btn-outline-secondary" onClick={goThisWeek}>I dag</button>
            <button className="btn btn-outline-secondary" onClick={goNextWeek}>Neste uke →</button>
          </div>
          <div className="input-group" style={{ width: 180 }}>
            <label className="input-group-text">Slot</label>
            <select
              className="form-select"
              value={stepMins}
              onChange={e => setStepMins(Number(e.target.value))}
            >
              <option value={60}>60 min</option>
              <option value={30}>30 min</option>
            </select>
          </div>
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
                  const existed = existingSlots.has(key)
                  const classNames = ['schedule-td', 'slot']
                  if (selected) classNames.push('selected')
                  if (existed) classNames.push('existing')
                  if (past) classNames.push('past')

                  return (
                    <td
                      key={key}
                      className={classNames.join(' ')}
                      title={past ? 'Tidspunkt i fortid' : existed ? 'Eksisterende tilgjengelighet' : 'Klikk for å (av)velge'}
                      onClick={() => !past && toggleSlot(iso, label)}
                    />
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex flex-wrap gap-2">
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Lagrer…' : 'Lagre nye tidsluker (enkeltøkter)'}
        </button>
        <button className="btn btn-outline-secondary" onClick={handleResetToExisting}>
          Tilbakestill til eksisterende
        </button>
        <button className="btn btn-outline-secondary" onClick={handleClear}>
          Tøm valg
        </button>
      </div>

      <p className="text-muted mt-3">
        Grønne ruter = allerede lagret tilgjengelighet. Blå ruter = nye valg som vil lagres som enkeltøkter for valgt uke.
        (Sletting av tider krever egne DELETE‑endepunkter – si ifra når du vil ha det.)
      </p>
    </div>
  )
}

export default PitchDetail







