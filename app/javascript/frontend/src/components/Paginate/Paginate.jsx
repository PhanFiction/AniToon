import React from 'react';
import Pagination from 'rc-pagination';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Paginate({ pages=1 }) {
  const location = useLocation();
  const url = location.pathname;
  const navigate = useNavigate();

  let currentPage = location.search.split('='); // remove '=' from url
  currentPage = currentPage[currentPage.length - 1]; // get last page number in the array

  const query = location.pathname === '/anime/search' ? location.search.split("?query=")[1].split("&page=")[0] : '';

  // Change the url to be the new page.
  const handlePageChange = (page) => {
    if (query !== '') {
      navigate(`${url}?query=${query}&page=${page}`);
    } else {
      navigate(`${url}?page=${page}`);
    }
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
