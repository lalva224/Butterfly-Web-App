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


const data = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
];
 const ScatterChartTemperature = () => {
  const [chartData, setChartData] = useState([]);

  const getButterflyData = async()=>{
    try{
      const response = await fetch('api/butterfly')
      if(!response.ok){
        return <p>{response.statusText}</p>
      }
      let {data} = await response.json()
      if(data){
        const processed = data.map(item => ({
          date: new Date(item.date).getTime(), // Convert to timestamp
          temperature: item.temperature
        }));
        setChartData(processed)
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
          <p className="text-sm">Temperature: {payload[0].payload.temperature}°F</p>
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
      <h3 className="text-xl font-bold mb-4 text-center">Temperature Trends March 2025 - Present</h3>
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
            dataKey="temperature" 
            name="Temperature" 
            unit="°F" 
            domain={[60, 80]}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
          <Scatter 
            name="Temperature" 
            data={chartData} 
            fill="#8884d8" 
            shape="circle" 
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScatterChartTemperature;

