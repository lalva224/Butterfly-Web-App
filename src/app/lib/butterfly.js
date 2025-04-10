import { connect } from "@/app/lib/db_setup"

const butterfly_db = await connect()
const butterfly_data_collection = butterfly_db.collection("butterfly_classification_data")

export const getButterflyData = async()=>{
    const butterfly_data_cursor =butterfly_data_collection.find()
    const butterfly_data = await butterfly_data_cursor.toArray()
    return butterfly_data

}