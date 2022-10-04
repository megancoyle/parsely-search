export const isDateThisWeek = (date) => {
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

export const formatBreadcrumb = (string) => {
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

export const formatDate = (date) => {
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
export const formatDescription = (text) => {
  if (text) {
    try {
      return JSON.parse(text).lower_deck;
    } catch (e) {
      return "";
    }
  }
};

export const stripOutSpecialCharacters = (text) => {
  return text.replace(/[^a-z0-9 .,_-]/gim, "").trim();
};
