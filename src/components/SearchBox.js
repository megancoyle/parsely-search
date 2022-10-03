import PropTypes from "prop-types";
import { ReactComponent as SearchIcon } from "../images/search.svg";
import "./SearchBox.css";

const SearchBox = ({ searchHandler, inputChangeHandler }) => {
  const handleClick = (e) => {
    const searchQuery = document.getElementById("search-input").value;
    e.preventDefault();

    if (searchQuery !== "") {
      searchHandler(searchQuery);
    }
  };

  const handleSearchInputChange = (e) => {
    // TODO: update this with autopopulated results
    if (!e.target.value.length) {
      inputChangeHandler("");
    }
  };

  return (
    <form className="search">
      <input
        id="search-input"
        onChange={handleSearchInputChange}
        type="search"
        placeholder="Search..."
      />
      <button className="search-button" onClick={handleClick}>
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchBox;

SearchBox.propTypes = {
  searchHandler: PropTypes.func.isRequired,
  inputChangeHandler: PropTypes.func.isRequired,
};
