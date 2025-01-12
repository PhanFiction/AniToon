import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import { BsBadgeCc } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import fetchCSRFToken from '../utils/fetchCSRFToken';

export default function Anime() {
  const location = useLocation();
  const entireUrl = location.pathname + location.search;
  const [anime, setAnime] = useState({});
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setBookmarked] = useState(false);
  const abortController = new AbortController();

  useEffect(() => {
    const fetchAnime = async () => {
      const data = await fetch(`/api${entireUrl}`);
      const animeData = await data.json();

      setLoading(false);
      setAnime({...animeData.data, bookmark: animeData.watch_list});
      if (animeData.watch_list?.length > 0) setBookmarked(true);
    }

    fetchAnime();

    return () => {
      setLoading(true);
      abortController.abort();
    };
  }, [location.search]);

  const saveAnime = async (e) => {
    e.preventDefault();
    const csrfToken = fetchCSRFToken();
    if (isBookmarked) {
      const csrfToken = fetchCSRFToken();
      const requestOptions = {
        method: 'DELETE',
        headers: { 
          'X-CSRF-Token': csrfToken, // Include CSRF token in the headers
          'Content-Type': 'application/json',
        },
      };
  
      const res = await fetch(`/api/bookmarks/${anime.bookmark[0].id}`, requestOptions);
      const bookmarkData = await res.json();
      if (bookmarkData.success) {
        setBookmarked(false);
        setAnime({...anime, bookmark: []});
      }
    } else {
      const { info, moreInfo } = anime;
      const newBookmark = {
        anime_id: info.id,
        mal_id: info.malId,
        name: info.name,
        poster: info.poster,
        description: info.description,
        rating: moreInfo.malscore,
        duration: info.stats.duration
      }
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
        setBookmarked(true);
        setAnime({...anime, bookmark: [bookmarkData.data]});
      }
    }
  }

  return (
    <article className="flex flex-col lg:flex-row justify-center py-24 gap-4 bg-midnightBlue backdrop-blur-[6px]">
      {
        loading 
        ? <Loading />
        :
        <>
          <div className="flex flex-col md:flex-row w-full gap-4">
            <div className="flex justify-center w-full md:w-2/6 lg:w-2/6">
              <img src={anime.info.poster} alt={anime.info.poster} className="w-60 md:h-72 object-cover" />
            </div>
            <div className="flex flex-col gap-4 w-full lg:w-5/6">
              <h1 className="md:w-2/3 text-2xl lg:text-3xl font-bold text-center md:text-start">
                {anime.info.name}
              </h1>
              <ul className="flex justify-center md:justify-start gap-1 text-xs">
                <li className="rounded-md border py-1 px-2 bg-white text-black">{anime.info.stats.rating}</li>
                <li className="rounded-md border py-1 px-2 bg-lightPink text-black">{anime.info.stats.quality}</li>
                <li className="rounded-md border py-1 px-2 flex items-center gap-1 bg-lightGreen text-black"><BsBadgeCc className="text-lg"/>{anime.info.stats.episodes.sub}</li>
                <li className="rounded-md border py-1 px-2 flex items-center gap-1 bg-lightBlue text-black"><FaMicrophone className=""/>{anime.info.stats.episodes.dub}</li>
                <ul className="flex ml-5 gap-4 list-disc">
                  <li className="pr-2 py-2">{anime.info.stats.type}</li>
                  <li className="pr-2 py-2">{anime.info.stats.duration}</li>
                </ul>
              </ul>
              <div className="flex justify-center md:justify-start gap-4">
                <Link to={`/anime/watch/${anime.info.id}`} className="text-lg border rounded-md p-2">
                  Watch Now
                </Link>
                <button className="text-lg border rounded-md p-2" onClick={saveAnime}>
                  { isBookmarked ? "Remove" : "Add to List" }
                </button>
              </div>
              <p className="text-sm md:w-5/6 p-4 md:p-0">
                {anime.info.description}
              </p>
            </div>
          </div>

          <ul className="flex flex-col w-full lg:w-2/6 text-sm gap-4 p-4 md:p-0">
            <li><span className="font-bold">Japanese: </span>{anime.moreInfo.japanese}    </li>
            <li><span className="font-bold">Aired: </span>{anime.moreInfo.aired}          </li>
            <li><span className="font-bold">Synonyms: </span>{anime.moreInfo.synonyms}    </li>
            <li><span className="font-bold">Premiered: </span>{anime.moreInfo.premiered}  </li>
            <li><span className="font-bold">Duration: </span>{anime.moreInfo.duration}    </li>
            <li><span className="font-bold">Status: </span>{anime.moreInfo.status}        </li>
            <li><span className="font-bold">MAL Score: </span>{anime.moreInfo.malscore}   </li>
            <li><span className="font-bold">Studios: </span>{anime.moreInfo.studios}      </li>
            <ul className="flex gap-2">
              <span className="font-bold">Producers: </span> 
              {
                anime.moreInfo.producers.map((producer, index) => 
                  <li key={index}>
                    { producer },
                  </li>
                )
              }
            </ul>
          </ul>
        </>

      }
    </article>
  )
}
