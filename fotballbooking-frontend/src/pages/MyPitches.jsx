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
    <div className="container mt-4">
      <h2>Mine baner</h2>
      {fakePitches.map(pitch => (
        <div key={pitch.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{pitch.name}</h5>
            <p className="card-text">
              Størrelse: {pitch.size} <br />
              Lokasjon: {pitch.location}
            </p>
            <Link to={`/owner/mypitches/${pitch.id}`} className="btn btn-primary">Se detaljer</Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyPitches
