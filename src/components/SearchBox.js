import { useState } from "react";
import PropTypes from "prop-types";
import { ReactComponent as SearchIcon } from "../images/search.svg";
import "./SearchBox.css";
import { stripOutSpecialCharacters } from "../helpers/textUtils";

const SearchBox = ({ searchHandler, inputChangeHandler }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleSearch = (e) => {
    const searchQuery = stripOutSpecialCharacters(document.getElementById("search-input").value);
    e.preventDefault();
    searchHandler(searchQuery);
    setIsButtonDisabled(false);
  };

  const handleSearchInputChange = (e) => {
    // TODO: update this with autopopulated results
    setIsButtonDisabled(false);
    if (!e.target.value.length || e.target.value.trim() === "") {
      inputChangeHandler("");
      setIsButtonDisabled(true);
    }
  };

  return (
    <form className="search" onSubmit={handleSearch}>
      <input
        aria-label="search"
        autoComplete="off"
        id="search-input"
        onChange={handleSearchInputChange}
        placeholder="Search..."
        type="search"
      />
      <button
        aria-label="load results"
        className="search-button"
        onClick={handleSearch}
        type="button"
        disabled={isButtonDisabled}>
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchBox;

SearchBox.propTypes = {
  searchHandler: PropTypes.func,
  inputChangeHandler: PropTypes.func,
};
