import { useState } from 'react';
import Card, { CardContent } from './uiCards/AdminCards';

type Stats = {
  activeJobs: number;
  expiredJobs: number;
  applicantsPerJob: number;
  newApplications: number;
};

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    activeJobs: 12,
    expiredJobs: 5,
    applicantsPerJob: 23,
    newApplications: 8,
  });
 
   const handleIncrementActiveJobs = () => {
     setStats((prevStats) => ({
       ...prevStats,
       activeJobs: prevStats.activeJobs + 1,
     }));
   };


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold">Active Job Posts</h2>
            <p className="text-3xl font-bold">{stats.activeJobs}</p>
            <button onClick={handleIncrementActiveJobs}>
              Increment Active Jobs
            </button>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold">Expired Jobs</h2>
            <p className="text-3xl font-bold">{stats.expiredJobs}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold">Applicants Per Job</h2>
            <p className="text-3xl font-bold">{stats.applicantsPerJob}</p>
          </CardContent>
        </Card>
        <Card>
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
