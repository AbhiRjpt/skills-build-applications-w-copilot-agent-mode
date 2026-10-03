
import { useEffect, useState } from 'react';
import { getApiCollection, getApiUrl } from '../api';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    let isCurrent = true;
    const endpoint = getApiUrl('workouts');
    console.log('Fetching workouts from:', endpoint);

    async function loadWorkouts() {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched workouts:', data);
        if (isCurrent) setWorkouts(getApiCollection(data));
      } catch (error) {
        console.error('Failed to fetch workouts:', error);
      }
    }

    loadWorkouts();
    return () => { isCurrent = false; };
  }, []);
  return (
    <section className="card data-card mb-4">
      <div className="card-header">
        <h2 className="card-title h4">Workouts</h2>
        <span className="badge rounded-pill data-count">{workouts.length} total</span>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle data-table mb-0" aria-label="Workouts">
            <thead className="table-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {workouts.length === 0 && <tr><td className="data-empty text-center py-4" colSpan="2">No workouts yet.</td></tr>}
              {workouts.map((w, i) => (
                <tr key={i}>
                  <td>{w.name}</td>
                  <td>{w.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
export default Workouts;
