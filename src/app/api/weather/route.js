import { connect, client} from "@/app/lib/db_setup"
import { getWeatherData } from "@/app/lib/weather";
import { NextResponse } from "next/server";

//pull all weather data from db
export async function GET(req){
    try{
        const butterfly_db = await connect()
    
        const weather_data_collection =butterfly_db.collection('weather_data')
        //this retrieves a cursor object, which can be iterated in multiple ways. Converting to array is best.
        const weather_data_cursor = weather_data_collection.find().sort({date:1})
        const weather_data = await weather_data_cursor.toArray()
        //close mongodb client. This would be after any update.
        client.close()
        return NextResponse.json({message:"Success",data:weather_data},{status:200})
    }
    catch(e){
        return NextResponse.json({message:e},{status:500})
    }
}

//gets number of days not in db, makes api request for data on those days, then inserts into db
export async function POST(req){
    try{
        const message = await getWeatherData()
        return NextResponse.json({message:message},{status:200})
    }
    catch(e){
        return NextResponse.json({message:e},{status:500})
    }
}