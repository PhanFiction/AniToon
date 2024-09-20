import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Episode from "./pages/Episode";
import Anime from "./pages/Anime";
import Categorization from "./pages/Categorization";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/anime/category/:id" element={<Categorization />} />
        <Route path="/anime/genre/:id" element={<Categorization />} />
        <Route path="/anime/watch/:id" element={<Episode />} />
        <Route path="/anime/info" element={<Anime />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App;