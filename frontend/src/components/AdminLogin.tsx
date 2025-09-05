import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // ✅ add Link
import axios from 'axios';

import signupImage from '../assets/networkingImage.jpg';
import formImage from '../assets/formImage.svg';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const res = await axios.post('/api/auth/login', formData, {
        withCredentials: true,
      });

      if (res.status === 200) {
        navigate('/admin/dashboard'); 
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex justify-center items-center p-5">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="p-5 shadow-xl w-full mx-auto">
            <img className="w-44 mb-2" src={formImage} alt="form image" />
            <h1 className="text-2xl font-bold mb-4">Welcome Admin</h1>

            <div className="grid grid-cols-1 gap-3">
              <label className="input bg-white my-2 input-bordered flex items-center gap-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="grow bg-none"
                  placeholder="Email"
                  required
                />
              </label>
              <label className="input bg-white my-2 input-bordered flex items-center gap-2">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="grow"
                  placeholder="Password"
                  required
                />
              </label>

              <div className="text-right text-sm">
                <Link to="/forgot-password" className="text-blue-500 hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>

            {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}

            <button
              type="submit"
              className="mt-4 w-full btn bg-orange-400 hover:bg-orange-500 border-none text-white"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      <div className="hidden md:flex flex-1 h-screen">
        <img
          src={signupImage}
          alt="Signup"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AdminLogin;
