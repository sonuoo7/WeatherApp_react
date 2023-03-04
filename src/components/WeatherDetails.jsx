import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCelsius, setFahrenheit } from "./store/actions";

function WeatherDetails() {
  // Get the city parameter from the URL
  const { city } = useParams();
  // State variables to keep track of weather data, loading state, and error state
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // Get the temperature unit (Celsius or Fahrenheit) from Redux state
  const temperatureUnit = useSelector((state) => state.temperatureUnit);
  const dispatch = useDispatch();

  // Event handler for when the temperature unit checkbox is changed
  const handleCheckboxChange = (event) => {
    const isCelsiusChecked =
      event.target.name === "Celsius" && event.target.checked;
    const isFahrenheitChecked =
      event.target.name === "Fahrenheit" && event.target.checked;

    // If the Celsius checkbox is checked, dispatch the setCelsius action
    if (isCelsiusChecked) {
      dispatch(setCelsius());
    }

    // If the Fahrenheit checkbox is checked, dispatch the setFahrenheit action
    if (isFahrenheitChecked) {
      dispatch(setFahrenheit());
    }
  };

  // Use useEffect to fetch weather data from the API when the city parameter changes
  useEffect(() => {
    const API_KEY = "bb4df7d3ac1c4bca88553231230403";
    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
      .then((response) => response.json())
      .then((data) => {
        // If the API returns an error, set the error state to true and stop loading
        if (data.error) {
          setError(true);
          setLoading(false);
        } else {
          // Otherwise, set the weather data and stop loading
          setWeatherData(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        // If there is an error fetching the data, set the error state to true and stop loading
        console.log(error);
        setError(true);
        setLoading(false);
      });
  }, [city]);

  // If the component is still loading, display a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there is an error or the weather data is empty, redirect back to the home page
  if (error || Object.keys(weatherData).length === 0) {
    alert("Location Not Found.. !");
    return (window.location.href = "/");
  }

  // Get the current temperature and "feels like" temperature based on the temperature unit
  const temperature =
    temperatureUnit === "Celsius"
      ? weatherData.current.temp_c
      : weatherData.current.temp_f;
  const feelsLike =
    temperatureUnit === "Celsius"
      ? weatherData.current.feelslike_c
      : weatherData.current.feelslike_f;

  // Render the weather data, including the temperature unit checkbox and other information from the API

  return (
    <div className="data">
      <h1 className="heading1" style={{ color: "black" }}>
        Weather Details
      </h1>
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            name="Celsius"
            checked={temperatureUnit === "Celsius"}
            onChange={handleCheckboxChange}
          />
          Celsius
        </label>
        <label>
          <input
            type="checkbox"
            name="Fahrenheit"
            checked={temperatureUnit === "Fahrenheit"}
            onChange={handleCheckboxChange}
          />
          Fahrenheit
        </label>
      </div>
      <div className="api-data">
        <img
          src={weatherData.current.condition.icon}
          alt={weatherData.current.condition.text}
        />
        <p>
          Location: {weatherData.location.name}
          <span>
            Temperature : {temperature} {temperatureUnit}
          </span>
        </p>
        <p>Cloud : {weatherData.current.cloud}</p>
        <p>
          Longitude: {weatherData.location.lon}{" "}
          <span className="lat">Latitude: {weatherData.location.lat}</span>{" "}
        </p>
        <p>
          Country : {weatherData.location.country}{" "}
          <span className="region">Region : {weatherData.location.region}</span>{" "}
        </p>
        <p>
          Time_Zone: {weatherData.location.tz_id}{" "}
          <span>Local Time : {weatherData.location.localtime}</span>{" "}
        </p>

        <p>UV Index : {weatherData.current.uv}</p>
        <p>Pressure : {weatherData.current.pressure_in}</p>
        <p>Feels like: {feelsLike}</p>
      </div>
    </div>
  );
}

export default WeatherDetails;
