// if date is within this week, it will have a different format than older dates
export const isDateThisWeek = (date) => {
  const then = new Date(date);
  const now = new Date();
  const msBetweenDates = Math.abs(then - now);
  const oneDayMs = 24 * 60 * 60 * 1000;
  const daysBetweenDates = msBetweenDates / oneDayMs;
  const numOfDays = Math.round(msBetweenDates / oneDayMs);

  // formats date in hours, i.e. 1 hour ago
  if (numOfDays === 0) {
    const msInHour = 1000 * 60 * 60;
    const hours = Math.round(Math.abs(then - now) / msInHour);
    const hourReturnValue = hours <= 1 ? `1 hour ago` : `${hours} hours ago`;
    return hourReturnValue;
  }

  // formats date in days, i.e. 1 day ago
  if (daysBetweenDates <= 7) {
    const dayReturnValue = numOfDays <= 1 ? `${numOfDays} day ago` : `${numOfDays} days ago`;
    return dayReturnValue;
  }
  return false;
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
