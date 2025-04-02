import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo/logo-lifebonder.png';
import { adminMenus } from '../shared/menu';
import clsx from 'clsx';
import { RiArrowDropDownLine } from 'react-icons/ri';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const logoutHandler = () => {
    navigate('/admin');
  };

  return (
    <div className="flex h-screen">
      <aside className="bg-background fixed inset-y-0 left-0 z-10 w-52 flex-col border-r sm:flex hidden">
        <nav className="flex h-full flex-col px-4 py-4">
          <div className="mb-6 flex justify-start">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-32" />
            </Link>
          </div>

          <div className="flex flex-col flex-grow gap-4">
            {adminMenus.map((adminMenu) => (
              <Link
                key={adminMenu.name}
                to={adminMenu.route}
                className={clsx(
                  'flex items-center gap-4 px-2.5 py-3 rounded-lg text-black transition-all',
                  location.pathname.includes(adminMenu.route)
                    ? 'bg-gray-200 text-black'
                    : 'hover:bg-gray-100'
                )}
              >
                <adminMenu.icon className="h-5 w-5" />
                {adminMenu.name}
              </Link>
            ))}
          </div>

          <div className="mt-auto pb-4">
            <button
              onClick={logoutHandler}
              className="w-full flex items-center justify-center gap-3 p-3 rounded-lg bg-red-500 text-white transition-all duration-200 hover:scale-105"
            >
              Log out
            </button>
          </div>
        </nav>
      </aside>

      <main className="flex-grow p-5 sm:ml-52">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="flex grow justify-end px-2">
            <div className="flex items-stretch ">
              <div className="dropdown dropdown-end ">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost  rounded-field"
                >
                  <p>Hi Admin</p>
                  <RiArrowDropDownLine size={24} />
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm"
                >
                  <li>
                    <a>Profile</a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
