import { Link, Outlet } from 'react-router-dom';
import { menus } from '../shared/menu';
import logo from '../assets/logo/logo-lifebonder.png';

const Navbar = () => {
  return (
    <>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col relative">
          {/* Navbar */}
          <div className="navbar flex justify-between items-center text-white bg-gray-700 fixed z-10 w-full ">
            <div className="mx-2 flex-1  px-2 cursor-pointer">
              <Link to="/">
                <img className="w-20" src={logo} alt="logo image here" />
              </Link>
            </div>
            <div className="hidden lg:flex justify-center items-center h-full">
              <ul className="flex items-center space-x-6">
                {menus.map((menu) => (
                  <li key={menu.name}>
                    <Link
                      to={menu.route}
                      className="hover:text-orange-500 transition-all"
                    >
                      {menu.name}
                    </Link>
                  </li>
                ))}

                <li>
                  <Link to="https://lifebonder.com/app_launch/" target="_blank">
                    <button className="bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold py-2 px-6 rounded-full shadow-md hover:shadow-lg hover:from-orange-500 hover:to-orange-700 transition-all">
                      Get the app
                    </button>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-white text-black min-h-full w-80 p-4">
            {menus.map((menu) => (
              <li key={menu.name}>
                <Link to={menu.route}>{menu.name} </Link>
              </li>
            ))}
            <li>
              <Link to="https://lifebonder.com/app_launch/" target="_blank">
                <button className="bg-gradient-to-r  from-orange-400 to-orange-600 text-white font-bold py-2 px-6 rounded-full shadow-md hover:shadow-lg hover:from-orange-500 hover:to-orange-700 transition-all">
                  Get the app
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
