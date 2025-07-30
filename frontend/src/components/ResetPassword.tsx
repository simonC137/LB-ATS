import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validatePasswords = () => {
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    if (!acceptedTerms) {
      setError('You must accept the Terms and Conditions.');
      return false;
    }
    setError('');
    return true;
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePasswords()) return;

    setLoading(true);
    setMsg('');
    setError('');

    try {
      const res = await axios.post(`/api/auth/reset-password/${token}`, {
        newPassword,
      });
      setMsg(res.data.message);
      setNewPassword('');
      setConfirmPassword('');
      setAcceptedTerms(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleReset}
      className="mt-4 space-y-4 lg:mt-5 md:space-y-5 max-w-md mx-auto"
      noValidate
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Reset Password
      </h2>

      <div>
        <label
          htmlFor="newPassword"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          New Password
        </label>
        <input
          id="newPassword"
          type="password"
          name="password"
          placeholder="••••••••"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          minLength={8}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          name="confirm-password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={8}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50
              focus:ring-3 focus:ring-primary-300 dark:bg-gray-700
              dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            required
          />
        </div>
        <div className="ml-3 text-sm">
          <label
            htmlFor="terms"
            className="font-light text-gray-500 dark:text-gray-300"
          >
            I accept the{' '}
            <a
              href="#"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms and Conditions
            </a>
          </label>
        </div>
      </div>

      {(error || msg) && (
        <p
          role="alert"
          className={`text-sm font-semibold mb-2 ${
            error
              ? 'text-red-600 dark:text-red-400'
              : 'text-green-600 dark:text-green-400'
          }`}
        >
          {error || msg}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center
    focus:ring-4 focus:outline-none
    bg-blue-600 hover:bg-blue-700 focus:ring-blue-300
    ${loading ? 'bg-blue-400 cursor-not-allowed' : ''}`}
      >
        {loading ? 'Resetting...' : 'Reset Password'}
      </button>
    </form>
  );
};

export default ResetPassword;
