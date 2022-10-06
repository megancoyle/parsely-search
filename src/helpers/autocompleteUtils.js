import { PREVIOUS_SEARCH_ID, PREVIOUS_SEARCH_LIMIT } from "./searchVariables";

/**
 * utilities that add most recent searches to localStorage for retrieval
 * so results can be filtered via the input autocomplete
 * instead of using localStorage, static data can also easily get
 * plugged into the SearchBox component
 */
export const addToSearchArray = (item, searchArray) => {
  const updateArray =
    searchArray.length === PREVIOUS_SEARCH_LIMIT ? searchArray.slice(1) : searchArray;
  const arrayWithNewItem = [...updateArray, item];
  return localStorage.setItem(PREVIOUS_SEARCH_ID, JSON.stringify(arrayWithNewItem));
};

export const retrieveData = () => {
  const retrievedData = localStorage.getItem(PREVIOUS_SEARCH_ID);
  return JSON.parse(retrievedData);
};

export const updatePreviousSearches = (newItem) => {
  const retrievedData = localStorage.getItem(PREVIOUS_SEARCH_ID);
  const searchesArray = JSON.parse(retrievedData);
  if (retrievedData === null) {
    return localStorage.setItem(PREVIOUS_SEARCH_ID, JSON.stringify([newItem]));
  }
  if (searchesArray.includes(newItem)) {
    return;
  }
  addToSearchArray(newItem, searchesArray);
};
