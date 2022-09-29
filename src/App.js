import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import SearchResults from './components/SearchResults';
import SearchBox from './components/SearchBox';
import getSearchData from './api/getSearchData';

const App = () => {
  const [searchValue, setSearchValue] = useState("");

  const searchHandler = (value) => {
    getSearchData(value, setSearchValue);
  };

  return (
    <div className="app">
      <div className="app-wrapper">
        <Header />
        <div className="app-content">
          <SearchBox searchHandler={searchHandler} />
          {searchValue !== '' &&
            <SearchResults results={searchValue} />
          }
        </div>
      </div>
    </div>
  );
}

export default App;
