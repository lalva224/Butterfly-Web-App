'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
export default function Home() {
  const [weatherData,setWeatherData] = useState([])
  
  const get_data = async ()=>{
    try{
    const response = await fetch('/api/weather')
    if(!response.ok){
      console.log(response.statusText)
      return
    }
    let {data} = await response.json()

    setWeatherData(data)
  }
  catch(e){
    console.log(e)
  }

  }
  

  useEffect(()=>{
    get_data()
  },[])
  return (
   <>
    {
      weatherData.map((day,i)=>(
        <p key={i}>Date:{day.date} Temperature : {day.temperature}  Humidity : {day.humidity}</p>
      ))
    }
   </>
  );
}

