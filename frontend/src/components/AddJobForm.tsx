import { useState } from 'react';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';

interface Job {
  id: number;
  jobTitle: string;
  jobDescription: string;
  location: string;
}

const AddJobForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    location: '',
  });

  const [jobs, setJobs] = useState<Job[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.jobTitle || !formData.jobDescription || !formData.location)
      return;

    const newJob: Job = {
      id: Date.now(),
      jobTitle: formData.jobTitle,
      jobDescription: formData.jobDescription,
      location: formData.location,
    };

    setJobs([...jobs, newJob]);
    setFormData({ jobTitle: '', jobDescription: '', location: '' });
    (document.getElementById('my-drawer-4') as HTMLInputElement).checked =
      false;
  };

  const handleDelete = (id: number) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="p-4">
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-sm btn-info text-white mb-4"
          >
            Create Job
          </label>

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
                    <tr key={job.id} className="border-b">
                      <td>{index + 1}</td>
                      <td>{job.jobTitle}</td>
                      <td>{job.location}</td>
                      <td className="flex gap-3">
                        <button title='View' className="btn btn-sm text-white btn-info">
                          <FaEye />
                        </button>
                        <button title='Edit' className="btn btn-sm text-white btn-warning">
                          <FaEdit />
                        </button>
                        <button
                          title='Delete'
                          onClick={() => handleDelete(job.id)}
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
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex justify-center items-center min-h-screen max-w-2xl w-full bg-white">
          <div className="card w-full max-w-lg bg-white shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-center">Add New Job</h2>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Job Title</span>
                </label>
                <input
                  title='Job Title'
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
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
                  title='Job Description'
                  name="jobDescription"
                  value={formData.jobDescription}
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
                  title='Location'
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mt-4">
                <button type="submit" className="btn btn-primary w-full">
                  Add Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJobForm;
