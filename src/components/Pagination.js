import React from "react";
import PropTypes from "prop-types";
import "./Paging.css";
const Pagination = ({ videosPerPage, totalVideos, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalVideos / videosPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((num) => (
          <li key={num} className="page-item">
            <a
              onClick={() => paginate(num)}
              href="!#"
              className="page-selected"
            >
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
  videosPerPage: PropTypes.any,
  totalVideos: PropTypes.any,
  paginate: PropTypes.any,
};
