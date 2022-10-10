import PropTypes from "prop-types";
import "./Pagination.css";

const Pagination = ({ currentPage, pagination, paginationHandler }) => {
  const isNotFirstPage = currentPage > 1;
  const hasNextPage = pagination !== null;

  const handleNextClick = (e) => {
    e.preventDefault();
    if (hasNextPage) {
      paginationHandler(currentPage + 1);
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  };

  const handlePreviousClick = (e) => {
    e.preventDefault();
    if (isNotFirstPage) {
      paginationHandler(currentPage - 1);
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
      <div className="pagination">Page {currentPage} of results</div>
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
  currentPage: PropTypes.number.isRequired,
  pagination: PropTypes.string,
  paginationHandler: PropTypes.func,
};
