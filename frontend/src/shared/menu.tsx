import { CgProfile } from 'react-icons/cg';
import { adminMenusNames, RouteNames } from './constants';
import { RxDashboard } from 'react-icons/rx';
import { IoMdAdd } from 'react-icons/io';
import { GoTools } from 'react-icons/go';

export const menus = [
  {
    name: 'Home',
    route: RouteNames.Home,
  },

  {
    name: 'Contact',
    route: RouteNames.Contact,
  },
];

export const adminMenus = [
  {
    name: 'Dashboard',
    route: adminMenusNames.Dashboard,
    icon: RxDashboard,
  },
  {
    name: 'Profile',
    route: adminMenusNames.Profile,
    icon: CgProfile,
  },
  {
    name: 'Roles',
    route: adminMenusNames.Roles,
    icon: GoTools,
  },
  {
    name: 'Add job',
    route: adminMenusNames.AddJob,
    icon: IoMdAdd,
  },
];
