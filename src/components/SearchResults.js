import PropTypes from "prop-types";
import "./SearchResults.css";
import Loader from "./Loader";
import Pagination from "./Pagination";
import SectionFilters from "./SectionFilters";
import SearchResultCard from "./SearchResultCard";
import SortFilter from "./SortFilter";

// Container for SearchResultsCard, SectionFilters, and SortFilter

const SearchResults = ({
  currentPage,
  currentSection,
  currentSort,
  isLoading,
  pagination,
  paginationHandler,
  searchQuery,
  searchResults,
  sectionHandler,
  sortFilterHandler,
  time,
}) => {
  const hasSectionResults = searchResults.length > 0;

  return (
    <>
      <SectionFilters currentSection={currentSection} sectionHandler={sectionHandler} />
      {hasSectionResults && (
        <div className="search-results-time-container">
          <SortFilter currentSort={currentSort} sortFilterHandler={sortFilterHandler} />
          <div className="search-results-time">
            {hasSectionResults && `Page ${currentPage} of results `}({time} seconds)
          </div>
        </div>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {!hasSectionResults && <p className="app-no-results">No results for this section.</p>}
          <div className="search-results">
            {searchResults.map((result, i) => {
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
      )}
    </>
  );
};

export default SearchResults;

SearchResults.propTypes = {
  currentPage: PropTypes.number,
  currentSection: PropTypes.string,
  currentSort: PropTypes.string,
  isLoading: PropTypes.bool,
  pagination: PropTypes.string,
  paginationHandler: PropTypes.func,
  searchQuery: PropTypes.string.isRequired,
  searchResults: PropTypes.array.isRequired,
  sectionHandler: PropTypes.func,
  sortFilterHandler: PropTypes.func,
  time: PropTypes.string,
};
