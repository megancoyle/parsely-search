import React from "react";
import "./App.css";
import { DEFAULT_SECTION } from "./helpers/searchVariables";
import Header from "./components/Header";
import Loader from "./components/Loader";
import SearchBox from "./components/SearchBox";
import SearchResults from "./components/SearchResults";
import useSearchContext from "./hooks/useSearchContext";

const App = () => {
  const { currentSection, isLoading, searchQuery, searchResults } = useSearchContext();

  const isNoResults =
    searchResults.length === 0 && searchQuery !== "" && currentSection === DEFAULT_SECTION;
  const isResults = searchQuery !== "" && !isNoResults;

  return (
    <div className="app">
      <div className="app-wrapper">
        <Header />
        <div className="app-content">
          <SearchBox />
          {isResults && <SearchResults searchResults={searchResults} />}
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
