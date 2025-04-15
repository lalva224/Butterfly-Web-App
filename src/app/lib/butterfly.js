import { connect_db } from "@/app/lib/db_setup"

const butterfly_collection = await connect_db()

export const getButterflyDataTemperature = async()=>{
    const butterfly_data_cursor = butterfly_collection.find({},{projection:{_id:0,date:1,temperature:1}})
    const butterfly_data = await butterfly_data_cursor.toArray()
    return butterfly_data

}

