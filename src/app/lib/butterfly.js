import { connect_db } from "@/app/lib/db_setup"

const butterfly_collection = await connect_db()

export const getButterflyData = async()=>{
    const butterfly_data_cursor = butterfly_collection.find()
    const butterfly_data = await butterfly_data_cursor.toArray()
    return butterfly_data

}

