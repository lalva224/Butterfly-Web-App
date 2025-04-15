import { connect_db } from "@/app/lib/db_setup"

const butterfly_collection = await connect_db()

//use cursor object to make this faster?
let butterfly_data;
const getButterflyData = async()=>{
    const butterfly_data_cursor = butterfly_collection.find()
    const butterfly_data_result = await butterfly_data_cursor.toArray()
    butterfly_data = butterfly_data_result
}
export const getButterflyDataTemperature = async()=>{
    if(!butterfly_data) await getButterflyData()
    return butterfly_data.map((butterfly)=>({"date":butterfly.date,"temperature":butterfly.temperature}))

}
export const getButterflyDataHumidity = async()=>{
    if(!butterfly_data) await getButterflyData()
    return butterfly_data.map((butterfly)=>({"date":butterfly.date,"humidity":butterfly.humidity}))

}
export const getButterflyDataWindSpeed = async()=>{
    if(!butterfly_data) await getButterflyData()
    return butterfly_data.map((butterfly)=>({"date":butterfly.date,"wind_speed":butterfly.wind_speed}))

}

export const getSpeciesMakeupData = async()=>{
    console.log('getting species makeup')
    if(!butterfly_data) await getButterflyData()
    //aggregate : group by the id -> species. Then get their counts by each id. Lastly project by switching names to value and label
    const pie_chart_data_cursor = butterfly_collection.aggregate(
                [
                    {
                        $group:{
                            //id needed for grouping
                           _id :"$species",
                           //adds 1 for each doc that is of the same species
                           value: {$sum:1}
                            
                        }
                    },
                    {
                        $project:{
                            //rename id field to label, project value and do not project id
                            label:"$_id",
                            value:1,
                            _id:0
                        }
                    }
                ])
    const pie_chart = await pie_chart_data_cursor.toArray()
    return pie_chart
  }


