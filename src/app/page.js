'use client'
import Image from "next/image";
import { fetchWeatherApi } from 'openmeteo';
import { useEffect, useState } from "react";
export default function Home() {
  // const [weatherData,setWeatherData] = useState('')
  const getWeatherData = async()=>{
    const response = await fetch('api/weather')
    const data = await response.json()
    console.log(data)
    
  }
  useEffect(()=>{
    getWeatherData()
  },[])
  return (
   <>
   {/* <div>
    {weatherData}
    </div> */}
   </>
  );
}
