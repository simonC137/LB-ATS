// import './App.css';
// import Home from './pages/Home';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import FindJobs from './pages/Find-jobs';
// import Blog from './pages/Blog';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import { useLocation } from 'react-router-dom';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import JobDetails from './pages/JobDetails';
// import RegisterUser from './components/RegisterUser';
// import BlogDetails from './pages/BlogDetails';

// function App() {
//   const location = useLocation();
//   const excludedRoutes = ['/admin'];

//   console.log(location.pathname);
//   return (
//     <>
//       {!excludedRoutes.includes(location.pathname) && <Navbar />}
//       <Routes>
//         <Route path="/" element={<Home />}></Route>
//         <Route path="about" element={<About />}></Route>
//         <Route path="find-jobs" element={<FindJobs />}></Route>
//         <Route path="blog" element={<Blog />}></Route>
//         <Route path="contact" element={<Contact />}></Route>
//         <Route path="/jobDetail/:id" element={<JobDetails />}></Route>
//         <Route path="/blogDetail/:id" element={<BlogDetails />}></Route>
//         <Route path="/admin" element={<RegisterUser />}></Route>
//       </Routes>
//       {!excludedRoutes.includes(location.pathname) && <Footer />}
//     </>
//   );
// }

// function AppWrapper() {
//   return (
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   );
// }

// export default AppWrapper;

import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import JobDetails from './pages/JobDetails';
import BlogDetails from './pages/BlogDetails';
import AdminPage from './pages/admin/AdminLogin';
import { useLocation } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import DashboardHome from './pages/admin/DashboardHome';
import Profile from './pages/admin/Profile';
import Roles from './pages/admin/Roles';
import AddJob from './pages/admin/Add-Job';

function App() {
  const location = useLocation();
  const excludedRoutes = [
    '/admin',
    '/admin/dashboard',
    '/admin/roles',
    '/admin/profile',
    '/admin/add-job',
  ];

  return (
    <>
      {!excludedRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="contact" element={<Contact />}></Route>
        <Route path="/jobDetail/:id" element={<JobDetails />}></Route>
        <Route path="/blogDetail/:id" element={<BlogDetails />}></Route>
        <Route path="/admin/" element={<AdminPage />}></Route>

        {/* Admin protected routes here */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="roles" element={<Roles />} />
          <Route path="add-job" element={<AddJob />} />
        </Route>
      </Routes>
      {!excludedRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
