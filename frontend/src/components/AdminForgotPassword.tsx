import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/forgot-password', { email });
      setMsg(res.data.message);
    } catch (err: any) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
        Email Address
      </label>
      <input
        id="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
        aria-describedby="emailHelp"
      />
      <button
        type="submit"
        className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md shadow-md transition"
      >
        Send Reset Link
      </button>

      {msg && (
        <p
          className={`mt-4 text-center text-sm ${
            msg.toLowerCase().includes('error') ? 'text-red-600' : 'text-green-600'
          }`}
          role="alert"
        >
          {msg}
        </p>
      )}

      <div className="mt-6 text-center">
        <Link
          to="/admin"
          className="text-orange-500 hover:text-orange-700 font-medium transition"
        >
          &larr; Back to Login
        </Link>
      </div>
    </form>
  );
};

export default AdminForgotPassword;
