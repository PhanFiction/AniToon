import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const categories = ["subbed-anime", "dubbed-anime", "most-popular", "movie", "special", "ova", "ona", "tv"]
const genres = ["action", "adventure", "cars", "comedy", "dementia", "demons", "drama", "ecchi", "fantasy", "game", "harem", "historical", "horror", "josei", "magic", "mecha", "isekai", "kids", "martial-arts", "military", "music", "mystery", "police", "parody", "psychological", "romance", "samurai", "school", "sci-fi", "seinen", "shoujo", "shoujo-ai", "shounen", "shounen-ai", "slice-of-life", "space", "sports", "super-power", "supernatural", "thriller", "vampire"]

export default function Sidebar({ toggle, handleClick }) {
  const toggleRef = useRef(null);
  const overlayRef = useRef(null);
  const abortController = new AbortController();

  const sidebarStyles = {
    openSidebar: "w-72 transition-all h-screen z-[30] overflow-y-scroll fixed top-0 bottom-0 left-0 bg-white text-black flex flex-col",
    closeSidebar: "w-0 transition-all h-screen z-[30] overflow-y-scroll fixed top-0 bottom-0 left-0 bg-white text-black",
    openOverlay: "w-screen absolute h-screen top-0 left-0 right-0 bg-black opacity-70 z-[20]",
    closeOverlay: "w-0"
  }

  const toggleSidebar = () => {
    toggleRef.current.className = sidebarStyles['closeSidebar'];
    overlayRef.current.className = sidebarStyles['closeOverlay'];
    handleClick();
  }

  const abortClick = () => {
    abortController.abort();
  };

  return (
    <aside className="">
      <ul className={toggle ? sidebarStyles['openSidebar'] : sidebarStyles['closeSidebar']} ref={toggleRef}>
        <button onClick={handleClick} className="font-bold text-sm divide-y-2 divide-black divide-solid p-2 mb-4">
          <span>Close Menu</span>
        </button>
        <Link to="/" className="capitalize font-bold text-lg p-2 border-b border-sky-500">
          Home
        </Link>
        {
          categories.map((item, index) =>
            <Link to={`/anime/category/${item}?page=1`} className="" key={index} onClick={abortClick}>
              <li className="capitalize font-bold text-lg p-2 border-b border-sky-500">
                { item }
              </li>
            </Link>
          )
        }
        <li className="p-2">
          <h4 className="font-bold text-lg">Genre</h4>
          <ul className="flex flex-wrap justify-between">
            {
              genres.map((item, index) =>
                <Link to={`/anime/genre/${item}?page=1`} key={index} className="w-2/5" onClick={abortClick}>
                  <li className="capitalize text-sm p-2">
                    { item }
                  </li>
                </Link>
              )
            }
          </ul>
        </li>
      </ul>
      <div className={toggle ? sidebarStyles['openOverlay'] : sidebarStyles['closeOverlay']} onClick={toggleSidebar} ref={overlayRef}></div>
    </aside>
  )
}
