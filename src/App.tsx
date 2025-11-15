import { useState } from 'react'
import { RiSearchLine } from 'react-icons/ri';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css'

function App() {
  const [city, setCity] = useState('');
  const [cards, setCards] = useState([]);   // 🔹 stack of weather cards

  const API_KEY = "903cf57c1c944ca683273344251304";
  const BASE_URL = "http://api.weatherapi.com/v1";

  const searchWeather = async () => {
    if (!city) return;

    const url = `${BASE_URL}/current.json?key=${API_KEY}&q=${city}`;
    const res = await fetch(url);
    const data = await res.json();

    // 🔹 New card on top, keep only 3
    setCards(prev => {
      const newCard = {
        id: Date.now(), // unique key
        weather: data,
      };
      const updated = [newCard, ...prev];
      return updated.slice(0, 3); // max 3 cards
    });
  };

  return (
    <div className="main_container">
      <div className="title">
        <h1>Discover the weather in every city you go</h1>
      </div>

      {/* Search pill */}
      <div className="input_field">
        <input
          placeholder="Search for a city"
          value={city}
          onChange={e => setCity(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && searchWeather()}
        />
        <button className="search-btn" onClick={searchWeather}>
          <RiSearchLine className="search-icon" />
        </button>
      </div>

      {/* 🔹 Card stack */}
      <div className="cards-stack">
        {cards.map((card, index) => {
          let posClass = '';
          if (index === 0) posClass = 'card-top';
          if (index === 1) posClass = 'card-right';
          if (index === 2) posClass = 'card-left';

          return (
            <div key={card.id} className={`card-wrapper ${posClass}`}>
              <WeatherDisplay weather={card.weather} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
