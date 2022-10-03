import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import SearchResults from './components/SearchResults';
import SearchBox from './components/SearchBox';
import SectionFilters from './components/SectionFilters';
import SortFilter from './components/SortFilter';
import getSearchData from './api/getSearchData';
import { DEFAULT_SECTION, DEFAULT_SORT } from './api/searchVariables';

const App = () => {
  const [searchResults, setSearchResults] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSection, setCurrentSection] = useState(DEFAULT_SECTION);
  const [currentSort, setSort] = useState(DEFAULT_SORT);

  const inputChangeHandler = (value) => {
    // handles updating search results on clearing the input
    setSearchResults(value);
    setSearchQuery(value)
    setCurrentSection(DEFAULT_SECTION);
    setSort(DEFAULT_SORT);
  };

  const searchHandler = (value) => {
    setSearchQuery(value);
    getSearchData(value, setSearchResults);
    setCurrentSection(DEFAULT_SECTION);
    setSort(DEFAULT_SORT);
  };

  const sectionHandler = (section) => {
    if (currentSection !== section) {
      setCurrentSection(section);
      getSearchData(searchQuery, setSearchResults, section, currentSort);
    }
  }

  const sortFilterHandler = (value) => {
    getSearchData(searchQuery, setSearchResults, currentSection, value);
    setSort(value);
  }

  const isNoResults = searchResults.length === 0 && searchQuery !== '' && currentSection === DEFAULT_SECTION;
  const isResults = searchQuery !== '' && !isNoResults;
  const isSortFilterVisible = searchResults.length > 0;

  return (
    <div className="app">
      <div className="app-wrapper">
        <Header />
        <div className="app-content">
          <SearchBox searchHandler={searchHandler} inputChangeHandler={inputChangeHandler} />
          {isResults &&
            <>
              <SectionFilters sectionHandler={sectionHandler} currentSection={currentSection}/>
              {isSortFilterVisible && <SortFilter sortFilterHandler={sortFilterHandler} currentSort={currentSort}/>}
              <SearchResults 
                results={searchResults}
                searchQuery={searchQuery} 
                sectionHandler={sectionHandler} 
              />
            </>
          }
          {isNoResults &&
            <p className="app-no-results">No results. Try searching for something else.</p>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
