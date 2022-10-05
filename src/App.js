import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SearchResults from "./components/SearchResults";
import SearchBox from "./components/SearchBox";
import SectionFilters from "./components/SectionFilters";
import SortFilter from "./components/SortFilter";
import Loader from "./components/Loader";
import getSearchData from "./api/getSearchData";
import { DEFAULT_SECTION, DEFAULT_SORT } from "./api/searchVariables";

const App = () => {
  const [searchResults, setSearchResults] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSection, setCurrentSection] = useState(DEFAULT_SECTION);
  const [currentSort, setSort] = useState(DEFAULT_SORT);
  const [time, setTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const callEndpoint = (query, section, sort) => {
    const startTime = performance.now();
    setIsLoading(true);
    getSearchData(query, setIsLoading, setSearchResults, section, sort);
    const endTime = performance.now();
    setTime(((endTime - startTime) / 1000).toFixed(4));
  };

  const inputChangeHandler = (value) => {
    // handles updating search results on clearing the input
    setSearchResults(value);
    setSearchQuery(value);
    setTime("");
    setCurrentSection(DEFAULT_SECTION);
    setSort(DEFAULT_SORT);
  };

  const searchHandler = (value) => {
    setCurrentSection(DEFAULT_SECTION);
    setSort(DEFAULT_SORT);
    setSearchQuery(value);
    callEndpoint(value, DEFAULT_SECTION, DEFAULT_SORT);
  };

  const sectionHandler = (section) => {
    if (currentSection !== section) {
      setCurrentSection(section);
      callEndpoint(searchQuery, section, currentSort);
    }
  };

  const sortFilterHandler = (sort) => {
    setSort(sort);
    callEndpoint(searchQuery, currentSection, sort);
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
                  <div className="app-number-results">({time} seconds)</div>
                </div>
              )}
              <SearchResults
                results={searchResults}
                searchQuery={searchQuery}
                sectionHandler={sectionHandler}
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
