// app/components/ScatterChartExample.tsx or app/ScatterChartExample.tsx
'use client';

import React from 'react';
import { useState,useEffect } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';


const WeatherButterflyChart = ({dataType}) => {
  const [chartData, setChartData] = useState([]);
  const [unit,setUnit] = useState('')
  const [typeTitle,setTypeTitle] = useState('')
  const getButterflyData = async()=>{
    try{
      const response = await fetch(`/api/${dataType}`)
      if(!response.ok){
        return <p>{response.statusText}</p>
      }
      let {data} = await response.json()
      if(data){
        const processed = data.map(item => ({
          date: new Date(item.date).getTime(), // Convert to timestamp
          [dataType]: item[dataType],
          formattedDate: new Date(item.date).toLocaleDateString(undefined, { 
            month: 'short', 
            day: 'numeric' 
          })
        }));

        setChartData(processed)

        if(dataType=='temperature'){
          setUnit('F')
          setTypeTitle('Temperature')
        }
        else if(dataType=='humidity'){
          setUnit('%')
          setTypeTitle('Humidity')
         
        }
        else{
          setUnit('m/s')
          setTypeTitle('Wind Speed')
        } 
    }
    else{
      return <p>No data</p>
    }
  }
  catch(e){
    return <p>{e}</p>
  }
  }
  
  useEffect(() => {
    getButterflyData()
  }, []);

  // Custom tooltip to display dates in a readable format
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const timestamp = payload[0].payload.date;
      const date = new Date(timestamp);
      const formattedDate = date.toLocaleDateString(undefined, { 
        weekday: 'short',
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
      const val = payload[0].payload[dataType];
      console.log(val)
      
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow-md">
          <p className="font-semibold text-gray-800">{formattedDate} <br/> {typeTitle}: {val}</p>
          <p className="font-medium">{typeTitle}: {val}{unit}</p>
          {/* <p className="text-sm">
            
          </p> */}
        </div>
      );
    }
    return null;
  };
  const formatXAxis = (timestamp) => {
    return new Date(timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold mb-4 text-center">{typeTitle} Trends March 2025 - Present</h3>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 30,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number" 
            dataKey="date" 
            name="Date" 
            tickFormatter={formatXAxis}
            domain={['dataMin', 'dataMax']}
            

          />
          <YAxis 
            type="number" 
            dataKey={dataType}
            name={typeTitle}
            unit={unit}
            domain={['dataMin','dataMax']}
          />
           {/* <Tooltip cursor={{ strokeDasharray: '3 3' }} /> */}
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
          <Scatter 
            name={typeTitle}
            data={chartData} 
            fill="#8884d8" 
            shape="circle" 
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherButterflyChart;

