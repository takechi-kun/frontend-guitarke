import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useHistory } from "react-router-dom";
function SearchBar() {
  const history = useHistory();
  const [searchText, setSearchText] = useState("");

  return (
      <div className="flex flex-row items-center">
        <input
          className="py-3 px-3 w-72 h-12 bg-gray-200 text-gray-700 focus:outline-none leading-tight rounded-l-md"
          id="search"
          type="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search SongOrArtist"
        />
        <button
          disabled={searchText === "" ? true : false}
          onClick={() => history.push(`/search?s=${searchText}`)}
          className="bg-blue-500 text-white rounded-r-md hover:bg-blue-700 focus:outline-none w-12 h-12 flex items-center justify-center "
        >
          <BsSearch />
        </button>
      </div>
  );
}
export default SearchBar;
