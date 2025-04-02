import { FC, useState } from 'react';

interface Profile {
  name: string;
  email: string;
  role: string;
  joined: string;
  permissions: string;
}

const ProfilePage: FC = () => {
  const [admin, setAdmin] = useState<Profile>({
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Administrator',
    joined: 'January 10, 2023',
    permissions: 'Full Access',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(admin);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setAdmin(formData);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePasswordSave = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    alert('Password successfully updated');
    setIsChangingPassword(false);
  };

  return (
    <div className="p-6 max-w-lg mx-auto border shadow-lg rounded-lg bg-white text-black">
      <h1 className="text-2xl text-center font-bold mb-4">Admin Profile</h1>
      <div className="space-y-2">
        <p>
          <strong>Name:</strong> {admin.name}
        </p>
        <p>
          <strong>Email:</strong> {admin.email}
        </p>
        <p>
          <strong>Role:</strong> {admin.role}
        </p>
        <p>
          <strong>Joined:</strong> {admin.joined}
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

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <input
              type="text"
              name="name"
              value={formData.name}
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
