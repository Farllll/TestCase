import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

function Search({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    console.log("Search Query:", event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = () => {
    onSearch(searchQuery);
    console.log("Performing Search:", searchQuery);
  };

  return (
    <div className="flex justify-center mt-5">
      <input
        type="text"
        placeholder="Cari Pokemon"
        className="input border-gray-500 rounded-tl-[20px] rounded-bl-[20px] rounded-br-none rounded-tr-none w-full max-w-xs focus:outline-none"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />
      <button
        className="btn rounded-tl-none rounded-bl-none rounded-br-2xl rounded-tr-2xl bg-[#f55464] hover:bg-[#a83944] border-gray-500"
        onClick={handleSearch}
      >
        <IoSearch size={20} color="white" />
      </button>
    </div>
  );
}

export default Search;
