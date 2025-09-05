// components/JobFilterComponent.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiX, FiSearch } from 'react-icons/fi';
import axios from 'axios';

interface Job {
  _id: string;
  title: string;
  team: string;
  location: string[];
  description: string;
}

const JobBoard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/api/jobs/active')
      .then((response) => {
        console.log('Jobs API response:', response.data);
        // Handle both array and object-shaped responses
        if (Array.isArray(response.data)) {
          setJobs(response.data);
        } else if (Array.isArray(response.data.jobs)) {
          setJobs(response.data.jobs);
        } else {
          setJobs([]);
        }
      })
      .catch((error) => console.error('Error fetching jobs:', error));
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleJobDescription = (jobId: string) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  const handleApplyNow = (jobId: string) => {
    navigate(`/jobDetail/${jobId}`);
  };

  // Simplify titles
  const getPositionTitle = (title: string) => {
    if (title.includes('Flutter Mobile Developer'))
      return 'Flutter Mobile Developer';
    return title.split(' at ')[0].split(' for ')[0];
  };

  // Filter jobs
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.some((loc) =>
        loc.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Space */}
      <div className="h-16"></div>

      <div className="p-6">
        <h1 className="text-5xl font-bold text-center mb-10 mt-16">
          We are looking for you!
        </h1>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative flex items-center mb-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <FiSearch className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-12 pr-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-blue"
              placeholder="Search roles"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Showing {filteredJobs.length} roles</span>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-blue-600 hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        </div>

        {/* Job List */}
        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white p-5 rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {getPositionTitle(job.title)}
                    </h3>
                    <div className="mt-1 flex items-center text-sm text-gray-500 space-x-2">
                      <span>{job.team}</span>
                      <span>•</span>
                      <span>
                        {Array.isArray(job.location)
                          ? job.location.join(', ')
                          : job.location}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleJobDescription(job._id.toString())}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {expandedJobId === job._id.toString() ? (
                      <FiX className="w-5 h-5" />
                    ) : (
                      <FiPlus className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {expandedJobId === job._id.toString() && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-gray-600 mb-4">
                      {job.description.split('. ')[0]}.
                    </p>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleApplyNow(job._id)}
                        className="px-4 py-2 bg-custom-blue text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        View role
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">
                No roles found matching your search
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobBoard;
