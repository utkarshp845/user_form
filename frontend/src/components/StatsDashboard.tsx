import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie, Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title
);

const chartContainerStyle: React.CSSProperties = {
  maxWidth: '900px',
  margin: '40px auto',
  padding: '32px',
  background: '#fff',
  borderRadius: '12px',
  boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
  fontFamily: 'Segoe UI, Arial, sans-serif',
};

const StatsDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5241/api/stats')
      .then(res => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div style={chartContainerStyle}>Loading stats...</div>;
  if (!stats) return <div style={chartContainerStyle}>No stats available.</div>;

  // Pie chart data (category distribution)
  const pieData = {
    labels: stats.categoryDistribution.map((c: any) => c.category || 'Unknown'),
    datasets: [
      {
        data: stats.categoryDistribution.map((c: any) => c.count),
        backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545', '#6f42c1', '#17a2b8'],
      },
    ],
  };

  // Line chart data (submissions over time)
  const lineData = {
    labels: stats.submissionsOverTime.map((s: any) => new Date(s.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Submissions',
        data: stats.submissionsOverTime.map((s: any) => s.count),
        fill: false,
        borderColor: '#007bff',
        backgroundColor: '#007bff',
        tension: 0.2,
      },
    ],
  };

  // Bar chart data (user activity by city)
  const barData = {
    labels: stats.userActivity.map((u: any) => u.city || 'Unknown'),
    datasets: [
      {
        label: 'Users',
        data: stats.userActivity.map((u: any) => u.count),
        backgroundColor: '#28a745',
      },
    ],
  };

  return (
    <div style={chartContainerStyle}>
      <h2 style={{ textAlign: 'center', color: '#0056b3', marginBottom: 32 }}>User Stats Dashboard</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center' }}>
        <div style={{ flex: 1, minWidth: 250, maxWidth: 350 }}>
          <h4 style={{ textAlign: 'center' }}>Category Distribution</h4>
          <Pie data={pieData} />
        </div>
        <div style={{ flex: 1, minWidth: 250, maxWidth: 350 }}>
          <h4 style={{ textAlign: 'center' }}>Submissions Over Time</h4>
          <Line data={lineData} />
        </div>
        <div style={{ flex: 1, minWidth: 250, maxWidth: 350 }}>
          <h4 style={{ textAlign: 'center' }}>User Activity by City</h4>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;