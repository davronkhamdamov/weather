import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import c from './App.module.css';
function App() {
  const [weatherValue, setWeathwerValue] = useState(null);
  const [weatherData, setWeathwerData] = useState(null);
  const [submit, setSubmit] = useState([]);
  useEffect(() => {
    axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${weatherValue}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`
    )
      .then((res) => {
        if (res.status === 200) setWeathwerData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [submit]);
  const inputValue = (e) => {
    setWeathwerValue(e.target.value)?.trim();
  };
  return (
    <div className={c.simple}>
      <div className={c.input}>
        <input
          type="text"
          onInput={(e) => {
            inputValue(e);
          }}
        />
        <button
          onClick={() => {
            setSubmit(submit === [0] ? [1] : [0]);
          }}
        >
          Search
        </button>
      </div>
      <div className={c.data}>
        {
          <div className={c.wrapper}>
            <p className={c.cityname}>{weatherData?.name}</p>
            <img
              className={c.icon}
              src={`https://cdn.jsdelivr.net/npm/open-weather-icons@0.0.8/src/svg/${weatherData?.weather[0].icon}.svg`}
              alt=""
            />
            <div className={c.weather}>
              <p className={c.weatherTemp}>
                {weatherData
                  ? Math.floor((weatherData?.main.temp - 32) * 0.5556) +
                    '°C' +
                    '|' +
                    Math.round(weatherData?.main.temp) +
                    '°F'
                  : ''}
              </p>
              <p className={c.weatherMain}>{weatherData?.weather[0].main}</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
