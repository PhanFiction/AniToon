import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import AnimeItem from '../components/Card/AnimeItem';

export default function WatchList() {
  const [watchList, setWatchList] = useState([]);
  const [loading, setLoading] = useState(false);
  const abortController = new AbortController();
  
  useEffect(() => {
    const fetchWatchList = async () => {
      const res = await fetch(`/api/bookmarks`);
      const watchListData = await res.json();
      //console.log(watchListData);
      setWatchList(watchListData);
    }
    fetchWatchList();

    return () => {
      setLoading(true);
      abortController.abort();
    };
  }, []);

  return (
    <section className="p-2 md:p-4">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold mb-4 w-full p-2">
          Watch List
        </h1>
        <div className="flex flex-wrap justify-center gap-4">
          {
            loading
            ? <Loading />
            : watchList && watchList?.map(item =>
              <AnimeItem item={item} key={item.id} bookmarked={watchList} />
            )
          }
        </div>
      </div>
    </section>
  )
}
