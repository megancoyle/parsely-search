import axios from "axios";

const isDateThisWeek = (date) => {
  const then = new Date(date);
  const now = new Date();
  const msBetweenDates = Math.abs(then - now);
  const oneDayMs = 24 * 60 * 60 * 1000;
  const daysBetweenDates = msBetweenDates / oneDayMs;
  const numOfDays = Math.round(msBetweenDates / oneDayMs);

  if (numOfDays === 0) {
    const hours = then.getHours();
    const hourReturnValue =
      hours <= 1 ? `${hours} hour ago` : `${hours} hours ago`;
    return hourReturnValue;
  }

  if (daysBetweenDates <= 7) {
    const dayReturnValue =
      numOfDays <= 1 ? `${numOfDays} day ago` : `${numOfDays} days ago`;
    return dayReturnValue;
  }
  return false;
};

const formatBreadcrumb = (string) => {
  try {
    const formattedText = string
      .replace(/(http|https):\/\/arstechnica.com\//g, "Ars Technica › ")
      .replace("/?itm_source=parsely-api", "")
      .replace(/\//, " › ")
      .replace(/\/(?=[^/]*$)/, " › ");
    return formattedText;
  } catch (e) {
    return "Ars Technica";
  }
};

const formatDate = (date) => {
  const dateIsThisWeek = isDateThisWeek(date);
  if (dateIsThisWeek !== false) {
    return dateIsThisWeek;
  } else {
    return new Date(date).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
};

// if the json string is invalid this currently returns an empty string
// it would be ideal to sanitize the json string somehow so results
// associated with problematic strings would still return a description
// instead of the empty string
const formatDescription = (text) => {
  if (text) {
    try {
      return JSON.parse(text).lower_deck;
    } catch (e) {
      return "";
    }
  }
};

const getSearchData = (
  query,
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
    });
};

export default getSearchData;
