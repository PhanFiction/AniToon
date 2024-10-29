import React from 'react';
import { Link } from 'react-router-dom';
import AnimeCard from './AnimeCard';

export default function AnimeItem({ item }) {
  return (
    <div className="relative group hover:-translate-y-1 duration-500">
      <Link to={`/anime/info?id=${item.id}`} className="flex w-32 h-52 md:w-44 lg:h-64 mb-8 z-10">
        <AnimeCard showType={item.showType} backgroundImg={item.poster} title={item.jname} />
      </Link>
      <button 
        className="absolute top-1 right-1 hover:cursor-pointer opacity-0 group-hover:opacity-100 bg-black/60 hover:text-red p-1 rounded-md" 
        onClick={() => { console.log('Favorite clicked for', item.jname); }}
      >
        <svg 
          className="opacity-0 duration-300 group-hover:opacity-100 rounded-md" 
          stroke="currentColor" 
          fill="currentColor" 
          strokeWidth="0" 
          viewBox="0 0 24 24" 
          height="1.2em" 
          width="1.2em" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
        </svg>
      </button>
    </div>
  )
}
