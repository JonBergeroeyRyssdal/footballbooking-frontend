// src/pages/Pitches/Pitch.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

/**
 * Public Pitch page (for users & guests)
 * - Shows pitch details
 * - Month calendar with availability
 * - Click an available slot -> if logged in => /booking/:id?date=YYYY-MM-DD&time=HH:mm
 *                              else => /login (with returnTo)
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function daysInMonth(year, monthIndex) {
  // monthIndex: 0-11
  return new Date(year, monthIndex + 1, 0).getDate();
}

function pad(n) {
  return n.toString().padStart(2, "0");
}

function formatDateISO(d) {
  const y = d.getFullYear();
  const m = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  return `${y}-${m}-${day}`;
}

function monthKey(dateObj) {
  return `${dateObj.getFullYear()}-${pad(dateObj.getMonth() + 1)}`;
}

export default function Pitch() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pitch, setPitch] = useState(null);
  const [loadingPitch, setLoadingPitch] = useState(true);
  const [errorPitch, setErrorPitch] = useState("");

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  const [availability, setAvailability] = useState({}); // { 'YYYY-MM-DD': ['09:00','10:00'] }
  const [loadingAvail, setLoadingAvail] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const y = currentMonth.getFullYear();
  const m = currentMonth.getMonth(); // 0-11
  const firstDayOfMonth = new Date(y, m, 1);
  const startWeekday = firstDayOfMonth.getDay(); // 0=Sun, 1=Mon...
  // Make Monday=0 for EU style:
  const offset = (startWeekday + 6) % 7;
  const totalDays = daysInMonth(y, m);

  // Build grid cells: leading blanks + month days
  const cells = useMemo(() => {
    const arr = [];
    for (let i = 0; i < offset; i++) arr.push({ type: "blank", key: `b${i}` });
    for (let d = 1; d <= totalDays; d++) {
      const dateObj = new Date(y, m, d);
      const iso = formatDateISO(dateObj);
      arr.push({ type: "day", key: iso, day: d, iso });
    }
    // Fill trailing to full weeks (42 cells -> 6 rows)
    while (arr.length % 7 !== 0) {
      arr.push({ type: "blank", key: `t${arr.length}` });
    }
    return arr;
  }, [offset, totalDays, y, m]);

  // Fetch pitch
  useEffect(() => {
    let mounted = true;
    setLoadingPitch(true);
    setErrorPitch("");
    axios
      .get(`${API_BASE}/api/pitches/${id}`)
      .then((res) => {
        if (!mounted) return;
        setPitch(res.data);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error(err);
        setErrorPitch("Kunne ikke hente baneinformasjon.");
      })
      .finally(() => mounted && setLoadingPitch(false));
    return () => (mounted = false);
  }, [id]);

  // Fetch availability for visible month
  useEffect(() => {
    let mounted = true;
    const q = `${y}-${pad(m + 1)}`;
    setLoadingAvail(true);
    axios
      .get(`${API_BASE}/api/pitches/${id}/availability`, {
        params: { month: q },
      })
      .then((res) => {
        if (!mounted) return;
        // Expecting: [{ date: 'YYYY-MM-DD', slots: ['09:00','10:00', ...] }, ...]
        const map = {};
        (res.data || []).forEach((d) => {
          map[d.date] = d.slots || [];
        });
        setAvailability(map);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error(err);
        // Fallback demo data if API not ready (comment out if not desired)
        const demo = {};
        const todayISO = formatDateISO(new Date());
        demo[todayISO] = ["10:00", "11:00", "18:00"];
        setAvailability(demo);
      })
      .finally(() => mounted && setLoadingAvail(false));
    return () => (mounted = false);
  }, [id, y, m]);

  function prevMonth() {
    const d = new Date(currentMonth);
    d.setMonth(d.getMonth() - 1);
    setCurrentMonth(d);
    setSelectedDate(null);
  }

  function nextMonth() {
    const d = new Date(currentMonth);
    d.setMonth(d.getMonth() + 1);
    setCurrentMonth(d);
    setSelectedDate(null);
  }

  function handleSelectDate(iso) {
    setSelectedDate(iso);
  }

  function handleSelectSlot(time) {
    const token = localStorage.getItem("token");
    const returnTo = `/booking/${id}?date=${selectedDate}&time=${encodeURIComponent(
      time
    )}`;

    if (!token) {
      // Send to login and then back
      navigate("/login", { state: { returnTo } });
    } else {
      navigate(returnTo);
    }
  }

  return (
    <div className="container my-5">
      {/* Top breadcrumbs */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Hjem</Link></li>
          <li className="breadcrumb-item"><Link to="/pitches">Baner</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Detaljer</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <h2 className="mb-0">⚽ Baneinformasjon</h2>
        {pitch?.name && <span className="badge text-bg-secondary">{pitch.name}</span>}
      </div>

      {/* Content */}
      {loadingPitch ? (
        <div className="alert alert-info">Laster baneinformasjon…</div>
      ) : errorPitch ? (
        <div className="alert alert-danger">{errorPitch}</div>
      ) : pitch ? (
        <div className="row g-4">
          {/* Left: main card */}
          <div className="col-lg-7">
            <div className="card shadow-sm">
              {pitch.imageUrl && (
                <img
                  src={pitch.imageUrl}
                  className="card-img-top"
                  alt={pitch.name}
                  style={{ objectFit: "cover", maxHeight: 360 }}
                />
              )}
              <div className="card-body">
                <h4 className="card-title mb-2">{pitch.name}</h4>
                <p className="text-muted mb-3">{pitch.location}</p>

                <div className="row g-3">
                  <div className="col-6">
                    <div className="border rounded p-3 h-100">
                      <div className="small text-muted">Størrelse</div>
                      <div className="fw-semibold">{pitch.size || "—"}</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="border rounded p-3 h-100">
                      <div className="small text-muted">Pris pr. time</div>
                      <div className="fw-semibold">
                        {typeof pitch.pricePerHour === "number"
                          ? `${pitch.pricePerHour} NOK`
                          : pitch.pricePerHour || "—"}
                      </div>
                    </div>
                  </div>
                </div>

                {pitch.features?.length ? (
                  <div className="mt-3">
                    <div className="small text-muted mb-1">Fasiliteter</div>
                    <div className="d-flex flex-wrap gap-2">
                      {pitch.features.map((f) => (
                        <span key={f} className="badge text-bg-light border">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {pitch.description && (
                  <div className="mt-3">
                    <div className="small text-muted mb-1">Beskrivelse</div>
                    <p className="mb-0">{pitch.description}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Info box for guests */}
            <div className="alert alert-secondary mt-3">
              Du kan se tilgjengelige tider nedenfor. For å booke må du være innlogget.
              <Link to="/register" className="ms-1">Opprett konto</Link> eller{" "}
              <Link to="/login">logg inn</Link>.
            </div>
          </div>

          {/* Right: calendar & booking */}
          <div className="col-lg-5">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <button className="btn btn-outline-secondary btn-sm" onClick={prevMonth}>
                    ← Forrige
                  </button>
                  <div className="fw-semibold">
                    {currentMonth.toLocaleString("no-NO", {
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <button className="btn btn-outline-secondary btn-sm" onClick={nextMonth}>
                    Neste →
                  </button>
                </div>

                {loadingAvail ? (
                  <div className="alert alert-info py-2">Laster tilgjengelighet…</div>
                ) : null}

                {/* Weekday header (Mon-Sun) */}
                <div className="row row-cols-7 g-1 mb-1 text-center small text-muted">
                  {["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"].map((w) => (
                    <div key={w} className="col">{w}</div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="row row-cols-7 g-1 text-center">
                  {cells.map((c) =>
                    c.type === "blank" ? (
                      <div key={c.key} className="col">
                        <div className="border rounded py-3 opacity-0">.</div>
                      </div>
                    ) : (
                      <div key={c.key} className="col">
                        <button
                          className={`btn w-100 border rounded py-3 position-relative ${
                            selectedDate === c.iso ? "btn-primary text-white" : "bg-white"
                          }`}
                          onClick={() => handleSelectDate(c.iso)}
                          disabled={!availability[c.iso] || availability[c.iso].length === 0}
                          title={
                            availability[c.iso]?.length
                              ? `${availability[c.iso].length} ledige tider`
                              : "Ingen ledige tider"
                          }
                        >
                          <div className="fw-semibold">{c.day}</div>
                          <div className="position-absolute bottom-0 start-50 translate-middle-x mb-1">
                            {availability[c.iso]?.length ? (
                              <span className="badge text-bg-success">
                                {availability[c.iso].length}
                              </span>
                            ) : (
                              <span className="badge text-bg-light">0</span>
                            )}
                          </div>
                        </button>
                      </div>
                    )
                  )}
                </div>

                {/* Slots panel */}
                <div className="mt-3">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="small text-muted">
                      {selectedDate
                        ? `Ledige tider ${new Date(selectedDate).toLocaleDateString("no-NO")}`
                        : "Velg en dag for å se ledige tider"}
                    </div>
                    {selectedDate && (
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setSelectedDate(null)}
                      >
                        Fjern valg
                      </button>
                    )}
                  </div>

                  {selectedDate && availability[selectedDate]?.length ? (
                    <div className="d-flex flex-wrap gap-2">
                      {availability[selectedDate].map((t) => (
                        <button
                          key={t}
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => handleSelectSlot(t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  ) : selectedDate ? (
                    <div className="alert alert-light border py-2 mb-0">
                      Ingen ledige tider denne dagen.
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="d-grid gap-2 mt-3">
              <Link to="/pitches" className="btn btn-outline-secondary">← Tilbake til alle baner</Link>
              {pitch?.ownerName && (
                <div className="text-center small text-muted">
                  Driftet av <span className="fw-semibold">{pitch.ownerName}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning">Fant ingen bane.</div>
      )}
    </div>
  );
}
