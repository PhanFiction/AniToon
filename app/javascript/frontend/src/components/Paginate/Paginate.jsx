import React from 'react';
import Pagination from 'rc-pagination';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Paginate({ pages=1 }) {
  const location = useLocation();
  const url = location.pathname;
  const navigate = useNavigate();

  const currentPage = location.search.split('=')[1];

  const handlePageChange = (page) => {
    navigate(`${url}?page=${page}`);
  };

  return (
    <div className="flex justify-center text-red">
      <Pagination
        className="mt-8 rc-pagnation-item"
        onChange={handlePageChange}
        defaultCurrent={currentPage}
        pageSize={1}
        total={pages}
        onShowSizeChange={false}
        showPrevNextJumpers={false}
        style={{color: '#fff' }}
      />
    </div>
  )
}
