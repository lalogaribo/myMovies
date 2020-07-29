import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  const countPages = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, countPages + 1);

  const renderPages = () => {
    if (pages.length === 1) return null;
    return pages.map((page) => {
      return (
        <li
          className={page === currentPage ? "page-item active" : "page-item"}
          key={page}
        >
          <a className="page-link" onClick={() => onPageChange(page)}>
            {page}
          </a>
        </li>
      );
    });
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">{renderPages()}</ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
