import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { DEFAULT_PAGE_NUMBER, DEFAULT_SECTION, DEFAULT_SORT } from "../helpers/searchVariables";
import getSearchData from "../helpers/getSearchData";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [currentSection, setSection] = useState(DEFAULT_SECTION);
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
    setSection(DEFAULT_SECTION);
    setSort(DEFAULT_SORT);
    setPageNumber(DEFAULT_PAGE_NUMBER);
  };

  const searchHandler = (value) => {
    resetFiltersAndPage();
    setSearchQuery(value);
    callEndpoint(value, DEFAULT_SECTION, DEFAULT_SORT, DEFAULT_PAGE_NUMBER);
  };

  const sectionHandler = (value) => {
    if (currentSection !== value) {
      setSection(value);
      setPageNumber(DEFAULT_PAGE_NUMBER);
      callEndpoint(searchQuery, value, currentSort, DEFAULT_PAGE_NUMBER);
    }
  };

  const sortFilterHandler = (value) => {
    setSort(value);
    setPageNumber(DEFAULT_PAGE_NUMBER);
    callEndpoint(searchQuery, currentSection, value, DEFAULT_PAGE_NUMBER);
  };

  const context = {
    currentSection,
    currentSort,
    isLoading,
    pageNumber,
    pagination,
    searchResults,
    searchQuery,
    time,
    inputChangeHandler,
    paginationHandler,
    searchHandler,
    sectionHandler,
    sortFilterHandler,
  };

  return <SearchContext.Provider value={context}>{children}</SearchContext.Provider>;
};

export { SearchContext, SearchProvider };

SearchProvider.propTypes = {
  children: PropTypes.object,
};
