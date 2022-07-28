import React from "react";
import PropTypes from "prop-types";
import "./Paging.css";

/**
 *
 * update - 07-28
 * -컴포넌트 재활용을 위한 변수명 변경 (videoPerPage -> componentPerPage)
 */
const Pagination = ({ componentsPerPage, totalComponents, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalComponents / componentsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((num) => (
          <li key={num}>
            <a href="#" className="link" onClick={() => paginate(num)}>
              {num}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

Pagination.propTypes = {
  componentsPerPage: PropTypes.any,
  totalComponents: PropTypes.any,
  paginate: PropTypes.any,
};
