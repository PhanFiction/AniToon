import React, { useState, lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Nav from "./components/Nav/Nav";
import Alert from './components/Alert';
import { AlertContext } from './context';

/* 
Todo
  1. Add autoplay feauture
  2. Add skip intro and ending song
  3. Add highlight feature to show which player is selected when Episode component is loaded
  4. Add seasons to the Anime episode component for users to select
*/

const Home = lazy(() => import('./pages/Home'));
const Categorization = lazy(() => import('./pages/Categorization'));
const Episode = lazy(() => import('./pages/Episode'));
const Anime = lazy(() => import('./pages/Anime'));
const WatchList = lazy(() => import('./pages/WatchList'));
const AccountSettings = lazy(() => import('./pages/AccountSettings'));

function App() {
  const location = useLocation();
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  // Determine if the current path is either /signup or /login
  // This will add margin to pages that is not signup and login
  const isAuthRoute = location.pathname === '/account_settings';

  return (
    <AlertContext.Provider 
      value={{
        alertType,
        alertMessage,
        setAlertMessage,
        setAlertType
      }}
    >
      <Alert />
      <Nav />
      <div className={isAuthRoute ? '' : 'my-20'}>
        <Routes>
          <Route
            path="/anime/category/:id"
            element={
              <Suspense fallback={<div>Loading...</div>} className="my-20">
                <Categorization />
              </Suspense>
            }
          />
          <Route
            path="/anime/search"
            element={
              <Suspense fallback={<div>Loading...</div>} className="my-20">
                <Categorization />
              </Suspense>
            }
          />
          <Route
            path="/anime/genre/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Categorization />
              </Suspense>
            }
          />
          <Route
            path="/anime/watch/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Episode />
              </Suspense>
            }
          />
          <Route
            path="/anime/info"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Anime />
              </Suspense>
            }
          />
          <Route
            path="/watchlist"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <WatchList />
              </Suspense>
            }
          />
          <Route
            path="/account_settings"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <AccountSettings />
              </Suspense>
            }
          />
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </AlertContext.Provider>
  );
}

export default App;