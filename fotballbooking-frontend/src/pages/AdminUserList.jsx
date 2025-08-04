// src/pages/AdminUserList.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'

function AdminUserList() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token') // Hent JWT-token
        const res = await axios.get('http://localhost:5000/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`, // Legg til i header
          },
        })
        setUsers(res.data)
      } catch (err) {
        console.error('Feil ved henting av brukere:', err)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="container mt-5">
      <h2>Alle brukere</h2>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Navn</th>
            <th>E-post</th>
            <th>Telefon</th>
            <th>Rolle</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminUserList

