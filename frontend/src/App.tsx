import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FindJobs from './pages/Find-jobs';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import { useLocation } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JobDetails from './pages/JobDetails';
import RegisterUser from './components/RegisterUser';

function App() {
  const location = useLocation();
  const excludedRoutes = ['/register-user'];

  console.log(location.pathname);
  return (
    <>
      {!excludedRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="about" element={<About />}></Route>
        <Route path="find-jobs" element={<FindJobs />}></Route>
        <Route path="blog" element={<Blog />}></Route>
        <Route path="contact" element={<Contact />}></Route>
        <Route path="/jobdetail/:id" element={<JobDetails />}></Route>
        <Route path="/register-user" element={<RegisterUser />}></Route>
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
