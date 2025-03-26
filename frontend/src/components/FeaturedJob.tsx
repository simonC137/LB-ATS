import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { FeaturedJobs, featuredjobs } from '../shared/constants';

const jobTypeColors: Record<string, string> = {
  Remote: ' text-blue-700 bg-blue-100',
  'Part-time': 'text-green-700 bg-green-100',
  Internship: 'text-orange-700 bg-orange-100',
  Student: 'text-zinc-300',
};

const FeaturedJob = () => {
  const [featuredJobs, setFeaturedJobs] =
    useState<FeaturedJobs[]>(featuredjobs);
  const navigate = useNavigate();

  const jobDetailsHandler = (id: number): void => {
    navigate(`/jobDetail/${id}`);
  };

  return (
    <main className="max-w-7xl mx-auto pt-16 py-10">
      <h2 className="text-2xl font-bold text-center mb-4">Featured Jobs</h2>
      <p className="text-center text-gray-500 mb-12">
        Know your worth and find the job that qualify your life
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-5 gap-8">
        {featuredJobs.map(({ title, location, id }, index) => (
          <li
            key={index}
            className="flex items-center cursor-pointer p-6 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            onClick={() => jobDetailsHandler(id)}
          >
            {/* <div className="flex items-center justify-center text-blue-500 text-2xl p-2 bg-blue-50 border border-gray-400 rounded-md transition-all duration-300 mr-6 hover:bg-orange-600 hover:text-white">
              <Icon />
            </div> */}
            <div>
              <h3 className="text-lg font-medium">{title}</h3>

              <div className="my-3 w-full flex gap-2 items-center flex-wrap">
                {location.map((type, i) => (
                  <div key={i} className={` ${jobTypeColors[type]}`}>
                    <p className="px-3 py-1 text-sm font-medium  w-20 rounded-full mx-1">
                      {type}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-center items-center">
        <button className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          More Jobs
        </button>
      </div>
    </main>
  );
};

export default FeaturedJob;
