import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import AnimeItem from '../components/Card/AnimeItem';
import Paginate from '../components/Paginate';

export default function Categorization() {
  const location = useLocation();
  const entireUrl = location.pathname + location.search;
  const [currentCategory, setCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [watchList, setWatchList] = useState([]);
  const abortController = new AbortController();
  const query = location.pathname === '/anime/search' ? location.search.split("?query=")[1].split("&page=")[0] : '';

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await fetch(`/api${entireUrl}`);
      const categoryData = await res.json();
      // console.log(location.pathname, location.search, entireUrl, categoryData);
      setLoading(false);
      location.pathname === '/anime/search' ? setCategory({...categoryData}) : setCategory({...categoryData.data});;
      if (categoryData.watch_list?.length > 0) setWatchList(categoryData.watch_list);
    }
    
    fetchCategory();
    
    return () => {
      setLoading(true);
      abortController.abort();
    };
  }, [location.pathname, location.search]);

  return (
    <section className="p-2 md:p-4">
      {
        location.pathname === '/anime/search' ?
        <>
          <div className="flex flex-col justify-start">
            <h1 className="text-2xl font-bold mb-4 w-full p-2">
              Search results for: { query }
            </h1>
            <div className="flex flex-wrap justify-center gap-4">
              {
                loading
                ? <Loading />
                : currentCategory.animes && currentCategory?.animes.map(item =>
                  <AnimeItem item={item} key={item.id} bookmarked={watchList}/>
                )
              }
            </div>
          </div>
          <Paginate pages={currentCategory.totalPages} />
        </>
      :
      <>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mb-4 w-full p-2">
            {currentCategory.category ? currentCategory.category : currentCategory.genreName}
          </h1>
          <div className="flex flex-wrap justify-center gap-4">
            {
              loading
              ? <Loading />
              : currentCategory.animes && currentCategory?.animes.map(item =>
                <AnimeItem item={item} key={item.id} bookmarked={watchList}/>
              )
            }
          </div>
        </div>
        <Paginate pages={currentCategory.totalPages} />
      </>
      }
    </section>
  )
}