
import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_URL,WEATHER_API_KEY } from './api';

import { useState } from 'react';


function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentForecast, setCurrentForecast] = useState(null);
  const handleOnSearchChange = (searchData) =>  {

    const [lat, lon] = searchData.value.split(",");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`)
    const currentForecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`)

    Promise.all([currentWeatherFetch, currentForecastFetch])
      .then(async (response) => {
        const currentWeather = await response[0].json();
        const currentForecast = await response[1].json();
        setCurrentWeather({city: searchData.label,  ...currentWeather});
        setCurrentForecast({city: searchData.label,  ...currentForecast});
      })
      .catch((error) => {
        console.error(error);
      })
      
  }

  console.log(currentWeather, currentForecast);

  return (
    <div className="container">
      <Search  onSearchChange={handleOnSearchChange}/>
      <CurrentWeather />
    </div>
  );
}

export default App;
