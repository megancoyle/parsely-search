import PropTypes from "prop-types";
import "./SearchResults.css";
import Loader from "./Loader";
import Pagination from "./Pagination";
import SectionFilters from "./SectionFilters";
import SearchResultCard from "./SearchResultCard";
import SortFilter from "./SortFilter";
import useSearchContext from "../hooks/useSearchContext";

// Container for SearchResultsCard, SectionFilters, and SortFilter

const SearchResults = ({ searchResults }) => {
  const { currentSection, currentSort, isLoading, pageNumber, pagination, searchQuery, time } =
    useSearchContext();
  const hasSectionResults = searchResults.length > 0;

  return (
    <>
      <SectionFilters currentSection={currentSection} />
      {hasSectionResults && (
        <div className="search-results-time-container">
          <SortFilter currentSort={currentSort} />
          <div className="search-results-time">
            {hasSectionResults && `Page ${pageNumber} of results `}({time} seconds)
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
              return <SearchResultCard key={i} result={result} searchQuery={searchQuery} />;
            })}
          </div>
          {hasSectionResults && <Pagination pageNumber={pageNumber} pagination={pagination} />}
        </>
      )}
    </>
  );
};

export default SearchResults;

SearchResults.propTypes = {
  searchResults: PropTypes.array.isRequired,
};
