import React from 'react';
import hero from '../assets/heroImage/hero.png';
import SearchForm from './SearchForm';

/**
 * HeroSection component renders the hero section of the page.
 * It includes a headline, a subtext, and a hero image displayed on large screens.
 */
const HeroSection: React.FC = () => {
  return (
    <>
      <section className="hero bg-white border-b border-slate-100 mb-12">
        <div className="container  min-h-[80vh] mx-auto flex flex-col lg:flex-row-reverse items-center justify-center">
          {/* Hero image only displayed on large screens */}
          <img
            src={hero}
            className="hidden lg:block w-full max-w-md lg:ml-8 lg:h-auto object-cover"
            alt="A working class lady with hands folded"
          />
          <div className="text-center lg:text-left leading-8">
            <h3 className="text-5xl font-medium mb-2 sm:mt-6">
              There Are <span className="text-orange-600">300</span> Postings
              Here <br />
              <span className="block">For You!</span>
            </h3>
            <p className="py-4 text-sm text-gray-600 mb-5">
              Find jobs, employment, and career opportunities.
            </p>

            {/* Search Form */}
            <SearchForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
