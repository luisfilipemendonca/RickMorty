import React from "react";

import "./index.css";

const selectStart = (currentPage, paginationQtty, lastPage) => {
  let start = 1;

  if (
    currentPage >= paginationQtty &&
    currentPage <= lastPage - (paginationQtty - 1)
  ) {
    start = currentPage - 1;
  }

  if (
    currentPage > lastPage - (paginationQtty - 1) &&
    lastPage > paginationQtty
  ) {
    start = lastPage - (paginationQtty - 1);
  }

  return start;
};

const buildPaginationArr = (startPage, lastPage, qtty, ellipsisPos) => {
  const pages = [];

  if (ellipsisPos === "begin" || ellipsisPos === "both") {
    pages.push(...[1, "..."]);
  }

  for (let i = 0; i < qtty; i++) {
    pages.push(startPage + i);
  }

  if (ellipsisPos === "end" || ellipsisPos === "both") {
    pages.push(...["...", lastPage]);
  }

  return pages;
};

const Pagination = ({
  dataAmount,
  currentPage,
  pageChangeHandler,
  dataPerPage,
  paginationQtty,
}) => {
  const lastPage = Math.ceil(dataAmount / dataPerPage);
  const middleQtty = 3;

  const start = selectStart(currentPage, paginationQtty, lastPage);
  let pagesArr;

  buildPaginationArr(1, 34, 5, null);

  if (currentPage < paginationQtty && lastPage > paginationQtty) {
    pagesArr = buildPaginationArr(start, lastPage, paginationQtty, "end");
  } else if (lastPage <= paginationQtty) {
    pagesArr = buildPaginationArr(start, lastPage, lastPage, null);
  } else if (
    currentPage >= paginationQtty &&
    currentPage <= lastPage - (paginationQtty - 1)
  ) {
    pagesArr = buildPaginationArr(start, lastPage, middleQtty, "both");
  } else {
    pagesArr = buildPaginationArr(start, lastPage, paginationQtty, "begin");
  }

  const btns = pagesArr.map((page) => {
    return isNaN(page) ? (
      <div className="pagination__item pagination__item--empty">&#8230;</div>
    ) : (
      <button
        onClick={() => pageChangeHandler(page)}
        className={`pagination__item ${
          currentPage === page ? "pagination__item--selected" : null
        }`}
      >
        {page}
      </button>
    );
  });

  return <div className="container-flex-center">{btns}</div>;
};

export default Pagination;
