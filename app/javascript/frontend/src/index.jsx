import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

document.addEventListener("turbo:load", () => {
  const root = createRoot(
    document.getElementById('root')
  );
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});