import React from "react";

const Pagination = ({ cardsPerPage, totalCards, paginate, curretPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    if (i < curretPage + 4 && i > curretPage - 4) {
      pageNumbers.push(i);
    }
  }

  return (
    <div className="pagination">
      {pageNumbers.map((number) => (
        <button
          className="pagination__button"
          onClick={() => paginate(number)}
          key={number}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
