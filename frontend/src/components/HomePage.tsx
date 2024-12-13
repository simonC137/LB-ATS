import React from 'react';
import hero from '../assets/hero/hero.png';

const HomePage: React.FC = () => {
  return (
    <section className="hero  w-full min-h-screen">
      <div className="bg-white flex flex-col lg:flex-row-reverse items-center justify-center w-full h-full ">
        {/* hero image on mobile will be hidden and only  displayed on large screens  as is in the mockup*/}
        <img
          src={hero}
          className="hidden lg:block w-full max-w-lg rounded-lg lg:ml-8"
          alt="A picturesque landscape with a blue sky"
        />
        <div className=" font-jost text-center lg:text-left -mt-6 leading-7">
          <h2 className="text-4xl font-bold">
            There Are <span className="text-blue-600">300</span> Postings 
            Here <br />
            <span className="block">For You!</span>
          </h2>
          <p className="py-4 text-sm text-gray-600">
            Find jobs, employment, and career opportunities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
