
import { useEffect, useState } from 'react';
import { getApiCollection, getApiUrl } from '../api';

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    let isCurrent = true;
    const endpoint = getApiUrl('users');
    console.log('Fetching users from:', endpoint);

    async function loadUsers() {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched users:', data);
        if (isCurrent) setUsers(getApiCollection(data));
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    }

    loadUsers();
    return () => { isCurrent = false; };
  }, []);
  return (
    <section className="card data-card mb-4">
      <div className="card-header">
        <h2 className="card-title h4">Users</h2>
        <span className="badge rounded-pill data-count">{users.length} total</span>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle data-table mb-0" aria-label="Users">
            <thead className="table-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Team</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && <tr><td className="data-empty text-center py-4" colSpan="3">No users yet.</td></tr>}
              {users.map((u, i) => (
                <tr key={i}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.team?.name || u.team}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
export default Users;
