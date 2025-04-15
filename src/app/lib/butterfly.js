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

