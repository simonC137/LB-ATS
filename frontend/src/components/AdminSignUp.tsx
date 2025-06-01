import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminSignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [emailForVerification, setEmailForVerification] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordForLogin, setPasswordForLogin] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { password, confirmPassword, ...rest } = formData;

    if (password !== confirmPassword) {
      return setMessage('Passwords do not match');
    }

    try {
      setLoading(true);
      const res = await axios.post('/api/auth/signup', {
        ...rest,
        password,
      });
      setMessage(res.data.message);
      setEmailForVerification(formData.email);
      setPasswordForLogin(password);
      setIsVerifying(true);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async () => {
    if (!verificationCode.trim())
      return setMessage('Enter the verification code');

    try {
      setLoading(true);
      const res = await axios.post('/api/auth/verify-email', {
        code: verificationCode,
      });
      setMessage(res.data.message);

      const loginRes = await axios.post('/api/auth/login', {
        email: emailForVerification,
        password: passwordForLogin,
      });

      setMessage(loginRes.data.message);
      navigate('/admin/dashboard');
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || 'Verification or login failed'
      );
    } finally {
      setLoading(false);
    }

   
  };
  const handleResendCode = async () => {
    if (!emailForVerification)
      return setMessage('No email to resend code to.');

    try {
      setLoading(true);
      const res = await axios.post('/api/auth/resend-code', {
        email: emailForVerification,
      });
      setMessage(res.data.message || 'Verification code resent.');
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Failed to resend code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen w-full bg-gray-50">
      <div className="max-w-3xl w-full bg-white shadow-xl p-6 rounded-lg mt-10">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Sign Up</h2>

        {!isVerifying ? (
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
            {[
              'first_name',
              'last_name',
              'email',
              'password',
              'confirmPassword',
            ].map((field) => (
              <div className="form-control col-span-1" key={field}>
                <label className="label">
                  <span className="label-text capitalize">
                    {field.replace(/_/g, ' ')}
                  </span>
                </label>
                <input
                  type={
                    field.toLowerCase().includes('password')
                      ? 'password'
                      : 'text'
                  }
                  name={field}
                  value={(formData as any)[field]}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
            ))}

            <div className="col-span-2">
              <button
                type="submit"
                className="btn btn-info w-full"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Sign Up'}
              </button>
              {message && <p className="text-red-500 mt-2">{message}</p>}
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center">
            <p className="mb-2 text-gray-700">
              We sent a 6-digit code to <strong>{emailForVerification}</strong>
            </p>
            <input
              type="text"
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="input input-bordered w-full max-w-xs mb-4"
            />
            <button
              onClick={handleVerifyEmail}
              className="btn btn-success w-full max-w-xs"
              disabled={loading}
            >
              {loading ? 'Verifying & Logging In...' : 'Verify Email'}
            </button>
            <button
              onClick={handleResendCode}
              className="btn btn-outline w-full max-w-xs"
              disabled={loading}
            >
              {loading ? 'Resending...' : 'Resend Code'}
            </button>

            {message && <p className="text-red-500 mt-4">{message}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSignUp;
