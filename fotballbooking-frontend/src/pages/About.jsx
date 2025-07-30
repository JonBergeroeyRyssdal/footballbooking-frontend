import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1 className="display-5 fw-bold">Om FotballBooking</h1>
        <p className="lead text-muted">
          Den enkleste måten å leie og administrere fotballbaner i Norge.
        </p>
      </div>

      <div className="row mb-5">
        <div className="col-md-6">
          <h4>Hva er FotballBooking?</h4>
          <p>
            FotballBooking er en digital plattform som kobler fotballinteresserte leietakere med baneeiere.
            Vi gjør det enkelt å finne ledige baner og bestille tid – uansett hvor i landet du befinner deg.
          </p>
          <p>
            Enten du skal arrangere en vennskapskamp, en turnering eller bare vil spille med venner,
            finner du banene og tidspunktene som passer deg.
          </p>
        </div>
        <div className="col-md-6">
          <img
            src="https://images.unsplash.com/photo-1584466977771-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Fotballbane"
            className="img-fluid rounded shadow-sm"
          />
        </div>
      </div>

      <div className="mb-5">
        <h4>Hva tilbyr vi?</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">📍 Enkel oversikt over ledige baner i hele landet</li>
          <li className="list-group-item">⏱ Filtrering på sted, tid og banestørrelse</li>
          <li className="list-group-item">🛠 Administrasjonspanel for baneeiere</li>
          <li className="list-group-item">🔒 Sikker og rask booking</li>
        </ul>
      </div>

      <div className="bg-light p-4 rounded text-center">
        <h5 className="fw-bold">Har du spørsmål?</h5>
        <p>
          Besøk <Link to="/contact">kontaktsiden</Link> eller send oss en e-post på{' '}
          <a href="mailto:support@fotballbooking.no">support@fotballbooking.no</a>.
        </p>
      </div>
    </div>
  )
}

export default About



