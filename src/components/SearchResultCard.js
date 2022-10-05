import React from "react";
import PropTypes from "prop-types";
import "./SearchResultCard.css";
import { DEFAULT_IMAGE_URL } from "../helpers/searchVariables";
import { makeBold } from "../helpers/textUtils";

const SearchResultCard = ({ result, searchQuery, sectionHandler }) => {
  const { breadcrumb, date, description, section, thumbnail, title, url } = result;

  const addDefaultSrc = (e) => {
    e.target.src = DEFAULT_IMAGE_URL;
  };

  const handleClick = (e, section) => {
    e.preventDefault();
    sectionHandler(section);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  return (
    <div className="search-result-card">
      <a className="search-result-title-link" href={url} target="_blank" rel="noreferrer">
        <h2 className="search-result-title">{makeBold(searchQuery)(title)}</h2>
      </a>
      <p className="search-result-breadcrumb">{breadcrumb}</p>
      <a href={url} target="_blank" rel="noreferrer">
        <img
          className="search-result-thumbnail"
          src={thumbnail ? thumbnail : DEFAULT_IMAGE_URL}
          onError={addDefaultSrc}
          alt={title}
        />
      </a>
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
          }}>
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
