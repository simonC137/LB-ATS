import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import FindJobs from './pages/Find-jobs';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter> 
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="about" element={<About />}></Route>
        <Route path="find-jobs" element={<FindJobs />}></Route>
        <Route path="blog" element={<Blog />}></Route>
        <Route path="contact" element={<Contact />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
