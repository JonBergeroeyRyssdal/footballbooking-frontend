function ContactUs() {
  return (
    <div className="container mt-4">
      <h2>Kontakt oss</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Navn</label>
          <input type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">E-post</label>
          <input type="email" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Melding</label>
          <textarea className="form-control" rows="4"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
    </div>
  )
}

export default ContactUs