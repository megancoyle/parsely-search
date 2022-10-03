import PropTypes from "prop-types";
import "./SortFilter.css";
import { SORT_FILTERS } from "../api/searchVariables";

const SortFilter = ({ sortFilterHandler, currentSort }) => {
  const handleSortChange = () => {
    const sortValue = document.getElementById("sort-filter-dropdown").value;
    sortFilterHandler(sortValue);
  };

  return (
    <div className="sort-filter">
      Sort by:
      <select
        id="sort-filter-dropdown"
        onChange={handleSortChange}
        value={currentSort}
      >
        {SORT_FILTERS.map((item) => {
          return (
            <option key={item.label} value={item.sort}>
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SortFilter;

SortFilter.propTypes = {
  sortFilterHandler: PropTypes.func.isRequired,
  currentSort: PropTypes.string.isRequired,
};
