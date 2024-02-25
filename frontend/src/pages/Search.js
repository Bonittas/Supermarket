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
    <div className="flex items-center w-full">
      <input
        type="text"
        className="rounded-l-full py-2 px-4 sm:pr-12 w-full text-black bg-white bg-opacity-50 focus:outline-none focus:border-green-900 border-2 border-green-700 leading-tight shadow-lg"
        placeholder="Search Products"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button
        type="submit"
        className="bg-gray-100 text-black font-bold py-2 px-4 rounded-r-full"
      >
        <div className="whitespace-nowrap">
          <FontAwesomeIcon icon={faSearch} style={{ marginLeft: '0.5rem' }} />
        </div>
      </button>
    </div>
  );
};

export default Search;