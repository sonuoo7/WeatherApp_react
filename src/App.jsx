import React from "react";
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WeatherDetails from "./components/WeatherDetails";
import WeatherSearch from "./components/WeatherSearch";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WeatherSearch />} />
        <Route path="/weatherdetails/:city" element={<WeatherDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
