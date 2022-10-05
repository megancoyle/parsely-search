import PropTypes from "prop-types";
import "./SectionFilters.css";
import { SECTION_FILTERS } from "../api/searchVariables";

const SectionFilters = ({ sectionHandler, currentSection }) => {
  const handleSectionFilter = (e, section) => {
    e.preventDefault();
    sectionHandler(section);
    currentSection = section;
  };

  return (
    <div className="section-filters">
      {SECTION_FILTERS.map((item) => {
        return (
          <div
            key={item.label}
            className={
              currentSection === item.section ? "section-filter-active" : "section-filter"
            }>
            <a
              href={item.section}
              className="section-filter-link"
              onClick={(e) => {
                handleSectionFilter(e, item.section);
              }}>
              {item.label}
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default SectionFilters;

SectionFilters.propTypes = {
  sectionHandler: PropTypes.func.isRequired,
  currentSection: PropTypes.string.isRequired,
};
