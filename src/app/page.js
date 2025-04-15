'use client'
import Image from "next/image";
import MountainSceneParallax from "@/components/MountainSceneParallax";

import { useEffect, useState } from "react";
export default function Home() {
  const [butterflyData,setButterflyData] = useState([])
  //refs are typically tied to components and they persist across renders, even unmount renders. This means I can use it as a variable for every session.

  const getButterflyData = async()=>{
    try{
      const response = await fetch('/api/butterfly')
      if(!response.ok){
        return <p>response.statusText</p>
      }
      let {data} = await response.json()
      setButterflyData(data)      
    }
    catch(e){
      return <p>e</p>
    }
  }

  

  useEffect(()=>{

    getButterflyData()

  },[])
    return (
        <>
            <MountainSceneParallax />
        </>
    );
}

