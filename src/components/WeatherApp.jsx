import React, { useState } from "react";
import { useEffect } from "react";
import WeatherForm from "./WeatherForm";
import WeatherMainInfo from "./WeatherMainInfo";
import Loading from './Loading'
import styles from "./WeatherApp.module.css";

const weatherApp = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    loadInfo();
  }, []);

  useEffect(() => {
    document.title = `Weather | ${weather?.location.name ?? ""}`;
  }, [weather]);

  async function loadInfo(city = "london") {
    try {
      const request = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}&key=${
          import.meta.env.VITE_BACKEND_KEY
        }&q=${city}`
      );

      const json = await request.json();

      setTimeout(()=>{
        setWeather(json);
      },2000)


      console.log(json);
    } catch (error) {}
  }

  function handleChangeCity(city) {
    setWeather(null);
    loadInfo(city);
  }

  return (
    <div className={styles.weatherContainer}>
      <WeatherForm onChangeCity={handleChangeCity} />
      { weather ? <WeatherMainInfo weather={weather} /> : <Loading />}
    </div>
  );
};

export default weatherApp;
