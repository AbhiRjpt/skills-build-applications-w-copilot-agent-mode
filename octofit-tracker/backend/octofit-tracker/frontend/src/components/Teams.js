
import { useEffect, useState } from 'react';
import { getApiCollection, getApiUrl } from '../api';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    let isCurrent = true;
    const endpoint = getApiUrl('teams');
    console.log('Fetching teams from:', endpoint);

    async function loadTeams() {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched teams:', data);
        if (isCurrent) setTeams(getApiCollection(data));
      } catch (error) {
        console.error('Failed to fetch teams:', error);
      }
    }

    loadTeams();
    return () => { isCurrent = false; };
  }, []);
  return (
    <section className="card data-card mb-4">
      <div className="card-header">
        <h2 className="card-title h4">Teams</h2>
        <span className="badge rounded-pill data-count">{teams.length} total</span>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle data-table mb-0" aria-label="Teams">
            <thead className="table-light">
              <tr>
                <th scope="col">Name</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 && <tr><td className="data-empty text-center py-4">No teams yet.</td></tr>}
              {teams.map((t, i) => (
                <tr key={i}>
                  <td>{t.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
export default Teams;
