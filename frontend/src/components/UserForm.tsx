import React, { use, useState } from 'react';
import axios from 'axios';

const formContainerStyle: React.CSSProperties = {
  maxWidth: '400px',
  margin: '40px auto',
  padding: '32px',
  background: '#fff',
  borderRadius: '12px',
  boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
  fontFamily: 'Segoe UI, Arial, sans-serif',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: 500,
  color: '#333',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  marginBottom: '18px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  fontSize: '1rem',
  boxSizing: 'border-box',
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  background: 'linear-gradient(90deg, #007bff 0%, #0056b3 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 600,
  fontSize: '1.1rem',
  cursor: 'pointer',
  transition: 'background 0.2s',
};

const UserForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');  //first step to add city in here
  const [phone, setPhone] = useState(''); // first step to add phone in here

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
  await axios.post('http://localhost:5241/api/user', { name, email, title, city, phone }); //third step to add city in here
  alert('User submitted successfully!');
  setName('');
  setEmail('');
  setTitle('');
    } catch (error) {
      console.error('Error submitting user:', error);
      alert('Failed to submit user.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formContainerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#0056b3', letterSpacing: 1 }}>Submit User</h2>
      <div>
        <label style={labelStyle}>Title</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          style={inputStyle}
          placeholder="Enter your professional title"
        />
      </div>
      <div>
        <label style={labelStyle}>Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={inputStyle}
          placeholder="Enter full name"
        />
      </div>
      <div>
        <label style={labelStyle}>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={inputStyle}
          placeholder="Enter email address"
        />
      </div>
      <div>  {/* second step to add city  */} 
        <label style={labelStyle}>City</label>
        <input
          type="text"
          value={city}
          onChange={e => setCity(e.target.value)}
          required
          style={inputStyle}
          placeholder="Enter city"
        />
       </div>
       <div>  {/* second step to add phone  */} 
        <label style={labelStyle}>Phone</label>
        <input
          type="text"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
          style={inputStyle}
          placeholder="Enter Phone Number"
        />
       </div>
      <button type="submit" style={buttonStyle}>Submit</button>
    </form>
  );
};

export default UserForm;