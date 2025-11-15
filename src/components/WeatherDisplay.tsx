import React from 'react'
import './weatherdisplay.css'
const WeatherDisplay = ( { weather } ) => {
  return (
    <div className="main-weather-container">
      <h2>{weather.location.name}</h2>
      <h3>{weather.current.temp_c}°C</h3>
      <p>{weather.current.condition.text}</p>
      <img src={weather.current.condition.icon} alt="icon" />
    </div>
    )
}

export default WeatherDisplay