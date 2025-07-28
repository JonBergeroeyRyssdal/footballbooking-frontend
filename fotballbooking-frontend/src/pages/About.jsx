import { useState } from 'react'

function About() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    // Her kan du senere sende data til backend
    console.log({ name, email, message })
  }

  return (
    <div className="container mt-4">
      <h2>Om FotballBooking</h2>
      <p>
        FotballBooking er en tjeneste som gjør det enkelt å finne og leie fotballbaner over hele Norge.
        Vi kobler leietakere med baneeiere og tilbyr et brukervennlig system for reservasjoner og administrasjon.
      </p>
      <p>
        Enten du organiserer en vennskapskamp, turnering eller bare ønsker å sparke ball med venner,
        hjelper vi deg å finne riktig bane – til riktig tid og sted.
      </p>

      <h4>Hva tilbyr vi?</h4>
      <ul>
        <li>Oversikt over tilgjengelige baner i hele landet</li>
        <li>Filtrering på sted, tid og banestørrelse</li>
        <li>Enkel administrasjon for baneeiere</li>
        <li>Rask og sikker booking</li>
      </ul>

      <p>
        Vår visjon er å gjøre fotball tilgjengelig for alle – når du vil, hvor du vil.
      </p>

      <p className="text-muted">Du kan også kontakte oss på <a href="mailto:support@fotballbooking.no">support@fotballbooking.no</a></p>

      <hr />

      <h4>Kontaktskjema</h4>

      {submitted ? (
        <div className="alert alert-success">Takk for meldingen! Vi svarer så snart vi kan.</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Navn</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">E-post</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Melding</label>
            <textarea
              className="form-control"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Send melding</button>
        </form>
      )}
    </div>
  )
}

export default About

