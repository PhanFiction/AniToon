import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";

export default function SearchBar() {
  const QUERY_MIN_LENGTH = 2
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const toggleRef = useRef(null);
  const inputRef = useRef(null);
  const openSlideRef = useRef(null);

  const searchBarStyles = {
    extend: "w-full opacity-0 md:-translate-y-2 peer-focus:translate-y-0 peer-focus:pointer-events-auto duration-200 peer-focus:opacity-100 absolute z-[100] left-0 rounded-md",
    hidden: "hidden",
    found: "divide-y divide-dashed md:flex md:flex-col bg-white md:bottom-auto absolute w-full h-96 overflow-y-scroll",
    error: "divide-y divide-dashed md:flex md:flex-col bg-white md:bottom-auto absolute w-full p-4 h-12",
  }

  useEffect(() => {
    // Query for anime results
    const searchQuery = async () => {
      if (query.length > QUERY_MIN_LENGTH) {
        const queryData = await fetch(`/api/anime/search_suggest?query=${query}`);
        const queryResult = await queryData.json();
        setResult(queryResult.suggestions);
        toggleRef.current.className = searchBarStyles['extend'];
      } else {
        toggleRef.current.className = searchBarStyles['hidden'];
      }
    }
    searchQuery();
  }, [query]);

  useEffect(() => {
    const outsideClick = (e) => {
      if (inputRef.current.contains(e.target)) {
        // return element that was involved in the event and the element is close to the <a> tag
        const linkElement = e.relatedTarget && e.relatedTarget.closest('a');
        if (!linkElement) toggleRef.current.className = searchBarStyles['hidden'];
      }
    };

    const insideClick = (e) => {
      e.stopImmediatePropagation(); // prevent outside clicking
      toggleRef.current.className = searchBarStyles['extend']; // Hide the dropdown
    }
  
    // Add event listeners
    inputRef.current.addEventListener('blur', outsideClick);
    inputRef.current.addEventListener('click', insideClick);
  }, [inputRef]);

  // Reset the states and set searchBar to hidden when user clicks a link
  const handleClick = () => {
    setQuery('');
    setResult([]);
    toggleRef.current.className = searchBarStyles['hidden'];
  }

  return (
    <div className="w-full md:w-80 relative" ref={openSlideRef}>
      <input
        className="peer z-[10] px-6 py-2 rounded-md shadow-lg border-2 outline-none w-full"
        color="white"
        size="xl"
        placeholder="Search anime..."
        onChange={(e) => {setQuery(e.target.value)}}
        value={query}
        ref={inputRef}
      />
      <svg
        className="size-6 absolute top-3 right-3 text-gray-500"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>

      {/* Drop Down content */}
      <div className={searchBarStyles["hidden"]} ref={toggleRef}>
        {
          result.length > 1 && query.length > QUERY_MIN_LENGTH &&
          <ul className={searchBarStyles["found"]}>
            {
              result.map(item =>
                <Link to={`/anime/info?id=${item.id}`} className="p-2 cursor-pointer text-sm hover:bg-red-100" key={item.id} onClick={handleClick}>
                  <article className="flex justify-between">
                    <img src={item.poster} alt="poster" className="w-16 h-auto"/>
                    <div className="flex flex-col gap-2 m-4 overflow-hidden w-3/4">
                      <h4 className="font-bold truncate">{item.name}</h4>
                      <p className="truncate">{item.jname}</p>
                      <ul className="flex items-center gap-2">
                        {
                          item.moreInfo.map((info, index) =>
                            <li key={index} className="text-xs first:list-none">{info}</li>
                          )
                        }
                      </ul>
                    </div>
                  </article>
                </Link>
              )
            }
            <Link to={`/anime/search?query=${query}&page=1`} className="p-2 cursor-pointer text-sm hover:bg-red-100" onClick={handleClick}>
              View Results
            </Link>
          </ul>
        }
        {
          result.length < 1 && query.length > QUERY_MIN_LENGTH &&
          <ul className={searchBarStyles["error"]}>
            <p>No result found.</p>
          </ul>
        }
      </div>
    </div>
  )
}
