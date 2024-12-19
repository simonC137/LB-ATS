import React from 'react';
import hero from '../assets/heroImage/hero.png';

/**
 * HeroSection component renders the hero section of the page.
 * It includes a headline, a subtext, and a hero image displayed on large screens.
 */
const HeroSection: React.FC = () => {
  return (
    <section className="hero w-full min-h-screen">
      <div className="bg-white flex flex-col lg:flex-row-reverse items-center justify-center w-full h-full">
        {/* Hero image only displayed on large screens */}
        <img
          src={hero}
          className="hidden lg:block w-full max-w-lg rounded-lg lg:ml-8"
          alt="A picturesque landscape with a blue sky"
        />
        <div className="font-jost text-center lg:text-left -mt-6 leading-7">
          <h1 className="text-4xl font-bold">
            There Are <span className="text-blue-600">300</span> Postings Here{' '}
            <br />
            <span className="block">For You!</span>
          </h1>
          <p className="py-4 text-sm text-gray-600">
            Find jobs, employment, and career opportunities.
          </p>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
