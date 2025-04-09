import { connect } from "@/app/lib/db_setup"
import { NextResponse } from "next/server";

export async function GET(req){
    try{
        const butterfly_db = await connect()
        const weather_data_collection =butterfly_db.collection('weather_data')
        //this retrieves a cursor object, which can be iterated in multiple ways. Converting to array is best.
        const weather_data_cursor = weather_data_collection.find().sort({date:1})
        const weather_data = await weather_data_cursor.toArray()
        return NextResponse.json({message:"Success",data:weather_data},{status:200})
    }
    catch(e){
        return NextResponse.json({message:e},{status:500})
    }
}