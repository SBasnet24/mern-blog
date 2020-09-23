import React, { useContext } from "react";
import _ from "lodash";
import { BlogContext } from "./../../../Context/Blog/blogContext";

const Pagination = ({ itemsCount }) => {
  const { pageSize, handlePageChange, currentPage } = useContext(BlogContext);

  // based on aauta page ma kati ota item we set kati ota page
  const pagesCount = Math.ceil(itemsCount / pageSize);
  // making array from range to pagesCount using lodash
  const pages = _.range(1, pagesCount + 1);

  if (pagesCount === 1) return null;
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <button
              onClick={() => handlePageChange(page)}
              className="page-link"
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
