
import { ScatterChart, Scatter, XAxis, YAxis,ZAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { getButterflyCounts } from '../lib/butterfly';


export default function TempToButterfly({weather_data,butterfly_data}){
    
    
    return (
      <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
    );
  }

