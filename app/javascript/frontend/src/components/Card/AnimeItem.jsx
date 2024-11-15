import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AnimeCard from './AnimeCard';
import { IoAdd, IoRemove } from "react-icons/io5";
import fetchCSRFToken from '../../utils/fetchCSRFToken';
import { AlertContext } from '../../context';

// Component needs to be refactored in the future. 
// Component code is tightly coupled with bookmark.
export default function AnimeItem({ item, bookmarked=[] }) {
  const location = useLocation();
  const foundBookmark = bookmarked.find(bookmark => bookmark.anime_id === item.id); // Search bookmark by default
  const [isBookmarked, setBookmarked] = useState(location.pathname === '/watchlist' ? true : foundBookmark ? true : false); // set state to be true or false if bookmark exists
  const [watchList, setWatchList] = useState(bookmarked);
  const { setAlertType, setAlertMessage } = useContext(AlertContext);

  const saveAnime = async (e) => {
    e.preventDefault();
    const csrfToken = fetchCSRFToken();

    if (isBookmarked) {
      const requestOptions = {
        method: 'DELETE',
        headers: { 
          'X-CSRF-Token': csrfToken, // Include CSRF token in the headers
          'Content-Type': 'application/json',
        },
      };
      // Look for bookmark if user has clicked add to watch list 
      const bookmark = watchList.find(bookmark => bookmark.anime_id === item.id);
      // if the url is watchlist, then display bookmark id and not the anime id.
      // Bookmark.id is going to refer to the anime id
      const res = await fetch(`/api/bookmarks/${location.pathname === '/watchlist' ? item.id : bookmark.id}`, requestOptions);
      const bookmarkData = await res.json();
      if (bookmarkData.success) {
        // console.log('success ', bookmarkData);
        setBookmarked(false);
        setAlertMessage(bookmarkData.success);
        setAlertType('success');
        setWatchList([bookmarkData]);
      }
    } else {
      // Create new bookmark
      const newBookmark = {
        anime_id: item.id,
        mal_id: item.malId,
        name: item.name,
        poster: item.poster,
        description: item.description,
        rating: item.malscore ? item.malscore : 0,
        duration: item.stats ? item.stats.duration : 0
      }
      // make a post request
      const requestOptions = {
        method: 'POST',
        headers: { 
          'X-CSRF-Token': csrfToken, // Include CSRF token in the headers
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBookmark)
      };
  
      const res = await fetch('/api/bookmarks', requestOptions);
      const bookmarkData = await res.json();
      if (bookmarkData.success) {
        // console.log('deleted ', bookmarkData);
        setAlertMessage(bookmarkData.success);
        setAlertType('success');
        setBookmarked(true);
        setWatchList([bookmarkData]);
      }
    }
  }

  return (
    <div className="relative group hover:-translate-y-1 duration-500">
      <Link to={`/anime/info?id=${location.pathname === '/watchlist' ? item.anime_id : item.id}`} className="flex w-32 h-52 md:w-44 lg:h-64 mb-8 z-10">
        <AnimeCard showType={item.showType} backgroundImg={item.poster} title={item.jname ? item.jname : item.name} />
      </Link>
      <button 
        className="absolute top-1 right-1 hover:cursor-pointer opacity-0 group-hover:opacity-100 bg-black/60 hover:text-red p-1 rounded-md" 
        onClick={saveAnime}
      >
        {
          isBookmarked
          ?
          <IoRemove className="opacity-0 duration-300 group-hover:opacity-100 rounded-md" />
          :
          <IoAdd className="opacity-0 duration-300 group-hover:opacity-100 rounded-md" />
        }
      </button>
    </div>
  )
}
