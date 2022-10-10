import PropTypes from "prop-types";
import "./Autocomplete.css";

const Autocomplete = ({ active, filtered, handleOnClick, showAutocomplete }) => {
  if (showAutocomplete && filtered.length) {
    return (
      <ul className="autocomplete">
        {filtered.map((suggestion, index) => {
          return (
            <li
              className={index === active ? "active" : null}
              key={suggestion}
              onClick={(e) => {
                handleOnClick(e);
              }}>
              {suggestion}
            </li>
          );
        })}
      </ul>
    );
  }
  return;
};

export default Autocomplete;

Autocomplete.propTypes = {
  active: PropTypes.number,
  filtered: PropTypes.array,
  handleOnClick: PropTypes.func,
  inputChangeHandler: PropTypes.func,
  showAutocomplete: PropTypes.bool,
};
