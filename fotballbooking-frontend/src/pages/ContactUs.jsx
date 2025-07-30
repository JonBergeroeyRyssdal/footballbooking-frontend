function ContactUs() {
  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="mb-4 text-center fw-bold">Kontakt oss</h2>
              <p className="text-muted text-center mb-4">
                Har du spørsmål, forslag eller ønsker samarbeid? Vi hører gjerne fra deg!
              </p>

              <form>
                <div className="mb-3">
                  <label className="form-label">Navn</label>
                  <input type="text" className="form-control" placeholder="F.eks. Ola Nordmann" />
                </div>

                <div className="mb-3">
                  <label className="form-label">E-post</label>
                  <input type="email" className="form-control" placeholder="din@email.no" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Melding</label>
                  <textarea className="form-control" rows="5" placeholder="Skriv meldingen din her..."></textarea>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Send melding
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="text-center mt-4">
            <small className="text-muted">
              Eller send en e-post direkte til:{" "}
              <a href="mailto:support@fotballbooking.no">support@fotballbooking.no</a>
            </small>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
