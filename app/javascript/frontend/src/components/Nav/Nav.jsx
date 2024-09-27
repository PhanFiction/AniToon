import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import MobileNav from './MobileNav';
import Sidebar from './Sidebar';

const genres = ["Action", "Adventure", "Cars", "Comedy", "Dementia", "Demons", "Drama", "Ecchi", "Fantasy", "Game", "Harem", "Historical", "Horror", "Josei", "Magic", "Mecha", "Isekai", "Kids", "Martial Arts", "Military", "Music", "Mystery", "Police", "Parody", "Psychological", "Romance", "Samurai", "School", "Sci-Fi", "Seinen", "Shoujo", "Shoujo Ai", "Shounen", "Shounen Ai", "Slice of Life", "Space", "Sports", "Super Power", "Supernatural", "Thriller", "Vampire"];

const categories = ["Home", "Subbed Anime", "Dubbed Anime", "Most Popular", "Movies", "Specials", "OVA's", "ONA's", "TV"];

export default function Nav() {
  const [isSearchbarOpen, setToggleSearchbar] = useState(false);
  const [isSidebarOpen, setToggleSidebar] = useState(false);

  const toggleSearchbar = () => setToggleSearchbar(!isSearchbarOpen);
  const toggleSidebar = () => setToggleSidebar(!isSidebarOpen);

  return (
    <nav className="relative bg-black p-4 flex flex-col md:flex-row items-center gap-4">
    
      <label className="flex flex-col gap-2 w-8 hover:cursor-pointer" onClick={toggleSidebar}>
        <div className="rounded-2xl h-[3px] w-1/2 bg-white duration-500 peer-checked:rotate-[225deg] origin-right peer-checked:-translate-x-[12px] peer-checked:-translate-y-[1px]" />
        <div className="rounded-2xl h-[3px] w-full bg-white duration-500 peer-checked:-rotate-45" />
        <div className="rounded-2xl h-[3px] w-1/2 bg-white duration-500 place-self-end peer-checked:rotate-[225deg] origin-left peer-checked:translate-x-[12px] peer-checked:translate-y-[1px]" />
      </label>

      <Sidebar toggle={isSidebarOpen} handleClick={toggleSidebar}/>
    
      <div className="w-24 md:w-48">
        <Link to="/">
          <img src={logo} alt="logo" className="w-auto h-100"/>
        </Link>
      </div>

      <div className="hidden md:block">
        <SearchBar />
      </div>

      {
        isSearchbarOpen && 
        <div className="fixed bottom-16 w-full">
          <SearchBar />
        </div>
      }

      <div className="fixed bottom-0 w-full md:hidden md:opactity-0">
        <MobileNav handleClick={toggleSearchbar} />
      </div>
      
    </nav>
  )
}
