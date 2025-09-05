import logo from '../../src/assets/logo/logo-lifebonder.png';
import { useParams } from 'react-router-dom';
import hrImage from '../assets/hr.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [jobDetail, setJobDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    location: '',
    message: '',
    cv_url: '',
    website: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    axios
      .get(`/api/jobs/${id}`)
      .then((res) => {
        setJobDetail(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load job details.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const isFormValid = () => {
    const requiredFields = ['first_name', 'last_name', 'email', 'phone', 'location', 'message']; // 
    const requiredFieldsFilled = requiredFields.every((key) => {
      const isValid = form[key].trim() !== '';
      return isValid;
    });
    return requiredFieldsFilled;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert('Please fill all required fields');
      return;
    }

    if (!jobDetail) return;

    if (!cvFile) {
      alert('Please upload your CV before submitting.');
      return;
    }

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (cvFile && !allowedTypes.includes(cvFile.type)) {
      alert('Only PDF, DOC, or DOCX files are allowed.');
      return;
    }

    if (!executeRecaptcha) {
      alert('reCAPTCHA not ready');
      return;
    }

    setSubmitting(true);

    try {
      const token = await executeRecaptcha('submit');
      console.log('reCAPTCHA token:', token);

      const formData = new FormData();
      formData.append('cv', cvFile);

      const uploadRes = await axios.post('/api/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const payload = {
        ...form,
        title: jobDetail.title,
        application_date: new Date(),
        app_status: 'pending',
        cv_url: uploadRes.data.cv_url,
        captchaToken: token,
      };

      const res = await axios.post('/api/candidate/apply', payload);
      setSuccess(res.data.message);
      setForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        location: '',
        message: '',
        cv_url: '',
        website: '',
      });
      setCvFile(null);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading job details...</p>;
  if (error) return <p>{error}</p>;
  if (!jobDetail) return <p>Job not found</p>;

  return (
    <main className="container mx-auto my-20 relative sm:p-10">
      <div className="flex flex-wrap md:flex-nowrap items-center w-full">
        <div className="mx-5 my-5">
          <img className="w-52" src={logo} alt="company logo" />
        </div>
        <div className="w-full mx-5">
          <h1 className="sm:text-5xl text-xl my-3 font-semibold">
            {jobDetail.title}
          </h1>
          {Array.isArray(jobDetail.location) ? (
            jobDetail.location.map((loc: string, i: number) => (
              <span key={i} className="py-1 text-lg rounded-full mx-1">
                {loc}
              </span>
            ))
          ) : (
            <span>{jobDetail.location}</span>
          )}
        </div>
      </div>

      <div className="flex justify-center md:flex-nowrap flex-wrap">
        <div className="w-[1500px]">
          <div className="mt-5 p-5">
            <p>{jobDetail.description}</p>
          </div>

          <div className="my-5 p-5">
            <h1 className="text-2xl font-semibold my-5">Experience</h1>
            <p>
              You have in-depth knowledge of managing systems, analyzing and
              extract mission critical information, and you like to participate
              in architecture and software development activities and take care
              of the release, deployment and security. You will help creating a
              comfortable environment for development.
            </p>

            <div>
              <h1 className="text-2xl font-semibold my-5">Responsibilities</h1>
              <ul className="list-inside list-disc space-y-2">
                <li>Take care of the release and deployment.</li>
                <li>
                  Help the team with version controlling and proper security.
                </li>
                <li>
                  Develop and maintain mission-critical information extraction,
                  analysis, and manageing systems.
                </li>
                <li>
                  Implement streaming analysis algorithms to generate question
                  focused data sets (QFDs).
                </li>
                <li>
                  Provides direct and responsive support for urgent analytic
                  needs.
                </li>
                <li>
                  Participates in architecture and software development
                  activities.
                </li>
                <li>Translates loosely defined requirements into solutions.</li>
                <li>
                  Uses open-source technologies and tools to accomplish specific
                  use cases encountered within the project.
                </li>
                <li>
                  Uses coding languages or scripting methodologies to solve a
                  problem with a custom workflow.
                </li>
                <li>
                  Collaborates with others on the project to brainstorm about
                  the best way to tackle a complex technological infrastructure,
                  security, or development problem.
                </li>
              </ul>
            </div>

            <div>
              <h1 className="text-2xl font-semibold my-5">Skills</h1>
              <ul className="list-inside list-disc space-y-2">
                <li>Good oral and written communication skills</li>
                <li>Excellent problem-solving and troubleshooting skills</li>
                <li>
                  Knowledge of best practices and IT operations in an always-up,
                  always-available service
                </li>
                <li>
                  Experience with or knowledge of Agile Software Development
                  methodologies
                </li>
                <li>Familiarity with container orchestration services </li>
                <li>
                  Participates in architecture and software development
                  activities.
                </li>
                <li>
                  Familiarity with agile software development in Angular, C/C++,
                  JavaScript, TypeScript, Entity Framework, ASP.NET Core
                </li>
                <li>
                  Experience administering and deploying development CI/CD tools
                  such as Git, Jira, GitLab, or Jenkins
                </li>
                <li>
                  Significant experience with Windows and Linux operating system
                  environments
                </li>
                <li>
                  Experience with infrastructure scripting solutions such as
                  PowerShell or Python
                </li>
              </ul>
            </div>

            <div>
              <h1 className="text-2xl font-semibold my-5">What we offer</h1>
              <ul className="list-inside list-disc space-y-2">
                <li>
                  We are a team of endlessly dedicated developers offering a fun
                  and friendly work environment where everyone is equal.
                </li>
                <li>
                  Awesome recommendations and when you’re ready to move on,
                  we’ve got your back.
                </li>
                <li>
                  We offer real-world work experience and exciting challenges
                  where you can make a real difference.
                </li>
                <li>Potential for Full-time hires at a later date.</li>
              </ul>
            </div>
          </div>
          <div>
            <p>
              {' '}
              For more information or questions please contact us at
              development@lifebonder.com
            </p>
          </div>
        </div>

        <div className="p-5 rounded-lg w-full md:w-1/3 lg:w-1/2 sticky top-11">
          <h2 className="text-xl font-semibold mb-4">Apply for this job</h2>
          <form
            className="grid gap-4"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <input
              type="text"
              name="website"
              style={{ display: 'none' }}
              value={form.website}
              onChange={handleChange}
            />
            <input
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="p-2 border rounded"
            />
            <input
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              placeholder="Surname"
              className="p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="p-2 border rounded"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="p-2 border rounded"
            />
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
              className="p-2 border rounded"
            />
            <input
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Why are you a good fit?"
              className="p-2 border rounded"
            />

            <label className="block">
              Upload CV:
              <input
                type="file"
                onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                className="mt-1 w-full"
              />
              <small>Supported formats: PDF, DOC</small>
            </label>
{/* 
            <label className="flex items-center gap-2">
              <input type="checkbox" required />
              <span>I agree to the terms and conditions</span>
            </label> */}

            <button
              type="submit"
              disabled={submitting || !isFormValid() ||!cvFile}
              className={`py-2 px-4 rounded text-white ${
                submitting || !isFormValid()||!cvFile
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-500'
              }`}
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>

            {success && <p className="text-green-600">{success}</p>}
          </form>

          <div className="mt-10 p-5 bg-gray-100 rounded-lg shadow-md">
            <div className="flex justify-center w-full">
              <img
                src={hrImage}
                alt="contact person image here"
                className="rounded-full w-32 mx-auto block"
              />
            </div>
            <div className="my-5">
              <h2 className="text-xl font-semibold">Contact Person</h2>
              <p className="font-medium">Greeshma Raj</p>
              <p className="text-gray-600">Human Resource Manager</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default JobDetails;
