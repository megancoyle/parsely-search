import PropTypes from "prop-types";
import Pagination from "./Pagination";
import SearchResultCard from "./SearchResultCard";
import "./SearchResults.css";

const SearchResults = ({
  results,
  searchQuery,
  sectionHandler,
  currentPage,
  pagination,
  paginationHandler,
}) => {
  if (results.length <= 0) {
    return <p className="app-no-results">No results for this section.</p>;
  }

  return (
    <>
      <div className="search-results">
        {results.map((result, i) => {
          return (
            <SearchResultCard
              key={i}
              result={result}
              searchQuery={searchQuery}
              sectionHandler={sectionHandler}
            />
          );
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        pagination={pagination}
        paginationHandler={paginationHandler}
      />
    </>
  );
};

export default SearchResults;

SearchResults.propTypes = {
  results: PropTypes.array.isRequired,
  searchQuery: PropTypes.string.isRequired,
  sectionHandler: PropTypes.func,
  currentPage: PropTypes.number,
  pagination: PropTypes.string,
  paginationHandler: PropTypes.func,
};
