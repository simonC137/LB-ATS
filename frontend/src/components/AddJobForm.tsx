import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  team?: string;
  isActive?: boolean;
}

const AddJobForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
  });

  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    location: '',
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    axios
      .get('/api/jobs')
      .then((res) => setJobs(res.data))
      .catch((err) => console.error('Error fetching jobs:', err));
  }, []);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingJobId(null);
    setFormData({ title: '', description: '', location: '' });
    setEditFormData({ title: '', description: '', location: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (editingJobId) {
      setEditFormData({ ...editFormData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = editingJobId ? editFormData : formData;
    const { title, description, location } = data;

    if (!title || !description || !location) {
      await MySwal.fire({
        icon: 'error',
        title: 'All fields are required',
      });
      return;
    }

    if (editingJobId) {
      const result = await MySwal.fire({
        title: 'Save changes?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, save',
      });
      if (!result.isConfirmed) return;

      try {
        const res = await axios.put(`/api/jobs/${editingJobId}`, {
          title,
          description,
          location,
        });
        const updatedJob: Job = res.data.job;
        setJobs((prev) =>
          prev.map((job) => (job._id === editingJobId ? updatedJob : job))
        );
        await MySwal.fire({
          icon: 'success',
          title: 'Job updated!',
          timer: 1500,
          showConfirmButton: false,
        });
        // Close drawer after success alert
        closeDrawer();
      } catch (error) {
        console.error('Failed to update job:', error);
        await MySwal.fire({
          icon: 'error',
          title: 'Failed to update job',
          text: (error as Error).message,
        });
      }
    } else {
      const result = await MySwal.fire({
        title: 'Create this job?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, create',
      });
      if (!result.isConfirmed) return;

      try {
        const res = await axios.post('/api/jobs', {
          title,
          description,
          location,
        });
        const newJob: Job = res.data.job;
        setJobs((prev) => [...prev, newJob]);
        await MySwal.fire({
          icon: 'success',
          title: 'Job created!',
          timer: 1500,
          showConfirmButton: false,
        });
        // Close drawer after success alert
        closeDrawer();
      } catch (error) {
        console.error('Error saving job:', error);
        await MySwal.fire({
          icon: 'error',
          title: 'Failed to create job',
          text: (error as Error).message,
        });
      }
    }
  };

const toggleActiveStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await axios.put(`/api/jobs/${id}`, {
        isActive: !currentStatus,
      });
      const updatedJob: Job = response.data.job;
      setJobs(jobs.map((job) => (job._id === id ? updatedJob : job)));
    } catch (error) {
      console.error('Failed to toggle job status:', error);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await MySwal.fire({
      title: 'Are you sure you want to delete this job?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
    });
    if (!result.isConfirmed) return;

    try {
      await axios.delete(`/api/jobs/${id}`);
      setJobs(jobs.filter((job) => job._id !== id));
      await MySwal.fire({
        icon: 'success',
        title: 'Job deleted',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('Failed to delete job:', error);
      await MySwal.fire({
        icon: 'error',
        title: 'Failed to delete job',
        text: (error as Error).message,
      });
    }
  };

  const startEditing = (job: Job) => {
    setEditingJobId(job._id);
    setEditFormData({
      title: job.title,
      description: job.description,
      location: job.location,
    });
    setIsDrawerOpen(true);
  };

  const cancelEditing = () => {
    setEditingJobId(null);
    setEditFormData({ title: '', description: '', location: '' });
    closeDrawer();
  };

  return (
    <div className="drawer drawer-end">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={(e) => setIsDrawerOpen(e.target.checked)}
      />
      <div className="drawer-content p-4">
        <button
          onClick={() => {
            setEditingJobId(null);
            setFormData({ title: '', description: '', location: '' });
            openDrawer();
          }}
          className="btn btn-sm btn-info text-white mb-4"
        >
          Create Job
        </button>

        {jobs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full border">
              <thead>
                <tr className="bg-gray-200">
                  <th>#</th>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, index) => (
                  <tr
                    key={job._id}
                    className={`border-b ${
                      job.isActive === false ? 'bg-gray-200 opacity-60' : ''
                    }`}
                  >
                    <td>{index + 1}</td>
                    <td>{job.title}</td>
                    <td>{job.location}</td>
                    <td className="flex gap-3">
                      <button
                        title={job.isActive ? 'Deactivate' : 'Activate'}
                        className={`btn btn-sm ${
                          job.isActive ? 'btn-success' : 'btn-neutral'
                        } text-white`}
                        onClick={() =>
                          toggleActiveStatus(job._id, job.isActive ?? true)
                        }
                      >
                        {job.isActive ? <FaToggleOn /> : <FaToggleOff />}
                      </button>
                      <button
                        title="Edit"
                        onClick={() => startEditing(job)}
                        className="btn btn-sm text-white btn-warning"
                      >
                        <FaEdit />
                      </button>
                      <button
                        title="Delete"
                        onClick={() => handleDelete(job._id)}
                        className="btn btn-sm text-white btn-error"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No jobs added yet.</p>
        )}
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={closeDrawer}
        ></label>
        <div className="flex justify-center items-center min-h-screen max-w-2xl w-full bg-white">
          <div className="card w-full max-w-lg bg-white shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-center mb-4">
              {editingJobId ? 'Edit Job' : 'Add New Job'}
            </h2>

            {isDrawerOpen && ( <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Job Title</span>
                </label>
                <input
                  title="Job Title"
                  type="text"
                  name="title"
                  value={editingJobId ? editFormData.title : formData.title}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Job Description</span>
                </label>
                <textarea
                  title="Job Description"
                  name="description"
                  value={editingJobId ? editFormData.description : formData.description}
                  onChange={handleChange}
                  className="textarea textarea-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input
                  title="Location"
                  type="text"
                  name="location"
                  value={editingJobId ? editFormData.location : formData.location}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mt-4 flex gap-2">
                <button type="submit" className="btn btn-primary flex-1 text-white">
                  {editingJobId ? 'Save Changes' : 'Add Job'}
                </button>
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="btn btn-ghost flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJobForm;