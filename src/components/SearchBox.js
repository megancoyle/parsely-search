import { useState, useRef } from "react";
import PropTypes from "prop-types";
import "./SearchBox.css";
import { ReactComponent as SearchIcon } from "../images/search.svg";
import Autocomplete from "./Autocomplete";
import { stripOutSpecialCharacters } from "../helpers/textUtils";
import { retrieveData, updatePreviousSearches } from "../helpers/autocompleteUtils";
import useOutsideClick from "../hooks/useOutsideClick";

const SearchBox = ({ inputChangeHandler, searchHandler }) => {
  const [active, setActive] = useState(-1);
  const [filtered, setFiltered] = useState([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [input, setInput] = useState("");
  const isAutoCompleteVisible = input !== "" && showAutocomplete;
  const isButtonDisabled = !input || input.trim() === "";
  const ref = useRef();

  useOutsideClick(ref, () => {
    setShowAutocomplete(false);
  });

  const handleOnClick = (e) => {
    setActive(-1);
    setFiltered([]);
    search(e.currentTarget.innerText);
  };

  const handleOnKeyDown = (e) => {
    if (e.keyCode === 13) {
      // enter key
      setActive(-1);
      setShowAutocomplete(false);
      filtered[active] ? setInput(filtered[active]) : setInput(e.currentTarget.value);
    } else if (e.keyCode === 38) {
      // up arrow
      return active === -1 ? null : setActive(active - 1);
    } else if (e.keyCode === 40) {
      // down arrow
      const setIndex = active + 1 > filtered.length - 1 ? setActive(0) : setActive(active + 1);
      return active - 1 === filtered.length ? null : setIndex;
    }
  };

  const handleReset = () => {
    setShowAutocomplete(false);
    setInput("");
    inputChangeHandler("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    search(stripOutSpecialCharacters(input));
  };

  const handleSearchInputChange = (e) => {
    const input = e.currentTarget.value;
    // if you don't want to use localStorage for suggestions, plug in the value for an
    // endpoint or static data file in place of retrieveData();
    const suggestions = retrieveData();
    if (suggestions !== null) {
      const newFilteredSuggestions = suggestions
        .filter((suggestion) => suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1)
        .slice(0, 4);
      setActive(-1);
      setFiltered(newFilteredSuggestions);
      setShowAutocomplete(true);
    }
    setInput(input);
    if (!input.length || input.trim() === "") {
      inputChangeHandler("");
    }
  };

  const search = (searchInput) => {
    setShowAutocomplete(false);
    setInput(searchInput);
    searchHandler(searchInput);
    updatePreviousSearches(searchInput);
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <div className="search-input-container" ref={ref}>
        <input
          aria-label="Search"
          autoComplete="off"
          id="search-input"
          onChange={handleSearchInputChange}
          onKeyDown={handleOnKeyDown}
          placeholder="Search..."
          type="search"
          value={input}
          required
        />
        <button
          aria-label="Reset Search Input"
          className="search-close-icon"
          onClick={handleReset}
          type="reset"
        />
        <Autocomplete
          active={active}
          filtered={filtered}
          handleOnClick={handleOnClick}
          showAutocomplete={isAutoCompleteVisible}
        />
      </div>
      <button
        aria-label="Load Search Results"
        className="search-button"
        data-testid="search-button"
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
  inputChangeHandler: PropTypes.func,
  searchHandler: PropTypes.func,
};
