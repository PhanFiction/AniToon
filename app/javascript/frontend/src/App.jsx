import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import Nav from "./components/Nav/Nav";
// import Home from "./pages/Home";
// import Episode from "./pages/Episode";
// import Anime from "./pages/Anime";
// import Categorization from "./pages/Categorization";

/* 
Todo
  1. Figure out how to deal with suspending component on render when user clicks on different links 
  2. Fix caption padding in VideoPlayer component
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

/* function App() {
  return (
    <BrowserRouter>
    <Nav />
    <div className="mb-20 mt-28">
      <Routes>
        <Route path="/anime/category/:id" element={<Categorization />} />
        <Route path="/anime/genre/:id" element={<Categorization />} />
        <Route path="/anime/watch/:id" element={<Episode />} />
        <Route path="/anime/info" element={<Anime />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}
 */