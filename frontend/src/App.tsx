import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserForm from './components/UserForm';
import StatsDashboard from './components/StatsDashboard';
import UserGrid from './components/UserGrid';
import LoginForm from './components/LoginForm';
import ProtectedRoute from './components/ProtectedRoute';
import LogoutButton from './components/LogoutButton';

const navStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#52a0f5ff',
  padding: '16px 32px',
  marginBottom: 32,
};

const linkGroupStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

const linkStyle: React.CSSProperties = {
  color: '#fff',
  textDecoration: 'none',
  margin: '0 24px',
  fontSize: '1.1rem',
  fontWeight: 500,
  letterSpacing: 1,
};

function App() {
  const token = localStorage.getItem('authToken');

  return (
    <Router>
      <nav style={navStyle}>
        <div style={linkGroupStyle}>
          <Link to="/" style={linkStyle}>User Form</Link>
          <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
          <Link to="/users" style={linkStyle}>User Grid</Link>
        </div>
        <div style={linkGroupStyle}>
          {token && <span style={{ color: '#fff', marginRight: '16px' }}>Welcome!</span>}
          {!token && <Link to="/login" style={linkStyle}>Login</Link>}
          <LogoutButton />
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <StatsDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UserGrid />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;