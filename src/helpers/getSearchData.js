import axios from "axios";
import { DEFAULT_PAGE_NUMBER, DEFAULT_SECTION, DEFAULT_SORT } from "./searchVariables";
import { formatDate } from "./dateUtils";
import { formatBreadcrumb, formatDescription } from "./textUtils";

// setIsLoading, setResults, setPagination callbacks are passed to update
// the current state of loading/results/pagination located in App.js
const getSearchData = (
  query,
  setIsLoading,
  setResults,
  setPagination,
  pageNumber = DEFAULT_PAGE_NUMBER,
  section = DEFAULT_SECTION,
  sorting = DEFAULT_SORT
) => {
  const baseUrl = `https://api.parsely.com/v2/search?apikey=arstechnica.com&q=${query}`;
  const sectionFilter =
    section === DEFAULT_SECTION ? "" : `&section=${encodeURIComponent(section)}`;
  const sortFilter = `&sort=${sorting}`;
  const page = `&page=${pageNumber}`;
  const url = baseUrl + sectionFilter + sortFilter + page;

  axios(url)
    .then((res) => {
      const pagination = res.data.links;
      const dataResponse = res.data.data.map((item) => ({
        title: item.title,
        breadcrumb: formatBreadcrumb(item.url),
        description: formatDescription(item.metadata),
        date: formatDate(item.pub_date),
        thumbnail: item.thumb_url_medium,
        url: item.url,
        section: item.section,
      }));
      return { pagination: pagination.next, response: dataResponse };
    })
    .then((data) => {
      setPagination(data.pagination);
      setResults(data.response);
      setIsLoading(false);
    })
    .catch(() => {
      setIsLoading(false);
    });
};

export default getSearchData;
