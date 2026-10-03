
import { useEffect, useState } from 'react';
import { getApiCollection, getApiUrl } from '../api';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    let isCurrent = true;
    const endpoint = getApiUrl('leaderboard');
    console.log('Fetching leaderboard from:', endpoint);

    async function loadLeaderboard() {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched leaderboard:', data);
        if (isCurrent) setEntries(getApiCollection(data));
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      }
    }

    loadLeaderboard();
    return () => { isCurrent = false; };
  }, []);
  return (
    <section className="card data-card mb-4">
      <div className="card-header">
        <h2 className="card-title h4">Leaderboard</h2>
        <span className="badge rounded-pill data-count">{entries.length} total</span>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle data-table mb-0" aria-label="Leaderboard">
            <thead className="table-light">
              <tr>
                <th scope="col">User</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 && <tr><td className="data-empty text-center py-4" colSpan="2">No leaderboard entries yet.</td></tr>}
              {entries.map((e, i) => (
                <tr key={i}>
                  <td>{e.user?.name || e.user}</td>
                  <td>{e.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
export default Leaderboard;
