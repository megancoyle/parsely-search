import React from "react";

export const formatBreadcrumb = (string) => {
  try {
    const formattedText = string
      .replace(/https?:\/\/(www\.)?arstechnica.com\//g, "Ars Technica › ")
      .replace(/\/?\?itm_source=parsely-api/, "")
      .replace(/\//, " › ")
      .replace(/\/(?=[^/]*$)/, " › ");
    return formattedText;
  } catch (e) {
    return "Ars Technica";
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

// global search regex that returns all matches of string
export const regexEscape = (text) => text.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");

// bold search term when it appears in a given string of text
export const makeBold = (query) => (text) => {
  try {
    return text
      .split(new RegExp(`(${regexEscape(query)})`, "i"))
      .map((section, i) =>
        i % 2 ? (
          <strong key={i}>{section}</strong>
        ) : (
          <React.Fragment key={i}>{section}</React.Fragment>
        )
      );
  } catch (e) {
    // fallback if there are unexpected characters in searched text
    return text;
  }
};

export const stripOutSpecialCharacters = (text) => {
  return text.replace(/[^a-z0-9 .,_-]/gim, "").trim();
};
