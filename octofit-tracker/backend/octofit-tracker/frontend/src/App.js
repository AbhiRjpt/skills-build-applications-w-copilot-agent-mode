
import { Link, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <div className="app-shell">
      <header className="container pt-3">
        <nav className="navbar navbar-expand-lg navbar-dark app-navbar px-3 py-2">
          <div className="container-fluid px-1">
            <Link className="navbar-brand d-flex align-items-center" to="/activities">
              <img src={`${process.env.PUBLIC_URL}/octofitapp-small.png`} alt="OctoFit Logo" width="40" height="40" className="me-2" />
              OctoFit Tracker
            </Link>
            <ul className="navbar-nav flex-row flex-wrap gap-1">
              <li className="nav-item"><NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/activities">Activities</NavLink></li>
              <li className="nav-item"><NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/leaderboard">Leaderboard</NavLink></li>
              <li className="nav-item"><NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/teams">Teams</NavLink></li>
              <li className="nav-item"><NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/users">Users</NavLink></li>
              <li className="nav-item"><NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/workouts">Workouts</NavLink></li>
            </ul>
          </div>
        </nav>
      </header>
      <main className="container app-content py-4 pb-5">
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="*" element={<Navigate to="/activities" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
