import PropTypes from "prop-types";
import "./SortFilter.css";
import { SORT_FILTERS } from "../helpers/searchVariables";
import useSearchContext from "../hooks/useSearchContext";

const SortFilter = ({ currentSort }) => {
  const { sortFilterHandler } = useSearchContext();

  const handleSortChange = () => {
    const sortValue = document.getElementById("sort-filter-dropdown").value;
    sortFilterHandler(sortValue);
  };

  return (
    <div className="sort-filter">
      Sort by:
      <select
        aria-label="Sort Results"
        id="sort-filter-dropdown"
        onChange={handleSortChange}
        value={currentSort}>
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
  currentSort: PropTypes.string.isRequired,
};
