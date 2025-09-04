import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { TextField, Box } from '@mui/material';

const UserGrid: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5241/api/user')
      .then(res => setUsers(res.data));
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter(user =>
        Object.values(user)
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    );
  }, [search, users]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 100 },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'city', headerName: 'City', width: 120 },
    { field: 'createdAt', headerName: 'Created At', width: 180 },
    // Add more columns as needed
  ];

  return (
    <Box sx={{ maxWidth: 1000, margin: '40px auto', padding: 4, background: '#fff', borderRadius: 2, boxShadow: 2 }}>
      <h2 style={{ textAlign: 'center', color: '#0056b3', marginBottom: 24 }}>User Data Grid</h2>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={search}
        onChange={e => setSearch(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <DataGrid
        rows={filteredUsers}
        columns={columns}
        paginationModel={{ pageSize: 10, page: 0 }}
        pageSizeOptions={[10, 20, 50]}
        autoHeight
      />
    </Box>
  );
};

export default UserGrid;