import React from "react";
import "./Weather.css";

export default function Weather() {
  let weatherData = {
    city: "New York",
    temperature: 19,
    date: "Tuesday 10:00",
    description: "Cloudy",
    imgUrl: "./cloudy.png",
    humidity: 80,
    wind: 10,
  };

  return (
    <div>
      <div className="container">
        <div className="weather-app">
          <form className="search-form" id="search-form">
            <input
              type="search"
              placeholder="Type a city.."
              autoFocus="on"
              autoComplete="off"
              id="city-input"
              className="form-control shadow-sm"
            />
          </form>
          <button type="submit" value="search">
            Search
          </button>
          <div className="overview">
            <h1> {weatherData.city} </h1>
            <ul>
              <li> {weatherData.date} </li>
              <li> {weatherData.description} </li>
            </ul>
          </div>
        </div>

        <div className="container text-center">
          <div className="col">
            <div className="clearfix weather-temperature"></div>
            <img src={weatherData.imgUrl} alt="image" width="50" />
            <p>
              {weatherData.temperature}
              <span className="units">
                <a href="/" id="celsius-link">
                  ºC{" "}
                </a>
                |
                <a href="/" id="fahrenheit-link">
                  ºF
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
      <ul>
        <li>Humidity: {weatherData.humidity}%</li>
        <li>Wind: {weatherData.wind}km/h</li>
      </ul>
    </div>
  );
}
