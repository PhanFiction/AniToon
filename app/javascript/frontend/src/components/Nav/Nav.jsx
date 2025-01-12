import React, { useState, useEffect, useContext } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import Sidebar from './Sidebar';
import fetchCSRFToken from '../../utils/fetchCSRFToken';
import { CiSearch } from "react-icons/ci";
import { AlertContext } from '../../context';
import useFetchUser from '../../hooks/useFetchUser';

export default function Nav() {
  const [isSearchbarOpen, setToggleSearchbar] = useState(false);
  const [isSidebarOpen, setToggleSidebar] = useState(false);
  const [isDropDownOpen, setToggleDropDown] = useState(false);
  const { user } = useFetchUser();
  const { setAlertType, setAlertMessage } = useContext(AlertContext);

  // Toggle Searchbar function
  const toggleSearchbar = () => setToggleSearchbar(!isSearchbarOpen);
  // Toggle Sidebar function
  const toggleSidebar = () => setToggleSidebar(!isSidebarOpen);

  // Logs user out but needs the CSRF token for ruby backend
  const handleLogout = async () => {
    try {
      const csrfToken = fetchCSRFToken() // Fetch CSRF token
      const response = await fetch('/users/sign_out', {
        method: 'DELETE',
        headers: {
          'X-CSRF-Token': csrfToken, // Include CSRF token in the headers
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
      });

      if (response.ok) {
        // Clear the current user state
        setUser([]);
      } else {
        setAlertMessage('Failed to log out');
        setAlertType('error');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  return (
    <nav className="fixed top-0 w-screen bg-bluePurple p-4 z-20 text-black">
      <div className="flex flex-row items-center gap-4">
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

        {/* Searchbar icon */}
        <CiSearch className="text-3xl text-white md:hidden" onClick={toggleSearchbar}/>

        {/* Display user profile if user is logged in */}
        {
          user ?
          <div className="relative ml-auto mr-5">
            <button onClick={() => {setToggleDropDown(!isDropDownOpen)}}>
              <img src="https://cdn.noitatnemucod.net/avatar/100x100/zoro_normal/av-zz-07.jpeg" alt="profile" className="rounded-full w-10 h-10"/>
            </button>
            <div
              className={`${isDropDownOpen ? 'block' : 'hidden'} absolute right-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
              >
              <div className="py-1" role="none">
                <Link to="/watchlist" className="block px-4 py-2 text-sm text-gray-700">Watch List</Link>
                <a href="/account_settings" className="block px-4 py-2 text-sm text-gray-700">Account settings</a>
                <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700">
                  Logout
                </button>
              </div>
            </div>
          </div>
          :
          <a href="/users/sign_in" className="relative ml-auto mr-5 border solid p-2 text-white rounded-md hover:cursor-pointer">
            Login
          </a>
        }
      </div>

      {/* Searchbar for mobile */}
      {
        isSearchbarOpen &&
        <div className="w-full mt-4 md:hidden">
          <SearchBar />
        </div>
      }
    </nav>
  )
}
