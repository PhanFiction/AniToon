import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import Nav from "./components/Nav/Nav";
// import Home from "./pages/Home";
// import Episode from "./pages/Episode";
// import Anime from "./pages/Anime";
// import Categorization from "./pages/Categorization";

/* 
Todo
<<<<<<< HEAD
  1. Fix caption padding in VideoPlayer component
=======
  * In Episode component, find a way to let client choose between hd-1, hd-2, Sub and Dub
  * In Episode component, figure a way to automatically set between available hd-1 and hd-2
  * Fix caption padding in VideoPlayer component
>>>>>>> frontend-feature
*/

const Home = lazy(() => import('./pages/Home'));
const Categorization = lazy(() => import('./pages/Categorization'));
const Episode = lazy(() => import('./pages/Episode'));
const Anime = lazy(() => import('./pages/Anime'));

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="my-20">
        <Routes>
          <Route
            path="/anime/category/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
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
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;