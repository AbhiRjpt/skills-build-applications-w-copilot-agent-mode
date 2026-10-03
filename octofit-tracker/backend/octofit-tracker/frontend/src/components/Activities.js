
import { useEffect, useState } from 'react';
import { getApiCollection, getApiUrl } from '../api';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    let isCurrent = true;
    const endpoint = getApiUrl('activities');
    console.log('Fetching activities from:', endpoint);

    async function loadActivities() {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched activities:', data);
        if (isCurrent) setActivities(getApiCollection(data));
      } catch (error) {
        console.error('Failed to fetch activities:', error);
      }
    }

    loadActivities();
    return () => { isCurrent = false; };
  }, []);
  return (
    <section className="card data-card mb-4">
      <div className="card-header">
        <h2 className="card-title h4">Activities</h2>
        <span className="badge rounded-pill data-count">{activities.length} total</span>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle data-table mb-0" aria-label="Activities">
            <thead className="table-light">
              <tr>
                <th scope="col">Type</th>
                <th scope="col">Duration (min)</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 && <tr><td className="data-empty text-center py-4" colSpan="3">No activity data yet.</td></tr>}
              {activities.map((a, i) => (
                <tr key={i}>
                  <td>{a.type}</td>
                  <td>{a.duration}</td>
                  <td>{a.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
export default Activities;
