import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBox from './components/SearchBox';


const App = () => {
  const [searchValue, setSearchValue] = useState("");

  const searchHandler = (value) => {
    setSearchValue(value);
  };

  return (
    <div className="app">
      <div className="app-wrapper">
        <Header />
        <div className="app-content">
          <SearchBox searchHandler={searchHandler} />
        </div>
      </div>
    </div>
  );
}

export default App;
