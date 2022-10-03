import React from "react";
import PropTypes from "prop-types";
import "./SearchResultCard.css";

const SearchResultCard = ({ result, searchQuery, sectionHandler }) => {
  const { breadcrumb, date, description, section, thumbnail, title, url } =
    result;

  const handleClick = (e, section) => {
    e.preventDefault();
    sectionHandler(section);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  // global search regex that returns all matches of string
  const regexEscape = (text) => text.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");

  // bold search term when it appears in a given string of text
  const makeBold = (query) => (text) => {
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

  return (
    <div className="search-result-card">
      <a
        className="search-result-title-link"
        href={url}
        target="_blank"
        rel="noreferrer"
      >
        <h2 className="search-result-title">{makeBold(searchQuery)(title)}</h2>
      </a>
      <p className="search-result-breadcrumb">{breadcrumb}</p>
      {thumbnail && (
        <a href={url} target="_blank" rel="noreferrer">
          <img
            className="search-result-thumbnail"
            src={thumbnail}
            alt={title}
          />
        </a>
      )}
      <div className="search-result-description">
        <span className="search-result-date">{date}</span>
        ... {makeBold(searchQuery)(description)}
      </div>
      <p className="search-result-label">
        Labeled
        <a
          href={section}
          className="search-result-label-link"
          onClick={(e) => {
            handleClick(e, section);
          }}
        >
          {section}
        </a>
      </p>
    </div>
  );
};

export default SearchResultCard;

SearchResultCard.propTypes = {
  result: PropTypes.object.isRequired,
  searchQuery: PropTypes.string.isRequired,
  sectionHandler: PropTypes.func.isRequired,
};
