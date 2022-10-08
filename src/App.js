import React, { useState } from "react";
import "./App.css";
import { DEFAULT_PAGE_NUMBER, DEFAULT_SECTION, DEFAULT_SORT } from "./helpers/searchVariables";
import getSearchData from "./helpers/getSearchData";
import Header from "./components/Header";
import Loader from "./components/Loader";
import SearchBox from "./components/SearchBox";
import SearchResults from "./components/SearchResults";

// This holds the root of the application's state logic that is managed via useState hooks
// and event handlers
const App = () => {
  const [currentSection, setCurrentSection] = useState(DEFAULT_SECTION);
  const [currentSort, setSort] = useState(DEFAULT_SORT);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER);
  const [pagination, setPagination] = useState(null);
  const [searchResults, setSearchResults] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [time, setTime] = useState("");

  const callEndpoint = (query, section, sort, page) => {
    const startTime = performance.now();
    setIsLoading(true);
    getSearchData(query, setIsLoading, setSearchResults, setPagination, page, section, sort);
    const endTime = performance.now();
    setTime(((endTime - startTime) / 1000).toFixed(4));
  };

  const inputChangeHandler = (value) => {
    // handles updating search results on clearing the input
    setSearchResults(value);
    setSearchQuery(value);
    setTime(value);
    resetFiltersAndPage();
  };

  const paginationHandler = (value) => {
    setPageNumber(value);
    callEndpoint(searchQuery, currentSection, currentSort, value);
  };

  const resetFiltersAndPage = () => {
    setCurrentSection(DEFAULT_SECTION);
    setSort(DEFAULT_SORT);
    setPageNumber(DEFAULT_PAGE_NUMBER);
  };

  const searchHandler = (value) => {
    resetFiltersAndPage();
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

  return (
    <div className="app">
      <div className="app-wrapper">
        <Header />
        <div className="app-content">
          <SearchBox searchHandler={searchHandler} inputChangeHandler={inputChangeHandler} />
          {isResults && (
            <SearchResults
              currentPage={pageNumber}
              currentSection={currentSection}
              currentSort={currentSort}
              isLoading={isLoading}
              pagination={pagination}
              paginationHandler={paginationHandler}
              searchQuery={searchQuery}
              sectionHandler={sectionHandler}
              sortFilterHandler={sortFilterHandler}
              searchResults={searchResults}
              time={time}
            />
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
