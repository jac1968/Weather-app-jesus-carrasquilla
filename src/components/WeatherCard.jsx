import React from "react";
import { useState } from "react";
import "./styles/weatherCard.css";

const WeatherCard = ({ weather, temp }) => {
  const [isCel, setisCel] = useState(true);

  const handleTemp = () => {
    setisCel(!isCel);
  };

  return (
    <>
      <div className="weather__Card">
        <h1 className="wheather__title">Weather App</h1>
        <br />
        <h2 className="weather__place">
          {weather?.name}, {weather?.sys.country}{" "}
        </h2>
        <div className="weather__container">
          <figure weather__img>
            <img
              src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`}
              alt="Weather"
            />
          </figure>
          <div className="weather__info">
            <h3 className="weather__description">
              "{weather?.weather[0].description}"
            </h3>
            <ul className="weather__list">
              <li className="weather__item">
                <span>Wind Speed : </span> <span>{weather?.wind.speed} m/s</span>
              </li>
              <li className="weather__item">
                <span>Clouds : </span> <span>{weather?.clouds.all} %</span>
              </li>
              <li className="weather__item">
                <span>Pressure : </span> <span>{weather?.main.pressure} hPa</span>
              </li>
            </ul>
          </div>
        </div>
        <h3 className="weather__temp"> {isCel ? temp?.cel + " °C" : temp?.fah + " °F"}</h3>
        <br />
        <button onClick={handleTemp}>Change to {isCel ? "°F" : "°C"}</button>
      </div>
    </>
  );
};

export default WeatherCard;
