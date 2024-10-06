import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import MobileNav from './MobileNav';
import Sidebar from './Sidebar';

export default function Nav() {
  const [isSearchbarOpen, setToggleSearchbar] = useState(false);
  const [isSidebarOpen, setToggleSidebar] = useState(false);

  const toggleSearchbar = () => setToggleSearchbar(!isSearchbarOpen);
  const toggleSidebar = () => setToggleSidebar(!isSidebarOpen);

  return (
    <nav className="fixed top-0 w-screen bg-bluePurple p-4 flex flex-row items-center gap-4 z-20 text-black">
    
      <label className="flex flex-col gap-2 w-8 hover:cursor-pointer" onClick={toggleSidebar}>
        <div className="rounded-2xl h-[3px] w-1/2 bg-white duration-500 origin-right" />
        <div className="rounded-2xl h-[3px] w-full bg-white duration-500 peer-checked:-rotate-45" />
        <div className="rounded-2xl h-[3px] w-1/2 bg-white duration-500 place-self-end origin-left" />
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

      <div className="fixed left-0 bottom-0 w-full md:hidden md:opactity-0">
        <MobileNav handleClick={toggleSearchbar} />
      </div>
      
    </nav>
  )
}
