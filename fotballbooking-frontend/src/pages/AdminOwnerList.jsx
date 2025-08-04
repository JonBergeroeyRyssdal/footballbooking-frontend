// src/pages/AdminOwnerList.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'

function AdminOwnerList() {
  const [owners, setOwners] = useState([])

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const token = localStorage.getItem('token') // Hent JWT-token
        const res = await axios.get('http://localhost:5000/api/admin/owners', {
          headers: {
            Authorization: `Bearer ${token}`, // Legg til token i header
          },
        })
        setOwners(res.data)
      } catch (err) {
        console.error('Feil ved henting av eiere:', err)
      }
    }

    fetchOwners()
  }, [])

  return (
    <div className="container mt-5">
      <h2>Alle eiendomseiere</h2>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Navn</th>
            <th>E-post</th>
            <th>Telefon</th>
          </tr>
        </thead>
        <tbody>
          {owners.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.name}</td>
              <td>{o.email}</td>
              <td>{o.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminOwnerList

