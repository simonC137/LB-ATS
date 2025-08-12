import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; // If using React Router
import hero from '../assets/heroImage/hero.png';
import axios from 'axios';

/**
 * HeroSection component renders the hero section of the page.
 * It includes a headline, a subtext, and a hero image displayed on large screens.
 */
const HeroSection: React.FC = () => {
  const navigate = useNavigate(); // React Router navigation
  const [jobCount,setJobCount]=useState(null);
  useEffect(() => {
    const fetchJobCount = async () => {
      try {
        const res = await axios.get('/api/stats/count');
        setJobCount(res.data.count);
      } catch (error) {
        console.error('Failed to fetch job count', error);
      }
    };
  
    fetchJobCount();
  }, []);
  return (
    <section className="hero bg-white border-b border-slate-100 mb-12">
      <div className="container min-h-[80vh] mx-auto flex flex-col lg:flex-row-reverse items-center justify-center">
        {/* Hero image only displayed on large screens */}
        <img
          src={hero}
          className="hidden lg:block w-full max-w-md lg:ml-8 lg:h-auto object-cover"
          alt="A working class lady with hands folded"
        />
        <div className="text-center lg:text-left leading-8">
          <h3 className="text-5xl font-medium mb-2 sm:mt-6">
            There Are <span className="text-orange-600">{jobCount}</span> Postings Here{' '}
            <br />
            <span className="block">For You!</span>
          </h3>
          <p className="py-4 text-sm text-gray-600 mb-5">
            Find jobs, employment, and career opportunities.
          </p>

          {/* Job Board Button */}
          <button
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
            onClick={() => navigate('/jobs')}
          >
            Browse Jobs
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
