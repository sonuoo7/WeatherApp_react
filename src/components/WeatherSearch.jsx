import { useState } from "react";
import { useNavigate } from "react-router-dom";

function WeatherSearch() {
  // Define the WeatherSearch component
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    // Update the city state with the new input value
    setCity(event.target.value);
  };

  const handleSearch = () => {
    if (city.trim() !== "") {
      // Navigate to the weather details page with the city name as a parameter
      navigate(`/weatherdetails/${city}`);
    } else {
      // Display an alert message to the user
      alert("Location Cannot Be......");
    }
  };

  return (
    // Render the search page UI
    <div id="search-page">
      <h1 className="heading">Weather Api</h1>
      <input
        className="search-box"
        type="text"
        placeholder="Location"
        value={city}
        onChange={handleInputChange}
      />
      <button className="search-btn" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default WeatherSearch;
