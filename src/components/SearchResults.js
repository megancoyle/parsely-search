import PropTypes from "prop-types";
import Pagination from "./Pagination";
import SearchResultCard from "./SearchResultCard";
import SectionFilters from "./SectionFilters";
import SortFilter from "./SortFilter";
import "./SearchResults.css";

const SearchResults = ({
  currentPage,
  currentSection,
  currentSort,
  pagination,
  paginationHandler,
  searchQuery,
  sectionHandler,
  sortFilterHandler,
  results,
  time,
}) => {
  const hasSectionResults = results.length > 0;

  return (
    <>
      <SectionFilters sectionHandler={sectionHandler} currentSection={currentSection} />
      {hasSectionResults && (
        <div className="app-number-results-container">
          <SortFilter sortFilterHandler={sortFilterHandler} currentSort={currentSort} />
          <div className="app-number-results">
            {hasSectionResults && `Page ${currentPage} of results `}({time} seconds)
          </div>
        </div>
      )}
      {!hasSectionResults && <p className="app-no-results">No results for this section.</p>}
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
      {hasSectionResults && (
        <Pagination
          currentPage={currentPage}
          pagination={pagination}
          paginationHandler={paginationHandler}
        />
      )}
    </>
  );
};

export default SearchResults;

SearchResults.propTypes = {
  currentPage: PropTypes.number,
  currentSection: PropTypes.string,
  currentSort: PropTypes.string,
  pagination: PropTypes.string,
  paginationHandler: PropTypes.func,
  results: PropTypes.array.isRequired,
  searchQuery: PropTypes.string.isRequired,
  sectionHandler: PropTypes.func,
  sortFilterHandler: PropTypes.func,
  time: PropTypes.string,
};
