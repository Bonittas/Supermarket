import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex items-center w-48  sm:w-32 md:w-96 lg:w-70 relative md:top-0  lg:top-4 sm:top-12 ">
      <input
        type="text"
        className="rounded-l-md  py-2 px-4 sm:pr-12 w-full text-black bg-white bg-opacity-50 border border-green-700  shadow-sm"
        
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button
        type="submit"
        className="bg-gray-100 text-black font-bold py-2 px-4 rounded-r-md"
      >
        <div className="whitespace-nowrap">
          <FontAwesomeIcon icon={faSearch} style={{ marginLeft: '0.5rem' }} />
        </div>
      </button>
    </div>
  );
};

export default Search;