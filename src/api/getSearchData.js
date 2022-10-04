import axios from "axios";
import { formatBreadcrumb, formatDate, formatDescription } from "./searchUtils";

const getSearchData = (
  query,
  setIsLoading,
  setResults,
  section = "All",
  sorting = "score"
) => {
  const baseUrl = `https://api.parsely.com/v2/search?apikey=arstechnica.com&q=${query}`;
  const sectionFilter =
    section === "All" ? "" : `&section=${encodeURIComponent(section)}`;
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
