import PropTypes from "prop-types";
import "./Pagination.css";
import useSearchContext from "../hooks/useSearchContext";

const Pagination = ({ pageNumber, pagination }) => {
  const { paginationHandler } = useSearchContext();
  const isNotFirstPage = pageNumber > 1;
  const hasNextPage = pagination !== null;

  const handleNextClick = (e) => {
    e.preventDefault();
    if (hasNextPage) {
      paginationHandler(pageNumber + 1);
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  };

  const handlePreviousClick = (e) => {
    e.preventDefault();
    if (isNotFirstPage) {
      paginationHandler(pageNumber - 1);
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  };

  return (
    <div className="pagination-container">
      <a
        href="previous"
        aria-label="Previous Page of Results"
        className={`${!isNotFirstPage ? "pagination-first-page" : "pagination-previous-page"}`}
        onClick={(e) => {
          handlePreviousClick(e);
        }}>
        ‹ Previous
      </a>
      <div className="pagination">Page {pageNumber} of results</div>
      <a
        href="next"
        aria-label="Next Page of Results"
        className={`${!hasNextPage ? "pagination-last-page" : "pagination-next-page"}`}
        onClick={(e) => {
          handleNextClick(e);
        }}>
        Next ›
      </a>
    </div>
  );
};
export default Pagination;

Pagination.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  pagination: PropTypes.string,
};
