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
  const [yDomain,setYDomain] = useState('')
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
          [dataType]: item[dataType]
        }));
        setChartData(processed)

        if(dataType=='temperature'){
          setUnit('F')
          setTypeTitle('Temperature')
          setYDomain([60, 80])
        }
        else if(dataType=='humidity'){
          setUnit('%')
          setTypeTitle('Humidity')
          setYDomain([55, 85])
        }
        else{
          setUnit('m/s')
          setTypeTitle('Wind Speed')
          setYDomain([0, 25])
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
      const dateStr = new Date(payload[0].payload.date).toLocaleDateString();
      return (
        <div className="bg-white p-2 border border-gray-300 rounded">
          <p className="font-semibold">{dateStr}</p>
          <p className="text-sm">{typeTitle}: {payload[0].payload[dataType]}{unit}</p>
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
            domain={yDomain}
          />
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

