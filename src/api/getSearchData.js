import axios from 'axios';

// if the json string is invalid this currently returns an empty string
// it would be ideal to sanitize the json string somehow so results
// associated with problematic strings would still return a description
// instead of the empty string
const formatDescription = (text) => {
  if (text) {
    try {
      return JSON.parse(text).lower_deck;
    } catch (e) {
      return '';
    }
  }
}

const getSearchData = (query, setResults) => {
  const url = `https://api.parsely.com/v2/search?apikey=arstechnica.com&q=${query}`;

  axios(url)
    .then((res) =>
      res.data.data.map((item) => ({
          title: item.title,
          // TODO: strip out html elements from the returned string
          description: formatDescription(item.metadata),
          date: item.pub_date,
          thumbnail: item.thumb_url_medium,
          url: item.url,
          section: item.section,
        }))
    )
    .then((data) => {
      setResults(data)
    });
};

export default getSearchData;
