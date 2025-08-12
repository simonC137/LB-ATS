import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiEye, FiLoader } from 'react-icons/fi';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
interface Candidate {
  _id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  location: string;
  job_id: { _id: string; title: string } | null;
  application_date: string;
  app_status: 'pending' | 'accepted' | 'rejected';
  message: string;
  current_job_title: string;
  cv_url: string;
}
const MySwal = withReactContent(Swal);

const CandidateDashboard: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selected, setSelected] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/candidate');
      setCandidates(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);

    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (candidate: Candidate, newStatus: Candidate['app_status']) => {
    try {
      await axios.put(`/api/candidate/${candidate._id}`, { app_status: newStatus });

      if (newStatus === 'rejected') {
        const result = await MySwal.fire({
            title: 'Are you sure you to reject this Candidate',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
          });
          if (!result.isConfirmed) return;
        await axios.delete('/api/delete/clean-rejected');
        await MySwal.fire({
            icon: 'success',
            title: 'Candidae deleted',
            timer: 1500,
            showConfirmButton: false,
          });      }

      fetchCandidates();
    } catch (err: any) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Candidates</h1>
      {loading && (
        <p className="text-gray-500 mb-4 flex items-center">
          <FiLoader className="animate-spin mr-2" /> Loading...
        </p>
      )}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-4">
        {candidates.map((c) => (
          <li key={c._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center border">
            <div>
              <p className="font-semibold">{c.first_name} {c.last_name}</p>
              <p className="text-sm text-gray-500">{c.job_id?.title || c.current_job_title}</p>
            </div>
            <div className="flex space-x-4 items-center">
              <select
                value={c.app_status}
                onChange={(e) => handleStatusChange(c, e.target.value as Candidate['app_status'])}
                className="text-sm border rounded px-2 py-1 bg-gray-50 focus:outline-none"
              >
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>

              <button
                onClick={() => setSelected(c)}
                className="text-blue-600 hover:text-blue-800"
                title="View Details"
              >
                <FiEye size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal for candidate info */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative">
            <button onClick={() => setSelected(null)} className="absolute top-2 right-4 text-gray-500 hover:text-black">
              ✕
            </button>
            <h2 className="text-xl font-bold mb-2">{selected.first_name} {selected.last_name}</h2>
            <p className="text-sm text-gray-600 mb-2">{selected.job_id?.title || selected.current_job_title}</p>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Email:</strong> {selected.email}</p>
              <p><strong>Phone:</strong> {selected.phone}</p>
              <p><strong>Location:</strong> {selected.location}</p>
              <p><strong>Status:</strong> {selected.app_status}</p>
              <p><strong>Applied On:</strong> {new Date(selected.application_date).toLocaleDateString()}</p>
              <p><strong>Message:</strong> {selected.message}</p>
              <p><strong>CV:</strong> {selected.cv_url ? (
                <a href={selected.cv_url} target="_blank" className="text-blue-600 underline">View CV</a>
              ) : '-'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateDashboard;
