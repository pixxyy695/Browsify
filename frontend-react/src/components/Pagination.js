import React from 'react';
import './Pagination.css';

function Pagination({ currentPage, hasNextPage, onNext, onPrev }) {
  return (
    <div className="pagination">
      <button
        onClick={onPrev}
        className="btn btn-secondary"
        disabled={currentPage === 0}
      >
        ← Previous
      </button>
      <span className="page-info">Page {currentPage + 1}</span>
      <button
        onClick={onNext}
        className="btn btn-primary"
        disabled={!hasNextPage}
      >
        Next →
      </button>
    </div>
  );
}

export default Pagination;
