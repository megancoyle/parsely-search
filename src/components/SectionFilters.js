import PropTypes from "prop-types";
import "./SectionFilters.css";
import { SECTION_FILTERS } from "../helpers/searchVariables";
import useSearchContext from "../hooks/useSearchContext";

const SectionFilters = ({ currentSection }) => {
  const { sectionHandler } = useSearchContext();

  const handleSectionFilter = (e, section) => {
    e.preventDefault();
    sectionHandler(section);
  };

  return (
    <div className="section-filters" data-testid="section-filters">
      {SECTION_FILTERS.map((item) => {
        return (
          <div
            key={item.label}
            className={
              currentSection === item.section ? "section-filter-active" : "section-filter"
            }>
            <a
              href={item.section}
              aria-label={`${item.label} Section Results`}
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
  currentSection: PropTypes.string.isRequired,
};
