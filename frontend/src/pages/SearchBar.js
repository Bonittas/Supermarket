import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="flex items-center w-full">
  <div className="relative w-full">
    <input
      type="search"
      className="rounded-full h-12 py-2 px-4 pr-12 w-full text-black bg-white focus:outline-none focus:border-green-500 border-2 border-green-700 leading-tight shadow-lg mb-2 sm:mb-0"
      placeholder="Search..."
      value={searchQuery}
      onChange={handleSearchChange}
    />
    <div className="absolute inset-y-0 right-0 flex items-center p-3 cursor-pointer h-12 bg-yellow-600 rounded-r-full ">
      <FontAwesomeIcon icon={faSearch} className="text-white" onClick={handleSearchSubmit}/>
    </div>
  </div>
</div>
  );
};

export default Search;
