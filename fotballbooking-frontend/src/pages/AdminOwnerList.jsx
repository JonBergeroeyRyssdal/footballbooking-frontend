import { useEffect, useState } from "react";
import axios from "axios";

function AdminOwnerList() {
  const [owners, setOwners] = useState([]);
  const [expandedOwnerId, setExpandedOwnerId] = useState(null);
  const [ownerPitches, setOwnerPitches] = useState({});

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/admin/owners", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOwners(res.data);
      } catch (err) {
        console.error("Feil ved henting av eiere:", err);
      }
    };

    fetchOwners();
  }, []);

  const toggleOwnerPitches = async (ownerId) => {
    if (expandedOwnerId === ownerId) {
      setExpandedOwnerId(null);
    } else {
      if (!ownerPitches[ownerId]) {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(
            `http://localhost:5000/api/admin/owners/${ownerId}/pitches`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setOwnerPitches((prev) => ({ ...prev, [ownerId]: res.data }));
        } catch (err) {
          console.error("Feil ved henting av baner:", err);
        }
      }
      setExpandedOwnerId(ownerId);
    }
  };

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
          {owners.map((o) => (
            <>
              <tr
                key={o.owner_id}
                onClick={() => toggleOwnerPitches(o.owner_id)}
                style={{ cursor: "pointer" }}
              >
                <td>{o.owner_id}</td>
                <td>{o.name}</td>
                <td>{o.email}</td>
                <td>{o.phone}</td>
              </tr>
              {expandedOwnerId === o.owner_id && (
                <tr key={`pitches-${o.owner_id}`}>
                  <td colSpan="4">
                    {ownerPitches[o.owner_id]?.length > 0 ? (
                      <ul>
                        {ownerPitches[o.owner_id].map((p) => (
                          <li key={p.id}>
                            <strong>{p.name}</strong> – {p.size}, {p.location}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <em>Ingen baner registrert</em>
                    )}
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOwnerList;
