import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserForm from './components/UserForm';
import StatsDashboard from './components/StatsDashboard';

const navStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#52a0f5ff',
  padding: '16px 0',
  marginBottom: 32,
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
  return (
    <Router>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>User Form</Link>
        <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/dashboard" element={<StatsDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;