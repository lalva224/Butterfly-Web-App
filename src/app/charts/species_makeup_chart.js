
import { useState,useEffect} from "react";
import dynamic from 'next/dynamic';
//avoid server side rendering on browser side components
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function PieChartMakeUp(){
  const [speciesLabels,setSpeciesLabels] = useState([])
  const [speciesAmount,setSpeciesAmount] = useState([])
  const [chartState, setChartState] = useState({
    
      series: [],
      options: {
        chart: {
          width: 600,
          height:300,
          type: 'pie',
        },
        labels: [],
        legend: {
          labels: {
            colors: '#ffffff' // This makes the legend text white
          }},
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 600,
              height:500
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
    
    
  });


  const getSpeciesMakeup = async()=>{
    try{
      const response = await fetch('/api/species-makeup')
      if(!response.ok){
        return <p>{response.statusText}</p>
      }

      let {data} = await response.json()
      const speciesLabels = data.map(butterfly=>butterfly.label)
      const speciesAmount = data.map(butterfly=>butterfly.value)
      setSpeciesLabels(speciesLabels)
      setSpeciesAmount(speciesAmount)

    }
    catch(e){
      return <p>{e}</p>
    }

  }
    useEffect(()=>{
      getSpeciesMakeup()
    },[])

    //study this
    useEffect(()=>{
      setChartState(prevState=>({
        ...prevState,
        series: speciesAmount,
        options:{
          ...prevState.options,
          labels:speciesLabels
        }

      }))
    },[speciesAmount,speciesLabels])
  return (
    <div>
      <div id="chart">
          <ReactApexChart options={chartState.options} series={chartState.series} type="pie" width={700} />
        </div>
      <div id="html-dist"></div>
    </div>
  );
}
