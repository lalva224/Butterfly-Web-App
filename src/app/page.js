'use client'
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
export default function Home() {
  const [weatherData,setWeatherData] = useState([])
  //refs are typically tied to components and they persist across renders, even unmount renders. This means I can use it as a variable for every session.
  const sessionRef = useRef(false)
  const get_db_data = async ()=>{
    try{
    const response = await fetch('/api/weather')
    if(!response.ok){
      return <p>response.statusText</p>
    }
    let {data} = await response.json()

    setWeatherData(data)
  }
  catch(e){
    console.log(e)
  }

  }
  const update_db = async()=>{
    try{
      const response = await fetch('/api/weather',{method:'POST'})
      if(!response.ok){
        return <p>response.statusText</p>
      }
      //update db data right afterwards
     get_db_data()
      
    }
    catch(e){
      return <p>e</p>
    }
  }
  

  // useEffect(()=>{
  //   //every session we make checks to update db.
  //   if(!sessionRef.current){
  //     update_db()
  //     sessionRef.current = false
  //   }
  //   //every mount/refresh we will update db data
  //   get_db_data()
  // },[])
  useEffect(()=>{
    update_db()
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

