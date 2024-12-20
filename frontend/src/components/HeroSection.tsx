import React from 'react';
import hero from '../assets/heroImage/hero.png';
import SearchForm from './SearchForm';

/**
 * HeroSection component renders the hero section of the page.
 * It includes a headline, a subtext, and a hero image displayed on large screens.
 */
const HeroSection: React.FC = () => {
  return (
    <section className="hero w-full min-h-screen bg-white shadow-b-md">
      <div className="flex flex-col lg:flex-row-reverse items-center justify-center w-full h-full">
        {/* Hero image only displayed on large screens */}
        <img
          src={hero}
          className="hidden lg:block w-full max-w-sm lg:max-w-xl rounded-lg lg:ml-8 lg:h-auto object-cover"
          alt="A working class lady with hands folded"
        />
        <div className=" text-center lg:text-left -mt-6 leading-8">
          <h1 className="text-5xl font-semibold mb-2">
            There Are <span className="text-orange-600">300</span> Postings Here{' '}
            <br />
            <span className="block">For You!</span>
          </h1>
          <p className="py-4 text-sm text-gray-600 mb-5">
            Find jobs, employment, and career opportunities.
          </p>

          {/* Search Form */}
          <SearchForm />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
