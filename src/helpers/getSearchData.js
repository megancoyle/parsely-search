import axios from "axios";
import { formatDate } from "./dateUtils";
import { formatBreadcrumb, formatDescription } from "./textUtils";
import { DEFAULT_SECTION, DEFAULT_SORT } from "./searchVariables";

const getSearchData = (
  query,
  setIsLoading,
  setResults,
  section = DEFAULT_SECTION,
  sorting = DEFAULT_SORT
) => {
  const baseUrl = `https://api.parsely.com/v2/search?apikey=arstechnica.com&q=${query}`;
  const sectionFilter =
    section === DEFAULT_SECTION ? "" : `&section=${encodeURIComponent(section)}`;
  const sortFilter = `&sort=${sorting}`;
  const url = baseUrl + sectionFilter + sortFilter;

  axios(url)
    .then((res) =>
      res.data.data.map((item) => ({
        title: item.title,
        breadcrumb: formatBreadcrumb(item.url),
        // TODO: strip out html elements from the returned string
        description: formatDescription(item.metadata),
        date: formatDate(item.pub_date),
        thumbnail: item.thumb_url_medium,
        url: item.url,
        section: item.section,
      }))
    )
    .then((data) => {
      setResults(data);
      setIsLoading(false);
    })
    .catch(() => {
      setIsLoading(false);
    });
};

export default getSearchData;
