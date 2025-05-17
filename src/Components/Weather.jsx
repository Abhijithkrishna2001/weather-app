import React, { useEffect, useRef, useState } from "react";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const allIcon = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };
  const search = async (city) => {
    if (city === "") {
      alert("Enter the city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      if(!response.ok){
        alert(data.message);
        return;
      }
      console.log(data);
      const icon = allIcon[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
        setWeatherData(false)
        console.error("Error in fetching weather data")
    }
  };
  useEffect(() => {
    search("New York");
  }, []);
  return (
    <div className="place-self-center p-[40px] rounded-[10px] bg-[linear-gradient(45deg,_#2f4680,_#500ae4)] flex flex-col items-center">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search"
          className="pl-6 h-12 rounded-3xl border-none outline-none text-[#626262] bg-[#ebfffc] text-base"
          ref={inputRef}
        />
        <img
          src={search_icon}
          alt="Search icon"
          className="w-[50px] p-[15px] rounded-full bg-[#ebfffc] cursor-pointer "
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="w-[150px] my-[30px] " />
          <p className="text-[80px] text-[#fff] leading-[1] ">
            {weatherData.temperature}°c
          </p>
          <p className="text-[#fff] text-[40px] ">{weatherData.location}</p>
          <div className="w-full mt-[40px] text-[#fff] flex justify-between items-center">
            <div className="flex items-center gap-3 text-[22px]">
              <img
                className="w-[30px] mt-[10px] "
                src={humidity_icon}
                alt="Humidity"
              />
              <div>
                <p>{weatherData.humidity} %</p>
                <span className="block text-[16px]  ">Humidity</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[22px]">
              <img
                className="w-[30px] mt-[10px] "
                src={wind_icon}
                alt="Wind Speed"
              />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span className="block text-[16px] ">Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
