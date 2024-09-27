import React from 'react';
import { Link } from 'react-router-dom';

const categories = ["home", "subbed-anime", "dubbed-anime", "most-popular", "movie", "special", "ova", "ona", "TV"]
const genres = ["action", "adventure", "cars", "comedy", "dementia", "demons", "drama", "ecchi", "fantasy", "game", "harem", "historical", "horror", "josei", "magic", "mecha", "isekai", "kids", "martial-arts", "military", "music", "mystery", "police", "parody", "psychological", "romance", "samurai", "school", "sci-fi", "seinen", "shoujo", "shoujo-ai", "shounen", "shounen-ai", "slice-of-life", "space", "sports", "super-power", "supernatural", "thriller", "vampire"]

export default function Sidebar({ toggle, handleClick }) {
  return (
    <aside className={`${toggle ? 'w-72' : 'w-0'} transition-all h-screen z-[200] overflow-y-scroll fixed top-0 bottom-0 left-0 bg-white text-black`}>
      <ul>
        <button onClick={handleClick} className="font-bold text-sm divide-y-2 divide-black divide-solid p-2 mb-4">
          <span>Close Menu</span>
        </button>
        {
          categories.map((item, index) =>
            <Link to={`/anime/category/${item}?page=1`} className="" key={index}>
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
                <Link to={`/anime/genre/${item}?page=1`} key={index} className="w-2/5">
                  <li className="capitalize text-sm p-2">
                    { item }
                  </li>
                </Link>
              )
            }
          </ul>
        </li>
      </ul>
    </aside>
  )
}
