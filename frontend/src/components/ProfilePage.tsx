import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Profile {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  createdAt: string;
  permissions: string;
}

const ProfilePage: FC = () => {
  const [admin, setAdmin] = useState<Profile | null>(null);
  const [formData, setFormData] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/auth/profile');
        setAdmin(res.data);
        setFormData(res.data);
      } catch (err) {
        console.error('Failed to load profile', err);
      }
    };
    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!formData) return;
    try {
      const res = await axios.put('/api/auth/profile', formData);
      setAdmin(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update profile', err);
      toast('Update failed.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePasswordSave = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast('New passwords do not match');
      return;
    }

    try {
      await axios.post('/api/auth/change-password', {
        currentPassword: passwords.current,
        newPassword: passwords.newPassword,
      });
      toast('Password successfully updated');
      setIsChangingPassword(false);
      setPasswords({ current: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      console.error('Password change failed', err);
      toast('Password change failed');
    }
  };

  if (!admin) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto border shadow-lg rounded-lg bg-white text-black">
      <h1 className="text-2xl text-center font-bold mb-4">Admin Profile</h1>
      <div className="space-y-2">
        <p>
          <strong>Name:</strong> {admin.first_name}
        </p>
        <p>
          <strong>Email:</strong> {admin.email}
        </p>
        <p>
          <strong>Role:</strong> {admin.role}
        </p>
        <p>
          <strong>Joined:</strong>{' '}
          {new Date(admin.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <p>
          <strong>Permissions:</strong> {admin.permissions}
        </p>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleEditClick}
        >
          Edit Profile
        </button>
      </div>

      <div className="mt-4 border-t pt-4">
        <h2 className="text-lg font-semibold">Security</h2>
        <button
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => setIsChangingPassword(true)}
        >
          Change Password
        </button>
      </div>

      <div className="mt-4 border-t pt-4">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <ul className="list-disc pl-5 text-sm">
          <li>Updated job posting (March 30, 2025)</li>
          <li>Approved new applicant (March 29, 2025)</li>
          <li>Logged in from new device (March 28, 2025)</li>
        </ul>
      </div>

      {isEditing && formData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <input
              type="text"
              name="name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Email"
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isChangingPassword && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <input
              type="password"
              name="current"
              value={passwords.current}
              onChange={handlePasswordChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Current Password"
            />
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="New Password"
            />
            <input
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Confirm New Password"
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded"
                onClick={() => setIsChangingPassword(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handlePasswordSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
