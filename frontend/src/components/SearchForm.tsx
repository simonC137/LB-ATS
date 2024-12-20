import React from 'react';

const SearchForm: React.FC = () => {
  return (
    <form className="max-w-xl mx-auto -ml-2">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
         
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-0 focus:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-gray-600"
          placeholder="Job title, Keywords, or Company..."
          required
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 top-1/2 transform -translate-y-1/2 bg-orange-600 hover:bg-custom-blue focus:ring-4 focus:outline-none focus:custom-blue font-medium rounded-lg text-sm px-4 py-2 dark:bg-custom-blue dark:hover:bg- dark:focus:ring-custom-blue" 
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
