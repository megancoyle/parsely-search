import { useState } from "react";
import PropTypes from "prop-types";
import { ReactComponent as SearchIcon } from "../images/search.svg";
import "./SearchBox.css";
import { stripOutSpecialCharacters } from "../helpers/textUtils";
import { retrieveData, updatePreviousSearches } from "../helpers/autocompleteUtils";

const SearchBox = ({ searchHandler, inputChangeHandler }) => {
  const [active, setActive] = useState(-1);
  const [filtered, setFiltered] = useState([]);
  const [isAutocompleteShow, setIsAutocompleteShow] = useState(false);
  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    const searchQuery = stripOutSpecialCharacters(document.getElementById("search-input").value);
    e.preventDefault();
    searchHandler(searchQuery);
    updatePreviousSearches(searchQuery);
    setIsAutocompleteShow(false);
  };

  const handleSearchInputChange = (e) => {
    const input = e.currentTarget.value;
    const suggestions = retrieveData();
    if (suggestions !== null) {
      const newFilteredSuggestions = suggestions
        .filter((suggestion) => suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1)
        .slice(0, 4);
      setActive(-1);
      setFiltered(newFilteredSuggestions);
      setIsAutocompleteShow(true);
    }
    setInput(e.currentTarget.value);
    if (!e.target.value.length || e.target.value.trim() === "") {
      inputChangeHandler("");
    }
  };

  const handleOnClick = (e) => {
    setActive(-1);
    setFiltered([]);
    setIsAutocompleteShow(false);
    setInput(e.currentTarget.innerText);
  };

  const handleOnKeyDown = (e) => {
    if (e.keyCode === 13) {
      // enter key
      setActive(-1);
      setIsAutocompleteShow(false);
      setInput(filtered[active]);
      setInput(e.currentTarget.value);
    } else if (e.keyCode === 38) {
      // up arrow
      return active === -1 ? null : setActive(active - 1);
    } else if (e.keyCode === 40) {
      // down arrow
      const setIndex = active + 1 > filtered.length - 1 ? setActive(0) : setActive(active + 1);
      return active - 1 === filtered.length ? null : setIndex;
    }
  };

  const renderAutocomplete = () => {
    if (isAutocompleteShow && input) {
      if (filtered.length) {
        return (
          <ul className="search-autocomplete">
            {filtered.map((suggestion, index) => {
              let className;
              if (index === active) {
                className = "active";
              }
              return (
                <li className={className} key={suggestion} onClick={handleOnClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      }
    }
    return;
  };

  return (
    <form className="search" onSubmit={handleSearch}>
      <input
        aria-label="search"
        autoComplete="off"
        id="search-input"
        onChange={handleSearchInputChange}
        onKeyDown={handleOnKeyDown}
        placeholder="Search..."
        type="search"
      />
      <button
        aria-label="load results"
        className="search-button"
        onClick={handleSearch}
        type="button"
        disabled={!input}>
        <SearchIcon />
      </button>
      {renderAutocomplete()}
    </form>
  );
};

export default SearchBox;

SearchBox.propTypes = {
  searchHandler: PropTypes.func,
  inputChangeHandler: PropTypes.func,
};
