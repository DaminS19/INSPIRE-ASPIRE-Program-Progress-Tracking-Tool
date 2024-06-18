import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./Admin";
import Search from "./Search";

// Main App component
function App() {
  return (
    <BrowserRouter> {/* Sets up the React Router for handling client-side routing */}
      <Routes> {/* Defines the different routes in the application */}
        <Route path="/" element={<Admin />} /> {/* Route for the Admin component at the root path */}
        <Route path="/search" element={<Search />} /> {/* Route for the Search component at the /search path */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
