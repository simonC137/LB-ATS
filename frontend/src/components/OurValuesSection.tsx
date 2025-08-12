import React from 'react';

const OurValuesSection: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg mb-24">
      {/* Our Core Values - with hover effect */}
      <div className="mb-16 group">
        <h1 className="text-4xl font-bold text-gray-700 mb-6 mt-10 text-center transition-all duration-300">
          Our Core Values
        </h1>
        <div className="w-20 h-1 bg-gray-700 mb-6 mx-auto transition-all duration-500 group-hover:w-32"></div>
        <p className="text-xl text-gray-600 text-center">
          LifeBonder's core value –{' '}
          <span className="font-bold bg-gradient-to-r from-cyan-500 to-orange-400 bg-clip-text text-transparent">
            AUTHENTICITY
          </span>
        </p>
        <p className="text-gray-700 mt-3 text-lg leading-relaxed text-center mb-12">
          A human-centric platform where people feel free to be their real
          authentic selves and find a true sense of belonging.
        </p>
      </div>

      {/* What We Stand Against - with hover effect */}
      <div className="mb-16 p-8 bg-gradient-to-r from-red-50 to-white rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.005]">
        <div className="border-b-2 border-red-200 pb-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            What We Stand Against:{' '}
            <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              ISOLATION & CANCEL CULTURE
            </span>
          </h2>
        </div>
        <p className="text-gray-700 text-lg leading-relaxed">
          We combat loneliness by fostering real-life connections. Censorship,
          judgment, lack of acceptance, and safety concerns often prevent
          authentic participation in shared activities.
        </p>
      </div>

      {/* Diversity & Inclusion */}
      <div className="mb-16">
        <div className="border-b-2 border-purple-200 pb-4 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 bg-gray-700 bg-clip-text text-transparent text-center">
            Diversity & Inclusion
          </h2>
        </div>

        {/* Compassion & Empathy - with hover card effect */}
        <div className="mb-12 p-8 rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:bg-cyan-50/30">
          <div className="border-b-2 border-purple-200 pb-4 mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">
                Compassion & Empathy
              </h3>
            </div>
          </div>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              We maintain zero tolerance for harassment, bullying, or
              discrimination. LifeBonder fosters an open, inclusive culture that
              celebrates diversity and encourages respectful collaboration.
            </p>
            <p>
              Kindness is fundamental to our approach. We cultivate a warm,
              mindful environment where emotional intimacy can thrive, free from
              judgment and cancel culture. We actively reward kindness and
              offline social collaboration.
            </p>
          </div>
        </div>

        {/* Accessible & Approachable - with hover card effect */}
        <div className="mb-12 p-8 rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:bg-blue-50/30">
          <div className="border-b-2 border-blue-200 pb-4 mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">
                Accessible & Approachable
              </h3>
            </div>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed">
            We recognize that imperfection is human. When motivation wanes, we
            encourage openness and honesty. Our space supports learning through
            mistakes, fostering innovation and growth.
          </p>
        </div>

        {/* Responsibility & Accountability - with hover card effect */}
        <div className="p-8 rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:bg-green-50/30">
          <div className="border-b-2 border-green-200 pb-4 mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">
                Responsibility & Accountability
              </h3>
            </div>
          </div>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              We champion transparency and free speech while earning user trust
              through respect and protection. Our business objectives align with
              positive social and environmental impact.
            </p>
            <p>
              Guided by ethics and fairness, we strive to elevate moral virtues
              that enhance individual lives and strengthen communities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurValuesSection;
