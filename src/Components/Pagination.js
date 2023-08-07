import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PaginationWrapper = ({
  recordsPerPage,
  totalRecords,
  paginate,
  currentPage,
}) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
    pages.push(
      <Pagination.Item
        key={i}
        active={i === parseInt(currentPage)}
        onClick={() => paginate(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return <Pagination>{pages}</Pagination>;
};

export default PaginationWrapper;
