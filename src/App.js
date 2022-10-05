import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Loader from "./components/Loader";
import SearchResults from "./components/SearchResults";
import SearchBox from "./components/SearchBox";
import SectionFilters from "./components/SectionFilters";
import SortFilter from "./components/SortFilter";
import getSearchData from "./helpers/getSearchData";
import { DEFAULT_PAGE_NUMBER, DEFAULT_SECTION, DEFAULT_SORT } from "./helpers/searchVariables";

const App = () => {
  const [searchResults, setSearchResults] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSection, setCurrentSection] = useState(DEFAULT_SECTION);
  const [currentSort, setSort] = useState(DEFAULT_SORT);
  const [time, setTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER);

  const callEndpoint = (query, section, sort, page) => {
    const startTime = performance.now();
    setIsLoading(true);
    getSearchData(query, setIsLoading, setSearchResults, setPagination, page, section, sort);
    const endTime = performance.now();
    setTime(((endTime - startTime) / 1000).toFixed(4));
  };

  const paginationHandler = (value) => {
    setPageNumber(value);
    callEndpoint(searchQuery, currentSection, currentSort, value);
  };

  const inputChangeHandler = (value) => {
    // handles updating search results on clearing the input
    setSearchResults(value);
    setSearchQuery(value);
    setTime("");
    setCurrentSection(DEFAULT_SECTION);
    setSort(DEFAULT_SORT);
    setPageNumber(DEFAULT_PAGE_NUMBER);
  };

  const searchHandler = (value) => {
    setCurrentSection(DEFAULT_SECTION);
    setSort(DEFAULT_SORT);
    setPageNumber(DEFAULT_PAGE_NUMBER);
    setSearchQuery(value);
    callEndpoint(value, DEFAULT_SECTION, DEFAULT_SORT, DEFAULT_PAGE_NUMBER);
  };

  const sectionHandler = (section) => {
    if (currentSection !== section) {
      setCurrentSection(section);
      setPageNumber(DEFAULT_PAGE_NUMBER);
      callEndpoint(searchQuery, section, currentSort, DEFAULT_PAGE_NUMBER);
    }
  };

  const sortFilterHandler = (sort) => {
    setSort(sort);
    setPageNumber(DEFAULT_PAGE_NUMBER);
    callEndpoint(searchQuery, currentSection, sort, DEFAULT_PAGE_NUMBER);
  };

  const isNoResults =
    searchResults.length === 0 && searchQuery !== "" && currentSection === DEFAULT_SECTION;
  const isResults = searchQuery !== "" && !isNoResults;
  const isSortFilterVisible = searchResults.length > 0;

  return (
    <div className="app">
      <div className="app-wrapper">
        <Header />
        <div className="app-content">
          <SearchBox searchHandler={searchHandler} inputChangeHandler={inputChangeHandler} />
          {isResults && (
            <>
              <SectionFilters sectionHandler={sectionHandler} currentSection={currentSection} />
              {isSortFilterVisible && (
                <div className="app-number-results-container">
                  <SortFilter sortFilterHandler={sortFilterHandler} currentSort={currentSort} />
                  <div className="app-number-results">
                    {isSortFilterVisible && `Page ${pageNumber} of results `}({time} seconds)
                  </div>
                </div>
              )}
              <SearchResults
                results={searchResults}
                searchQuery={searchQuery}
                sectionHandler={sectionHandler}
                currentPage={pageNumber}
                pagination={pagination}
                paginationHandler={paginationHandler}
              />
            </>
          )}
          {isLoading && isNoResults && <Loader />}
          {!isLoading && isNoResults && (
            <p className="app-no-results">No results. Try searching for something else.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
