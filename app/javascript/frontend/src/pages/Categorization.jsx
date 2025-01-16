import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AnimeItem from '../components/Card/AnimeItem';
import Paginate from '../components/Paginate';
import LoadingCard from '../components/Loading/LoadingCard';

export default function Categorization() {
  const location = useLocation();
  const entireUrl = location.pathname + location.search;
  const [currentCategory, setCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [watchList, setWatchList] = useState([]);
  const abortController = new AbortController();
  const query = location.pathname === '/anime/search' ? location.search.split("?query=")[1].split("&page=")[0] : '';

  // Fetch category
  useEffect(() => {
    const fetchCategory = async () => {
      const res = await fetch(`/api${entireUrl}`);
      const categoryData = await res.json();
      setLoading(false);
      setCategory({...categoryData.data});
      if (categoryData.watch_list?.length > 0) setWatchList(categoryData.watch_list);
    }
    fetchCategory();
    
    return () => {
      setLoading(true);
      abortController.abort();
    };
  }, [location.pathname, location.search]);

  function fakeLoadCards() {
    return (
      Array.from({length: 5}).map((_, i) => (
        <LoadingCard key={i} />
      ))
    )
  }

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
                ? fakeLoadCards()
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
              ? fakeLoadCards()
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