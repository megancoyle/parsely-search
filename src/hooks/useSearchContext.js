import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

const useSearchContext = () => {
  return useContext(SearchContext);
};

export default useSearchContext;
