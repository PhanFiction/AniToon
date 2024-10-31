import { Route, Routes, useLocation } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import Nav from "./components/Nav/Nav";

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
const SignUp = lazy(() => import('./pages/SignUp'));
const Login = lazy(() => import('./pages/Login'));
const Bookmarks = lazy(() => import('./pages/Bookmarks'));
const AccountSettings = lazy(() => import('./pages/AccountSettings'));

function App() {
  const location = useLocation();

  // Determine if the current path is either /signup or /login
  // This will add margin to pages that is not signup and login
  const isAuthRoute = location.pathname === '/signup' || location.pathname === '/login' || location.pathname === '/account_settings';

  return (
    <>
      <Nav />
      <div className={isAuthRoute ? '' : 'my-20'}>
        <Routes>
          <Route
            path="/signup"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <SignUp />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/anime/category/:id"
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
            path="/bookmarks"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Bookmarks />
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
    </>
  );
}

export default App;