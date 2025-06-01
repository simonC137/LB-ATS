import { useEffect, useState } from 'react';
import axios from 'axios';
import Card, { CardContent } from './AdminCards/AdminCards';
import {  useNavigate } from 'react-router-dom';

type Stats = {
  activeJobs: number;
  expiredJobs: number;
  applicantsPerJob: number;
  newApplications: number;
};

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    activeJobs: 0,
    expiredJobs: 0,
    applicantsPerJob: 0,
    newApplications: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/stats', { withCredentials: true });
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch admin stats:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card  onClick={()=> navigate('/jobs')}>
          <CardContent  >
            <h2 className="text-lg font-semibold">Active Job Posts</h2>
            <p className="text-3xl font-bold">{stats.activeJobs}</p>
          </CardContent>
        </Card >
        <Card onClick={()=> navigate('/admin/inactive-jobs')}>
          <CardContent>
            <h2 className="text-lg font-semibold">Inactive Jobs</h2>
            <p className="text-3xl font-bold">{stats.expiredJobs}</p>
          </CardContent>
        </Card>
        <Card >
          <CardContent>
            <h2 className="text-lg font-semibold">Applicants Per Job</h2>
            <p className="text-3xl font-bold">{stats.applicantsPerJob}</p>
          </CardContent>
        </Card>
        <Card onClick={()=> navigate('/admin/candidates')}>
          <CardContent>
            <h2 className="text-lg font-semibold">New Applications</h2>
            <p className="text-3xl font-bold">{stats.newApplications}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
