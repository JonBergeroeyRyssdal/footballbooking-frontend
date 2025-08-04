import { Link } from 'react-router-dom'

const fakePitches = [
  {
    id: 101,
    name: 'Majorstua Kunstgress',
    size: '11er',
    location: 'Oslo',
  },
  {
    id: 102,
    name: 'Bergen Bane 3',
    size: '7er',
    location: 'Bergen',
  },
  {
    id: 103,
    name: 'Sandnes Mini',
    size: '5er',
    location: 'Sandnes',
  }
]

function MyPitches() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">📋 Mine baner</h2>

      <div className="row g-4">
        {fakePitches.map(pitch => (
          <div key={pitch.id} className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{pitch.name}</h5>
                  <p className="card-text">
                    <strong>Størrelse:</strong> {pitch.size}<br />
                    <strong>Lokasjon:</strong> {pitch.location}
                  </p>
                </div>
                <div className="mt-3">
                  <Link
                    to={`/owner/mypitches/${pitch.id}`}
                    className="btn btn-outline-primary w-100"
                  >
                    🔍 Se detaljer
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyPitches

