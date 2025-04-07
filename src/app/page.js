'use client'
import Image from "next/image";
import { fetchWeatherApi } from 'openmeteo';

import { useEffect, useState } from "react";
export default function Home() {
  const [weatherData,setWeatherData] = useState([])
  
  const getWeatherData = async()=>{
    try{
      
const params = {
	"latitude":  25.762246,
	"longitude": -80.374389,
	"hourly": ["temperature_2m", "relative_humidity_2m"],
	"past_days": 31,
	"forecast_days": 1
};
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Helper function to form time ranges
const range = (start, stop, step) =>
	Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const utcOffsetSeconds = response.utcOffsetSeconds();
const timezone = response.timezone();
const timezoneAbbreviation = response.timezoneAbbreviation();
const latitude = response.latitude();
const longitude = response.longitude();

const hourly = response.hourly();

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
	hourly: {
		time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
			(t) => new Date((t + utcOffsetSeconds) * 1000)
		),
		temperature2m: hourly.variables(0).valuesArray(),
		relativeHumidity2m: hourly.variables(1).valuesArray(),
	},
};

// `weatherData` now contains a simple structure with arrays for datetime and weather data
let data = []
for (let i = 0; i < weatherData.hourly.time.length; i+=25) {
  data.push({"time":weatherData.hourly.time[i].toISOString().slice(0,10),"temperature":parseInt(weatherData.hourly.temperature2m[i]),"humidity":parseInt(weatherData.hourly.relativeHumidity2m[i])})
      
    }
    setWeatherData(data)
  }

    catch(e){
      console.log(e)
    }
    
  }

  useEffect(()=>{
    getWeatherData()
  },[])
  return (
   <>
   {weatherData.map((day,i)=>(
    <p key={i}>Day: {day.time} temperature {day.temperature} Humidity {day.humidity}</p>
   ))}
   </>
  );
}

